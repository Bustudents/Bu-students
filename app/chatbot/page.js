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
  const chatContainerRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (chatContainerRef.current) {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        chatContainerRef.current.style.height = `${viewportHeight}px`;
      }
      setTimeout(scrollToBottom, 100);
    };

    const handleScroll = () => {
      if (document.activeElement === inputRef.current) {
        inputRef.current.blur();
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: input, type: 'user' }]);
    setInput('');

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

  const renderMessage = (text) => text && <ReactMarkdown>{text}</ReactMarkdown>;

  return (
    <div className="bg-[#1E1E2E] min-h-screen flex flex-col items-center justify-center p-4">
      {messages.length === 0 && (
        <div id="shbkgbt-text" className="absolute top-20 text-gray-600 text-[4rem] font-extrabold opacity-25">
          SHBKGBT
        </div>
      )}

      <div ref={chatContainerRef} className="w-full max-w-md bg-[#282A36] rounded-2xl shadow-2xl flex flex-col overflow-hidden h-screen pb-16">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 60px)' }}>
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
                <div className="animate-pulse">Loading...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-[#1E1E2E] border-t border-gray-700 flex items-center space-x-3 fixed bottom-0 w-full max-w-md pb-safe"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
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