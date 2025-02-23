'use client';

import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Focus on input when messages change
  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle viewport changes (e.g., virtual keyboard opening/closing)
  useEffect(() => {
    const handleResize = () => {
      scrollToBottom();
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: input, type: 'user' }]);

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
    setInput('');
  };

  const renderMessage = (text) => {
    if (!text) return null;
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  return (
    <div className="bg-[#1E1E2E] min-h-screen flex flex-col items-center justify-center p-4">
      <div id="shbkgbt-text" className="absolute top-20 text-gray-600 text-[4rem] font-extrabold opacity-90 pt-52">
        SHBKGBT
      </div>

      <div className="w-full max-w-md h-[80vh] bg-[#282A36] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-4 rounded-xl shadow-md ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                {renderMessage(message.text)}
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

        <div className="p-4 bg-[#1E1E2E] border-t border-gray-700 flex items-center space-x-3">
          <input
            ref={inputRef}
            className="flex-1 p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}