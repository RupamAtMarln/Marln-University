import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { UserCircle, Edit, Save } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '123-456-7890',
    address: '123 Student St, University City, 12345',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the profile data to a backend
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
              {isEditing ? <Save size={18} /> : <Edit size={18} />} {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" className="border rounded px-2 py-1 w-full" value={profile.name} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" className="border rounded px-2 py-1 w-full" value={profile.email} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" name="phone" className="border rounded px-2 py-1 w-full" value={profile.phone} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" className="border rounded px-2 py-1 w-full" value={profile.address} onChange={handleChange} disabled={!isEditing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 