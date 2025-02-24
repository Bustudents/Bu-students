"use client"
import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // ✅ Prevent UI from resizing when the keyboard opens (Overlay instead)
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const keyboardVisible = window.innerHeight - viewportHeight > 100; // Detect keyboard state
      setKeyboardHeight(keyboardVisible ? window.innerHeight - viewportHeight + 4 : 0); // Add 4px margin
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Ensure chat scrolls to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  // ✅ Close the keyboard after sending a message
  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: input, type: 'user' }]);
    setInput('');
    inputRef.current?.blur(); // Close keyboard

    try {
      const res = await fetch('/api/gemeni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, type: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'An error occurred. Please try again.', type: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1E1E2E] min-h-screen flex flex-col items-center justify-center p-4">
      {messages.length === 0 && (
        <div id="shbkgbt-text" className="absolute top-20 text-gray-600 text-[4rem] font-extrabold opacity-25">
          SHBKGBT
        </div>
      )}

      <div ref={chatContainerRef} className="w-full max-w-md bg-[#282A36] rounded-2xl shadow-2xl flex flex-col overflow-hidden h-screen pb-16">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[95%] p-4 rounded-xl shadow-md ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] p-4 rounded-xl shadow-md bg-gray-700 text-gray-200">
                <div className="animate-pulse">Generating...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ✅ Dynamic keyboard margin applied */}
        <div
          className="p-4 bg-[#1E1E2E] border-t border-gray-700 flex items-center space-x-3 fixed bottom-0 w-full max-w-md transition-all duration-300"
          style={{ paddingBottom: `${keyboardHeight}px` }}
        >
          <input
            ref={inputRef}
            className="flex-1 p-3   mb-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            type="search"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-600  text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
