import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { 
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  File,
  Smile,
  X,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Instructor',
    course: 'Introduction to Computer Science',
    lastMessage: 'Please submit your assignment by Friday.',
    time: '10:30 AM',
    unread: 2,
    avatar: 'SJ',
    online: true
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    role: 'Instructor',
    course: 'Data Structures and Algorithms',
    lastMessage: 'Great work on the last project!',
    time: 'Yesterday',
    unread: 0,
    avatar: 'MC',
    online: false
  },
  {
    id: 3,
    name: 'Emily Brown',
    role: 'Student',
    course: 'Web Development',
    lastMessage: 'Can you help me with the React components?',
    time: '2 days ago',
    unread: 0,
    avatar: 'EB',
    online: true
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    role: 'Instructor',
    course: 'Database Systems',
    lastMessage: 'The exam schedule has been updated.',
    time: '3 days ago',
    unread: 0,
    avatar: 'JW',
    online: false
  }
];

const initialMessages = {
  1: [
    { id: 1, sender: 'Dr. Sarah Johnson', content: 'Hello John, how are you doing with the programming assignment?', time: '10:15 AM', isInstructor: true },
    { id: 2, sender: 'You', content: 'Hi Dr. Johnson, I\'m working on it. I have a question about the array implementation.', time: '10:20 AM', isInstructor: false },
    { id: 3, sender: 'Dr. Sarah Johnson', content: 'Sure, what\'s your question?', time: '10:25 AM', isInstructor: true },
    { id: 4, sender: 'You', content: 'I\'m not sure how to handle the edge cases in the sorting algorithm.', time: '10:28 AM', isInstructor: false },
    { id: 5, sender: 'Dr. Sarah Johnson', content: 'Please submit your assignment by Friday.', time: '10:30 AM', isInstructor: true }
  ],
  2: [
    { id: 1, sender: 'Prof. Michael Chen', content: 'Hi John, your last project submission was excellent!', time: 'Yesterday, 2:10 PM', isInstructor: true },
    { id: 2, sender: 'You', content: 'Thank you, Professor! I enjoyed working on it.', time: 'Yesterday, 2:12 PM', isInstructor: false },
    { id: 3, sender: 'Prof. Michael Chen', content: 'Keep up the good work. Let me know if you have any questions about the next assignment.', time: 'Yesterday, 2:15 PM', isInstructor: true }
  ],
  3: [
    { id: 1, sender: 'Emily Brown', content: 'Hey John, are you coming to the study group later?', time: '2 days ago, 4:00 PM', isInstructor: true },
    { id: 2, sender: 'You', content: 'Yes! I\'ll be there at 5 PM.', time: '2 days ago, 4:05 PM', isInstructor: false },
    { id: 3, sender: 'Emily Brown', content: 'Great! Can you help me with the React components before we start?', time: '2 days ago, 4:10 PM', isInstructor: true },
    { id: 4, sender: 'You', content: 'Of course, see you soon!', time: '2 days ago, 4:12 PM', isInstructor: false }
  ],
  4: [
    { id: 1, sender: 'Dr. James Wilson', content: 'Hello John, the exam schedule has been updated. Please check the portal.', time: '3 days ago, 9:00 AM', isInstructor: true },
    { id: 2, sender: 'You', content: 'Thank you, Dr. Wilson! I will check it now.', time: '3 days ago, 9:05 AM', isInstructor: false },
    { id: 3, sender: 'Dr. James Wilson', content: 'Let me know if you have any questions about the syllabus.', time: '3 days ago, 9:10 AM', isInstructor: true }
  ]
};

function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [isReplying, setIsReplying] = useState(false);

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const convId = selectedConversation.id;
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const userMsg = {
        id: (chatMessages[convId]?.length || 0) + 1,
        sender: 'You',
        content: newMessage,
        time,
        isInstructor: false
      };
      setChatMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), userMsg]
      }));
      setNewMessage('');
      setIsReplying(true);
      // Simulate a reply after 1s
      setTimeout(() => {
        const replyMsg = getAutoReply(selectedConversation);
        setChatMessages(prev => ({
          ...prev,
          [convId]: [...(prev[convId] || []), replyMsg]
        }));
        setIsReplying(false);
      }, 1000);
    }
  };

  // Generate a demo reply based on the conversation
  function getAutoReply(conversation) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replies = {
      1: [
        "Thanks for your message, I'll review it soon.",
        "Let me know if you need any more help!",
        "I'll get back to you after my next class.",
        "Good question! I'll explain in the next lecture."
      ],
      2: [
        "You're welcome! Keep up the good work.",
        "Let me know if you need any clarification.",
        "I'll post the next assignment soon.",
        "Great to hear from you!"
      ],
      3: [
        "See you at the study group!",
        "Thanks for helping with React!",
        "Let's catch up before class.",
        "I'll bring my notes."
      ],
      4: [
        "You're welcome, John!",
        "Let me know if you have any questions.",
        "Check the portal for updates.",
        "Good luck with your studies!"
      ]
    };
    const convId = conversation.id;
    const replyText = replies[convId][Math.floor(Math.random() * replies[convId].length)];
    return {
      id: (chatMessages[convId]?.length || 0) + 2,
      sender: conversation.name,
      content: replyText,
      time,
      isInstructor: true
    };
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-4rem)]">
            {filteredConversations.map(conversation => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 border-b hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{conversation.name}</h3>
                        <p className="text-sm text-gray-500">{conversation.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{conversation.time}</span>
                        {conversation.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{conversation.course}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                      {selectedConversation.avatar}
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-900">{selectedConversation.name}</h2>
                    <p className="text-sm text-gray-500">{selectedConversation.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="max-w-3xl mx-auto space-y-4">
                  {chatMessages[selectedConversation.id]?.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isInstructor ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isInstructor
                            ? 'bg-white border'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {message.isInstructor ? message.sender : 'You'}
                          </span>
                          <span className="text-xs opacity-75">{message.time}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isReplying && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] rounded-lg p-3 bg-white border opacity-60 italic text-gray-400">
                        Typing...
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t">
                <div className="max-w-3xl mx-auto">
                  <div className="relative">
                    <button
                      onClick={() => setShowAttachments(!showAttachments)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full pl-10 pr-24 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Smile size={20} />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Send size={16} />
                        Send
                      </button>
                    </div>
                  </div>

                  {/* Attachments Menu */}
                  {showAttachments && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-2">
                      <div className="grid grid-cols-4 gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center gap-1">
                          <ImageIcon size={20} className="text-blue-600" />
                          <span className="text-xs">Image</span>
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg flex flex-col items-center gap-1">
                          <File size={20} className="text-blue-600" />
                          <span className="text-xs">File</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages; 