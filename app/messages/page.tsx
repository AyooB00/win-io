'use client';

import React, { useState, useEffect } from 'react';
import ConversationList from '../components/messages/ConversationList';
import ChatView from '../components/messages/ChatView';
import { getConversationsByUserId, getMessagesByConversationId, mockUsers } from '../data/mockData';
import { Message, Conversation } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function MessagesPage() {
  // In a real app, this would come from authentication context
  const currentUserId = 'u1'; // coach
  const currentUser = mockUsers.find(user => user.id === currentUserId);
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationName, setConversationName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Fetch conversations
    const userConversations = getConversationsByUserId(currentUserId);
    setConversations(userConversations);
    
    // Set the first conversation as selected by default
    if (userConversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(userConversations[0].id);
    }
  }, [currentUserId, selectedConversationId]);
  
  useEffect(() => {
    if (selectedConversationId) {
      // Fetch messages for the selected conversation
      const conversationMessages = getMessagesByConversationId(selectedConversationId);
      setMessages(conversationMessages);
      
      // Get conversation name
      const selectedConversation = conversations.find(c => c.id === selectedConversationId);
      if (selectedConversation) {
        const otherParticipantId = selectedConversation.participants.find(id => id !== currentUserId);
        const otherUser = mockUsers.find(user => user.id === otherParticipantId);
        setConversationName(otherUser?.name || 'محادثة');
        
        // Mark conversation as read
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === selectedConversationId ? { ...conv, unreadCount: 0 } : conv
          )
        );
      }
    }
  }, [currentUserId, selectedConversationId, conversations]);
  
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };
  
  const handleSendMessage = (content: string) => {
    if (!selectedConversationId || !content.trim()) return;
    
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const selectedConversation = conversations.find(c => c.id === selectedConversationId);
      if (selectedConversation) {
        const otherParticipantId = selectedConversation.participants.find(id => id !== currentUserId);
        const otherUser = mockUsers.find(user => user.id === otherParticipantId);
        
        if (otherUser) {
          // Create a new message
          const newMessage: Message = {
            id: uuidv4(),
            senderId: currentUserId,
            senderName: currentUser?.name || '',
            senderAvatar: currentUser?.avatar,
            recipientId: otherUser.id,
            recipientName: otherUser.name,
            content,
            timestamp: new Date(),
            read: false
          };
          
          // Add the message to the conversation
          setMessages(prevMessages => [...prevMessages, newMessage]);
          
          // Update the last message in the conversation
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === selectedConversationId ? {
                ...conv,
                lastMessage: newMessage,
                updatedAt: new Date()
              } : conv
            )
          );
        }
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto py-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <h1 className="sr-only">Messages</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 h-[80vh]">
            <div className="md:col-span-1 border-r border-gray-200 dark:border-gray-700">
              <ConversationList
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
                currentUserId={currentUserId}
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col h-full">
              {selectedConversationId ? (
                <ChatView
                  messages={messages}
                  currentUserId={currentUserId}
                  onSendMessage={handleSendMessage}
                  conversationName={conversationName}
                  isLoading={isLoading}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>اختر محادثة للبدء</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 