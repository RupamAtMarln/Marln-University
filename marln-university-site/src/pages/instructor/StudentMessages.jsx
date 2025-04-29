import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Send, Trash2, Plus, MessageSquare, User, Search } from 'lucide-react';

const dummyStudents = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
];

const dummyMessages = [
  { id: 1, studentId: 1, message: 'Hello, I have a question about the assignment.', timestamp: '2024-06-01T10:00:00' },
  { id: 2, studentId: 2, message: 'Can you clarify the due date for the quiz?', timestamp: '2024-06-02T11:00:00' },
  { id: 3, studentId: 3, message: 'Thank you for the help!', timestamp: '2024-06-03T12:00:00' },
];

export default function StudentMessages() {
  const [messages, setMessages] = useState(dummyMessages);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(dummyStudents[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const openAddMessage = () => {
    setModalMessage({ studentId: selectedStudent, message: '', timestamp: new Date().toISOString() });
    setShowModal(true);
  };

  const openEditMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage(null);
  };

  const saveMessage = () => {
    if (modalMessage.id) {
      setMessages(messages.map(m => m.id === modalMessage.id ? modalMessage : m));
    } else {
      setMessages([...messages, { ...modalMessage, id: Date.now() }]);
    }
    setShowModal(false);
    setModalMessage(null);
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const filteredStudents = dummyStudents.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Student Messages</h1>
            <button onClick={openAddMessage} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
              <Plus size={18} /> New Message
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Search Student</label>
            <div className="relative">
              <input type="text" className="border rounded px-2 py-1 w-full" placeholder="Search by name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <Search className="absolute right-2 top-2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Student</label>
            <select className="border rounded px-2 py-1 w-full" value={selectedStudent} onChange={e => setSelectedStudent(Number(e.target.value))}>
              {filteredStudents.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {messages.filter(m => m.studentId === selectedStudent).map(message => (
              <div key={message.id} className="border rounded-lg p-4 flex flex-col">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold">{dummyStudents.find(s => s.id === message.studentId).name}</h2>
                  <div className="flex gap-2">
                    <button onClick={() => openEditMessage(message)} className="text-blue-600 hover:text-blue-800"><Send size={18} /></button>
                    <button onClick={() => deleteMessage(message.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{message.message}</p>
                <p className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        {showModal && modalMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={closeModal}><Trash2 size={28} /></button>
              <h2 className="text-xl font-bold text-blue-700 mb-4">{modalMessage.id ? 'Edit Message' : 'New Message'}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea className="border rounded px-2 py-1 w-full" rows={4} value={modalMessage.message} onChange={e => setModalMessage({ ...modalMessage, message: e.target.value })} />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={saveMessage}>{modalMessage.id ? 'Save Changes' : 'Send Message'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 