import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Calendar, BookOpen, ClipboardList, Users2, Plus, X, Edit } from 'lucide-react';

const dummyEvents = [
  { id: 1, date: '2024-06-17', type: 'class', title: 'CS101 Lecture', time: '09:00', desc: 'Room 204, Main Building' },
  { id: 2, date: '2024-06-18', type: 'assignment', title: 'Assignment 1 Due', time: '23:59', desc: 'CS101: Basics' },
  { id: 3, date: '2024-06-19', type: 'activity', title: 'Faculty Meeting', time: '14:00', desc: 'Conference Room B' },
  { id: 4, date: '2024-06-20', type: 'class', title: 'ML305 Lab', time: '11:00', desc: 'Lab 3, Science Block' },
  { id: 5, date: '2024-06-21', type: 'class', title: 'DS220 Seminar', time: '10:00', desc: 'Seminar Hall' },
  // Holidays
  { id: 6, date: '2024-06-23', type: 'holiday', title: 'University Holiday: Summer Break', time: '', desc: 'No classes' },
  { id: 7, date: '2024-06-28', type: 'holiday', title: 'Public Holiday: Founders Day', time: '', desc: 'Campus closed' },
  // University Events
  { id: 8, date: '2024-06-25', type: 'university', title: 'Annual Science Fair', time: '13:00', desc: 'Main Auditorium' },
  { id: 9, date: '2024-06-27', type: 'university', title: 'Sports Day', time: '09:00', desc: 'Sports Complex' },
  // More upcoming events
  { id: 10, date: '2024-07-01', type: 'activity', title: 'Department Workshop', time: '15:00', desc: 'Lab 2' },
  { id: 11, date: '2024-07-03', type: 'assignment', title: 'Assignment 2 Due', time: '23:59', desc: 'ML305: Regression' },
];

const eventColors = {
  class: 'bg-blue-500',
  assignment: 'bg-green-500',
  activity: 'bg-yellow-500',
  holiday: 'bg-red-500',
  university: 'bg-purple-600',
};

function getMonthDays(year, month) {
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  let day = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++, day++) {
      week.push(day > 0 && day <= lastDate ? day : null);
    }
    days.push(week);
  }
  return days;
}

export default function TeachingSchedule() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);
  const [events, setEvents] = useState(dummyEvents);

  const monthDays = getMonthDays(year, month);
  const monthStr = new Date(year, month).toLocaleString('default', { month: 'long' });

  const goToPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };
  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const openEvent = (event) => {
    setModalEvent(event);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalEvent(null);
  };
  const openAddEvent = (date) => {
    setModalEvent({ date, type: 'class', title: '', time: '', desc: '' });
    setShowModal(true);
  };
  const saveEvent = () => {
    if (modalEvent.id) {
      setEvents(events.map(e => e.id === modalEvent.id ? modalEvent : e));
    } else {
      setEvents([...events, { ...modalEvent, id: Date.now() }]);
    }
    setShowModal(false);
    setModalEvent(null);
  };

  const eventsForDay = (d) => events.filter(e => {
    const [y, m, day] = e.date.split('-').map(Number);
    return y === year && m === month + 1 && day === d;
  });
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date(year, month, 1)).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-8 flex flex-col lg:flex-row gap-8">
        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Teaching Schedule</h1>
            <div className="flex gap-2">
              <button onClick={goToPrevMonth} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded">&lt;</button>
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">{monthStr} {year}</span>
              <button onClick={goToNextMonth} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded">&gt;</button>
            </div>
          </div>
          <table className="w-full text-center select-none">
            <thead>
              <tr className="text-gray-500 dark:text-gray-300">
                <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {monthDays.map((week, i) => (
                <tr key={i}>
                  {week.map((d, j) => (
                    <td key={j} className={`h-20 w-20 align-top border border-gray-200 dark:border-gray-700 ${d ? 'bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer' : 'bg-gray-100 dark:bg-gray-800'}`} onClick={() => d && openAddEvent(`${year}-` + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0'))}>
                      <div className={`text-sm font-semibold ${d && new Date(year, month, d).toDateString() === today.toDateString() ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}`}>{d || ''}</div>
                      <div className="flex flex-col gap-1 mt-1">
                        {d && eventsForDay(d).map(ev => (
                          <div key={ev.id} className={`rounded px-2 py-1 text-xs text-white ${eventColors[ev.type]} cursor-pointer`} onClick={e => { e.stopPropagation(); openEvent(ev); }}>{ev.title}</div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Upcoming Events Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><Calendar size={18}/> Upcoming Events</div>
            <div className="flex flex-col gap-3">
              {upcomingEvents.length === 0 && <div className="text-gray-400 dark:text-gray-500 text-sm">No upcoming events.</div>}
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="flex flex-col gap-1 border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0 last:pb-0">
                  <div className={`font-semibold ${eventColors[ev.type] || 'bg-gray-200 dark:bg-gray-700'} text-white rounded px-2 py-1 inline-block w-fit`}>{ev.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">{ev.date} {ev.time}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{ev.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Event Modal */}
        {showModal && modalEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100" onClick={closeModal}><X size={28} /></button>
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">{modalEvent.id ? 'Edit Event' : 'Add Event'}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                <input type="text" className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalEvent.title} onChange={e => setModalEvent({ ...modalEvent, title: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Type</label>
                <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalEvent.type} onChange={e => setModalEvent({ ...modalEvent, type: e.target.value })}>
                  <option value="class">Class</option>
                  <option value="assignment">Assignment</option>
                  <option value="activity">Activity</option>
                  <option value="holiday">Holiday</option>
                  <option value="university">University Event</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Date</label>
                <input type="date" className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalEvent.date} onChange={e => setModalEvent({ ...modalEvent, date: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Time</label>
                <input type="time" className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalEvent.time} onChange={e => setModalEvent({ ...modalEvent, time: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                <textarea className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" rows={2} value={modalEvent.desc} onChange={e => setModalEvent({ ...modalEvent, desc: e.target.value })} />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" onClick={saveEvent}>{modalEvent.id ? 'Save Changes' : 'Add Event'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 