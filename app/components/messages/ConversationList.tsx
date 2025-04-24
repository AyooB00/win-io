'use client';

import React from 'react';
import Image from 'next/image';
import { Conversation } from '@/app/types';
import { formatChatDate } from '@/app/utils/dateUtils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  currentUserId: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  currentUserId
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 h-full overflow-y-auto rounded-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-right">المحادثات</h2>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            لا توجد محادثات
          </div>
        ) : (
          conversations.map((conversation) => {
            const lastMessage = conversation.lastMessage;
            
            // Get the name and avatar to display
            const displayName = lastMessage ? 
              (lastMessage.senderId === currentUserId ? lastMessage.recipientName : lastMessage.senderName) : 
              "محادثة جديدة";
            
            const avatar = lastMessage ? 
              (lastMessage.senderId === currentUserId ? undefined : lastMessage.senderAvatar) : 
              undefined;
            
            return (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedConversationId === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => onSelectConversation(conversation.id)}
                dir="rtl"
              >
                <div className="flex items-center">
                  <div className="relative flex-shrink-0">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={displayName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {displayName.charAt(0)}
                      </div>
                    )}
                    
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                  
                  <div className="mr-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium truncate">{displayName}</h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatChatDate(lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    
                    {lastMessage && (
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {lastMessage.senderId === currentUserId && <span className="text-gray-400">أنت: </span>}
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList; 