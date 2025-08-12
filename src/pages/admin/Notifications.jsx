import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Plus, Send, X, Mail, User, Users, CheckCircle, MessageSquare } from 'lucide-react';

// Example initial queries
const initialQueries = [
  {
    id: 1,
    sender: 'student1@university.edu',
    role: 'student',
    message: 'When will the exam schedule be released?',
    date: '2024-06-01',
    status: 'open',
    reply: ''
  },
  {
    id: 2,
    sender: 'instructor1@university.edu',
    role: 'instructor',
    message: 'Can I get access to last year\'s syllabus?',
    date: '2024-06-02',
    status: 'open',
    reply: ''
  }
];

const recipientOptions = [
  { value: 'all', label: 'All Users', icon: Users },
  { value: 'students', label: 'All Students', icon: User },
  { value: 'instructors', label: 'All Instructors', icon: User },
  { value: 'custom', label: 'Specific Email', icon: Mail }
];

export default function Notifications() {
  // Queries state
  const [queries, setQueries] = useState(() => {
    const stored = localStorage.getItem('queries');
    return stored ? JSON.parse(stored) : initialQueries;
  });
  useEffect(() => {
    localStorage.setItem('queries', JSON.stringify(queries));
  }, [queries]);

  // Reply modal state
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [activeQuery, setActiveQuery] = useState(null);

  // Notification state
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifForm, setNotifForm] = useState({ recipient: '', email: '', message: '' });

  // Handle reply to query
  const openReplyModal = (query) => {
    setActiveQuery(query);
    setReplyText(query.reply || '');
    setShowReplyModal(true);
  };
  const handleReply = (e) => {
    e.preventDefault();
    setQueries(queries.map(q => q.id === activeQuery.id ? { ...q, reply: replyText, status: 'closed' } : q));
    setShowReplyModal(false);
    setActiveQuery(null);
    setReplyText('');
  };

  // Handle send notification
  const openNotifModal = () => {
    setNotifForm({ recipient: '', email: '', message: '' });
    setShowNotifModal(true);
  };
  const handleSendNotif = (e) => {
    e.preventDefault();
    setNotifications([
      ...notifications,
      {
        id: notifications.length + 1,
        recipient: notifForm.recipient,
        email: notifForm.recipient === 'custom' ? notifForm.email : '',
        message: notifForm.message,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setShowNotifModal(false);
    setNotifForm({ recipient: '', email: '', message: '' });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Notifications & Queries</h1>
            <button
              onClick={openNotifModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Send Notification</span>
            </button>
          </div>

          {/* Queries Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2"><MessageSquare size={20}/> Queries</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {queries.map(q => (
                    <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{q.sender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize dark:text-gray-300">{q.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{q.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 dark:text-blue-300">{q.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {q.status === 'open' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Open</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Closed</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openReplyModal(q)}
                          className="text-blue-600 hover:text-blue-800 disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300"
                          disabled={q.status === 'closed'}
                        >
                          Reply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notifications Sent Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2"><Send size={20}/> Sent Notifications</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Recipient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map(n => (
                    <tr key={n.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{recipientOptions.find(o => o.value === n.recipient)?.label || n.recipient}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{n.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{n.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 dark:text-blue-300">{n.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && activeQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Reply to Query</h2>
              <button onClick={() => setShowReplyModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"><X size={24} /></button>
            </div>
            <form onSubmit={handleReply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Query</label>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">{activeQuery.message}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Reply</label>
                <textarea className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300" rows={3} required value={replyText} onChange={e => setReplyText(e.target.value)} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowReplyModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">Send Reply</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Notification Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Send Notification</h2>
              <button onClick={() => setShowNotifModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"><X size={24} /></button>
            </div>
            <form onSubmit={handleSendNotif} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient</label>
                <select className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300" required value={notifForm.recipient} onChange={e => setNotifForm(f => ({ ...f, recipient: e.target.value }))}>
                  <option value="">Select Recipient</option>
                  {recipientOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              {notifForm.recipient === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input type="email" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300" required value={notifForm.email} onChange={e => setNotifForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300" rows={3} required value={notifForm.message} onChange={e => setNotifForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowNotifModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 