import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, MessageSquare, Send } from 'lucide-react';

function CoursePdfViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  // PDF URL can be passed via state or query param
  const pdfUrl = location.state?.pdfUrl || '';
  const title = location.state?.title || 'PDF Viewer';
  const [showAiChat, setShowAiChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { role: 'user', content: newMessage }]);
      // Here you would typically make an API call to your AI service
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'I am an AI assistant that can help you understand this course material. How can I assist you?' 
        }]);
      }, 1000);
      setNewMessage('');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 flex flex-col z-50 select-none"
      onContextMenu={e => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
    >
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAiChat(!showAiChat)}
            className="text-white hover:text-blue-400 p-2 rounded-full flex items-center gap-2"
            aria-label="Toggle AI Chat"
          >
            <MessageSquare size={24} />
            <span className="text-sm">AI Assistant</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-red-400 p-2 rounded-full"
            aria-label="Close PDF"
          >
            <X size={28} />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-black relative flex w-screen overflow-x-hidden">
        {/* PDF Area */}
        <div className="flex-1 min-w-0 h-full flex items-center justify-center">
          {pdfUrl ? (
            <div className={`h-full ${showAiChat ? 'w-full' : 'w-4/5 mx-auto'}`}>
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                title="Course PDF"
                className="w-full h-full pointer-events-auto"
                style={{ border: 'none', pointerEvents: 'auto' }}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white">PDF not found.</div>
          )}
        </div>
        {/* AI Chat Panel */}
        {showAiChat && (
          <div
            className="transition-transform duration-300 min-w-[200px] max-w-[400px] w-[400px] border-l border-gray-700 shadow-2xl rounded-l-2xl flex flex-col h-full z-20"
            style={{ boxShadow: '-8px 0 24px -8px rgba(0,0,0,0.25)', background: 'linear-gradient(120deg, #232946 60%, #5f6fff 100%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 rounded-tl-2xl" style={{background: 'transparent'}}>
              <span className="text-lg font-semibold text-white">AI Assistant</span>
              <button
                onClick={() => setShowAiChat(false)}
                className="text-gray-200 hover:text-red-300 p-2 rounded-full"
                aria-label="Close AI Chat"
              >
                <X size={22} />
              </button>
            </div>
            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-blue-100 opacity-80 select-none">
                  <svg width="40" height="40" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                    <circle cx="28" cy="28" r="28" fill="#5f6fff"/>
                    <path d="M28 16C23.58 16 20 19.58 20 24C20 28.42 23.58 32 28 32C32.42 32 36 28.42 36 24C36 19.58 32.42 16 28 16ZM28 30C25.24 30 23 27.76 23 25C23 22.24 25.24 20 28 20C30.76 20 33 22.24 33 25C33 27.76 30.76 30 28 30Z" fill="white"/>
                  </svg>
                  <div className="text-center text-base">How can I help you with this PDF?</div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 shadow-md ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div className="p-4 border-t border-gray-700 rounded-bl-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about the course material..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePdfViewer; 