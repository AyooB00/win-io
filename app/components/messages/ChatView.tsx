'use client';

import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from '../ui/ChatBubble';
import ChatInput from './ChatInput';
import { Message } from '@/app/types';
import { formatChatDate } from '@/app/utils/dateUtils';

interface ChatViewProps {
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string, attachment?: File) => void;
  conversationName: string;
  isLoading?: boolean;
}

const ChatView: React.FC<ChatViewProps> = ({
  messages,
  currentUserId,
  onSendMessage,
  conversationName,
  isLoading = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [groupedMessages, setGroupedMessages] = useState<{ [key: string]: Message[] }>({});

  useEffect(() => {
    // Group messages by date for date separators
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      
      groups[dateKey].push(message);
    });
    
    setGroupedMessages(groups);
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{conversationName}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => (
          <div key={dateKey}>
            <div className="flex items-center justify-center my-4">
              <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                {formatChatDate(dateMessages[0].timestamp)}
              </div>
            </div>
            
            {dateMessages.map(message => (
              <ChatBubble
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === currentUserId}
              />
            ))}
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>لا توجد رسائل</p>
            <p className="text-sm mt-2">ابدأ محادثة جديدة</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatView; 