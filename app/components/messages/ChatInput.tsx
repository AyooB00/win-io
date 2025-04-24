'use client';

import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSendMessage: (content: string, attachment?: File) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '' && !attachment) return;
    
    onSendMessage(message, attachment || undefined);
    setMessage('');
    setAttachment(null);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col border-t border-gray-200 dark:border-gray-700 p-4">
      {attachment && (
        <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-between">
          <span className="text-sm truncate max-w-[80%]" dir="rtl">{attachment.name}</span>
          <button
            type="button"
            onClick={removeAttachment}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            إزالة
          </button>
        </div>
      )}
      
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleAttachmentClick}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="أرفق ملف"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
        />
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالة..."
          className="flex-1 mx-2 p-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          dir="rtl"
        />
        
        <button
          type="submit"
          disabled={isLoading || (message.trim() === '' && !attachment)}
          className={`p-2 rounded-full ${
            isLoading || (message.trim() === '' && !attachment)
              ? 'bg-blue-300 dark:bg-blue-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          } text-white`}
          aria-label="إرسال"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput; 