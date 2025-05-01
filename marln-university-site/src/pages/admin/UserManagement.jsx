import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Users2, Edit, Lock, X, ArrowUpCircle, Ban, CheckCircle, Archive, RotateCcw } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@university.edu', role: 'student', status: 'active', program: 'Computer Science' },
  { id: 2, name: 'Bob Lee', email: 'bob@university.edu', role: 'student', status: 'suspended', program: 'Mathematics' },
  { id: 3, name: 'Dr. Carol Jones', email: 'carol@university.edu', role: 'instructor', status: 'active', program: '' },
  { id: 4, name: 'David Kim', email: 'david@university.edu', role: 'student', status: 'active', program: 'Physics' },
  { id: 5, name: 'Prof. Eva Green', email: 'eva@university.edu', role: 'instructor', status: 'active', program: '' },
];

// Add mock deleted users
const mockDeletedUsers = [
  { id: 6, name: 'John Wilson', email: 'john@university.edu', role: 'student', status: 'deleted', program: 'Computer Science' },
  { id: 7, name: 'Sarah Parker', email: 'sarah@university.edu', role: 'student', status: 'deleted', program: 'Biology' },
  { id: 8, name: 'Dr. Michael Brown', email: 'michael@university.edu', role: 'instructor', status: 'deleted', program: '' },
  { id: 9, name: 'Emma Davis', email: 'emma@university.edu', role: 'student', status: 'deleted', program: 'Chemistry' },
];

const programs = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [deletedUsers, setDeletedUsers] = useState(mockDeletedUsers);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeUser, setUpgradeUser] = useState(null);
  const [newProgram, setNewProgram] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetUser, setResetUser] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  // Suspend/Unsuspend
  const toggleSuspend = (user) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  // Open upgrade modal
  const openUpgradeModal = (user) => {
    setUpgradeUser(user);
    setNewProgram(user.program);
    setShowUpgradeModal(true);
  };
  const handleUpgrade = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === upgradeUser.id ? { ...u, program: newProgram } : u));
    setShowUpgradeModal(false);
    setUpgradeUser(null);
    setNewProgram('');
  };

  // Open reset modal
  const openResetModal = (user) => {
    setResetUser(user);
    setShowResetModal(true);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setShowResetModal(false);
    setResetUser(null);
    // In real app, trigger password reset email
    alert('Password reset link sent to ' + resetUser.email);
  };

  // Delete user
  const handleDelete = (user) => {
    setUsers(users.filter(u => u.id !== user.id));
    setDeletedUsers([...deletedUsers, user]);
  };

  // Restore user
  const handleRestore = (user) => {
    setDeletedUsers(deletedUsers.filter(u => u.id !== user.id));
    setUsers([...users, user]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('active')}
                className={`${
                  activeTab === 'active'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <Users2 size={18} />
                Active Users
                {users.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {users.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('deleted')}
                className={`${
                  activeTab === 'deleted'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <Archive size={18} />
                Deleted Users
                {deletedUsers.length > 0 && (
                  <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">
                    {deletedUsers.length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Active Users Table */}
          {activeTab === 'active' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {user.status === 'active' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">Active</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">Suspended</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{user.program}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button onClick={() => openResetModal(user)} className="text-blue-600 hover:text-blue-800" title="Reset Password"><Lock size={18} /></button>
                        <button onClick={() => toggleSuspend(user)} className={user.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'} title={user.status === 'active' ? 'Suspend' : 'Unsuspend'}>
                          {user.status === 'active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                        </button>
                        {user.role === 'student' && (
                          <button onClick={() => openUpgradeModal(user)} className="text-purple-600 hover:text-purple-800" title="Upgrade Program"><ArrowUpCircle size={18} /></button>
                        )}
                        <button onClick={() => handleDelete(user)} className="text-gray-400 hover:text-red-600" title="Delete User"><X size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Deleted Users Table */}
          {activeTab === 'deleted' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {deletedUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Archive size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Deleted Users</h3>
                  <p className="text-gray-500">Deleted users will appear here</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deletedUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{user.program}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRestore(user)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <RotateCcw size={16} className="mr-1.5" />
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Program Modal */}
      {showUpgradeModal && upgradeUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Upgrade Program</h2>
              <button onClick={() => setShowUpgradeModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleUpgrade} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select New Program</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={newProgram} onChange={e => setNewProgram(e.target.value)}>
                  <option value="">Select Program</option>
                  {programs.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Upgrade</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && resetUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
              <button onClick={() => setShowResetModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <p className="text-gray-700">Send password reset link to <span className="font-semibold">{resetUser.email}</span>?</p>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowResetModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Send Link</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 