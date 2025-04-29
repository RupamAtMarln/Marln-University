import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { calendarEvents as initialEvents } from '../../data/calendar';
import { Plus, Trash2, X } from 'lucide-react';

const eventTypes = [
  { value: 'event', label: 'Event' },
  { value: 'exam', label: 'Exam' },
  { value: 'holiday', label: 'Holiday' }
];

export default function AcademicCalendar() {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('calendarEvents');
    return stored ? JSON.parse(stored) : initialEvents;
  });
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', type: '', description: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length ? Math.max(...events.map(ev => ev.id)) + 1 : 1,
      ...form
    };
    setEvents([...events, newEvent]);
    setShowAddModal(false);
    setForm({ title: '', date: '', type: '', description: '' });
  };

  const handleDelete = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Academic Calendar</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Event</span>
            </button>
          </div>

          {/* Event List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map(ev => (
                  <tr key={ev.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ev.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{ev.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                      <span className={
                        ev.type === 'exam' ? 'text-red-600' :
                        ev.type === 'holiday' ? 'text-green-600' :
                        'text-gray-700'
                      }>
                        {ev.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ev.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(ev.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Add Academic Event</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="">Select Type</option>
                  {eventTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 