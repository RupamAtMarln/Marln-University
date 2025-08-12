import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Bell, Plus, Trash2, Edit, Users } from 'lucide-react';

const dummyStudents = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
];

const dummyNotifications = [
  { id: 1, title: 'Schedule Change', message: 'The class schedule has been updated for next week.', timestamp: '2024-06-01T10:00:00', targetAudience: 'all' },
  { id: 2, title: 'Upcoming Test', message: 'There will be a test on Friday. Please prepare accordingly.', timestamp: '2024-06-02T11:00:00', targetAudience: 'all' },
  { id: 3, title: 'Special Message', message: 'Good luck to everyone on their assignments!', timestamp: '2024-06-03T12:00:00', targetAudience: 'all' },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [showModal, setShowModal] = useState(false);
  const [modalNotification, setModalNotification] = useState(null);
  const [selectedAudience, setSelectedAudience] = useState('all');

  const openAddNotification = () => {
    setModalNotification({ title: '', message: '', timestamp: new Date().toISOString(), targetAudience: selectedAudience });
    setShowModal(true);
  };

  const openEditNotification = (notification) => {
    setModalNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalNotification(null);
  };

  const saveNotification = () => {
    if (modalNotification.id) {
      setNotifications(notifications.map(n => n.id === modalNotification.id ? modalNotification : n));
    } else {
      setNotifications([...notifications, { ...modalNotification, id: Date.now() }]);
    }
    setShowModal(false);
    setModalNotification(null);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Notifications</h1>
            <button onClick={openAddNotification} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
              <Plus size={18} /> New Notification
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Target Audience</label>
            <select className="border rounded px-2 py-1 w-full border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" value={selectedAudience} onChange={e => setSelectedAudience(e.target.value)}>
              <option value="all">All Students</option>
              {dummyStudents.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {notifications.map(notification => (
              <div key={notification.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col bg-white dark:bg-gray-800">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{notification.title}</h2>
                  <div className="flex gap-2">
                    <button onClick={() => openEditNotification(notification)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"><Edit size={18} /></button>
                    <button onClick={() => deleteNotification(notification.id)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"><Trash2 size={18} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">{notification.message}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Target Audience: {notification.targetAudience === 'all' ? 'All Students' : dummyStudents.find(s => s.id === notification.targetAudience).name}</p>
              </div>
            ))}
          </div>
        </div>
        {showModal && modalNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100" onClick={closeModal}><Trash2 size={28} /></button>
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">{modalNotification.id ? 'Edit Notification' : 'New Notification'}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                <input type="text" className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalNotification.title} onChange={e => setModalNotification({ ...modalNotification, title: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
                <textarea className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" rows={4} value={modalNotification.message} onChange={e => setModalNotification({ ...modalNotification, message: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Target Audience</label>
                <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalNotification.targetAudience} onChange={e => setModalNotification({ ...modalNotification, targetAudience: e.target.value })}>
                  <option value="all">All Students</option>
                  {dummyStudents.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" onClick={saveNotification}>{modalNotification.id ? 'Save Changes' : 'Post Notification'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 