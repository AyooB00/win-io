'use client';

import React from 'react';
import Image from 'next/image';
import { Message } from '@/app/types';
import { formatDistanceToNow } from '@/app/utils/dateUtils';

interface ChatBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isCurrentUser }) => {
  const {
    content,
    timestamp,
    senderAvatar,
    senderName,
    attachment
  } = message;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 ml-2 md:ml-4">
          {senderAvatar ? (
            <Image
              src={senderAvatar}
              alt={senderName}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {senderName.charAt(0)}
            </div>
          )}
        </div>
      )}

      <div
        className={`flex flex-col max-w-[70%] ${
          isCurrentUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`rounded-xl px-4 py-2 ${
            isCurrentUser
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-gray-100 dark:bg-gray-700 rounded-tl-none'
          }`}
        >
          {content}
          
          {attachment && (
            <div className="mt-2">
              {attachment.type === 'image' ? (
                <Image
                  src={attachment.url}
                  alt={attachment.name}
                  width={200}
                  height={150}
                  className="rounded-md"
                />
              ) : (
                <a 
                  href={attachment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-2 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">{attachment.name}</span>
                </a>
              )}
            </div>
          )}
        </div>
        
        <span className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'ml-auto' : 'mr-auto'}`}>
          {formatDistanceToNow(timestamp)}
        </span>
      </div>

      {isCurrentUser && (
        <div className="flex-shrink-0 ml-2 md:ml-4">
          {senderAvatar ? (
            <Image
              src={senderAvatar}
              alt={senderName}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {senderName.charAt(0)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble; 