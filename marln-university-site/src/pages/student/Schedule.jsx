import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Calendar, Clock, BookOpen, Users, MapPin, ChevronLeft, ChevronRight, PlusCircle, Video } from 'lucide-react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const classColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-yellow-100'];

const scheduleData = [
  {
    id: 1,
    course: 'Cyber Security',
    instructor: 'Dr. Sarah Johnson',
    day: 'Monday',
    start: '10:00',
    end: '11:30',
    room: 'Room 101',
    online: true
  },
  {
    id: 2,
    course: 'Data Structures',
    instructor: 'Prof. Michael Chen',
    day: 'Tuesday',
    start: '14:00',
    end: '15:30',
    room: 'Room 203',
    online: false
  },
  {
    id: 3,
    course: 'Web Development',
    instructor: 'Dr. Emily Brown',
    day: 'Wednesday',
    start: '13:00',
    end: '14:30',
    room: 'Room 305',
    online: true
  },
  {
    id: 4,
    course: 'Cyber Security',
    instructor: 'Dr. Sarah Johnson',
    day: 'Wednesday',
    start: '10:00',
    end: '11:30',
    room: 'Room 101',
    online: false
  },
  {
    id: 5,
    course: 'Data Structures',
    instructor: 'Prof. Michael Chen',
    day: 'Thursday',
    start: '14:00',
    end: '15:30',
    room: 'Room 203',
    online: true
  },
  {
    id: 6,
    course: 'Web Development',
    instructor: 'Dr. Emily Brown',
    day: 'Friday',
    start: '13:00',
    end: '14:30',
    room: 'Room 305',
    online: false
  }
];

function getToday() {
  const jsDay = new Date().getDay();
  // JS: 0=Sun, 1=Mon, ..., 6=Sat; our weekDays: 0=Mon, ..., 4=Fri
  return weekDays[jsDay - 1] || 'Monday';
}

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(getToday());
  const today = getToday();
  const todayClasses = scheduleData.filter(cls => cls.day === today);
  const filteredClasses = scheduleData.filter(cls => cls.day === selectedDay);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
                <Calendar className="w-7 h-7 text-blue-600" /> Class Schedule
              </h1>
              <p className="text-gray-500 text-lg">Your weekly timetable at a glance</p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              {weekDays.map((day, idx) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${selectedDay === day ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 border border-blue-100 hover:bg-blue-50'}`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Today's Classes Highlight */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2"><Clock className="w-5 h-5" /> Today's Classes</h2>
            <div className="flex flex-wrap gap-4">
              {todayClasses.length === 0 && <div className="text-gray-400">No classes today!</div>}
              {todayClasses.map((cls, idx) => (
                <div key={cls.id} className={`rounded-xl p-4 min-w-[220px] shadow-md flex flex-col gap-2 ${classColors[idx % classColors.length]}`}>
                  <div className="flex items-center gap-2 text-lg font-bold text-gray-800"><BookOpen className="w-5 h-5 text-blue-500" /> {cls.course}</div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm"><Users className="w-4 h-4" /> {cls.instructor}</div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm"><Clock className="w-4 h-4" /> {cls.start} - {cls.end}</div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm"><MapPin className="w-4 h-4" /> {cls.room}</div>
                  {cls.online && <div className="flex items-center gap-1 text-xs text-green-700 font-semibold"><Video className="w-4 h-4" /> Online Available</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule Table */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">{selectedDay}'s Classes</h2>
            </div>
            <div className="space-y-4">
              {filteredClasses.length === 0 && <div className="text-gray-400">No classes scheduled for {selectedDay}.</div>}
              {filteredClasses.map((cls, idx) => (
                <div key={cls.id} className={`flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl shadow-sm border-l-4 ${classColors[idx % classColors.length]}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800"><BookOpen className="w-5 h-5 text-blue-500" /> {cls.course}</div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><Users className="w-4 h-4" /> {cls.instructor}</div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><Clock className="w-4 h-4" /> {cls.start} - {cls.end}</div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><MapPin className="w-4 h-4" /> {cls.room}</div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {cls.online && <button className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"><Video className="w-4 h-4" /> Join Online</button>}
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"><PlusCircle className="w-4 h-4" /> Add to Calendar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><ChevronRight className="w-5 h-5 text-blue-500" /> Upcoming Classes</h2>
            <div className="flex flex-wrap gap-4">
              {scheduleData.slice(0, 3).map((cls, idx) => (
                <div key={cls.id} className="rounded-xl p-4 min-w-[200px] shadow bg-white flex flex-col gap-2 border-l-4 border-blue-200">
                  <div className="font-semibold text-blue-700">{cls.course}</div>
                  <div className="text-xs text-gray-500">{cls.day}, {cls.start} - {cls.end}</div>
                  <div className="text-xs text-gray-500">{cls.room}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 