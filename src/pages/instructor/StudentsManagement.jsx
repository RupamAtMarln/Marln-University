import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { UserCircle, Mail, BarChart2, MessageCircle, Eye, CheckCircle, X, BookOpen, FileText } from 'lucide-react';

const dummyCourses = [
  { id: 1, code: 'CS101', name: 'Introduction to Computer Science' },
  { id: 2, code: 'ML305', name: 'Machine Learning' },
  { id: 3, code: 'DS220', name: 'Data Structures' },
];

const dummyStudents = {
  CS101: [
    { id: 1, name: 'Sarah Lee', email: 'sarah.lee@example.com', year: 'Sophomore', avatar: '', progress: 85, attendance: 92, lastActive: '2 days ago', notes: 'Excellent participation.' },
    { id: 2, name: 'David Kim', email: 'david.kim@example.com', year: 'Freshman', avatar: '', progress: 70, attendance: 80, lastActive: '1 day ago', notes: 'Needs help with assignments.' },
    { id: 3, name: 'Eva Green', email: 'eva.green@example.com', year: 'Junior', avatar: '', progress: 95, attendance: 98, lastActive: 'Today', notes: 'Top performer.' },
  ],
  ML305: [
    { id: 4, name: 'Tom White', email: 'tom.white@example.com', year: 'Senior', avatar: '', progress: 60, attendance: 75, lastActive: '3 days ago', notes: '' },
    { id: 5, name: 'Uma Black', email: 'uma.black@example.com', year: 'Junior', avatar: '', progress: 88, attendance: 90, lastActive: 'Today', notes: 'Very engaged.' },
  ],
  DS220: [
    { id: 6, name: 'Paul Gray', email: 'paul.gray@example.com', year: 'Sophomore', avatar: '', progress: 78, attendance: 85, lastActive: 'Yesterday', notes: '' },
    { id: 7, name: 'Grace Black', email: 'grace.black@example.com', year: 'Freshman', avatar: '', progress: 82, attendance: 88, lastActive: 'Today', notes: '' },
  ],
};

function getAttendanceColor(att) {
  if (att >= 90) return 'bg-green-500';
  if (att >= 75) return 'bg-yellow-400';
  return 'bg-red-500';
}

export default function StudentsManagement() {
  const [selectedCourse, setSelectedCourse] = useState(dummyCourses[0].code);
  const [showModal, setShowModal] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);
  const [note, setNote] = useState('');

  const students = dummyStudents[selectedCourse] || [];

  const openModal = (student) => {
    setActiveStudent(student);
    setNote(student.notes || '');
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setActiveStudent(null);
    setNote('');
  };
  const saveNote = () => {
    if (activeStudent) activeStudent.notes = note;
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Students Management</h1>
        {/* Course Selector */}
        <div className="mb-6 flex items-center gap-4">
          <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
          <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-lg dark:bg-gray-900 dark:text-gray-100">
            {dummyCourses.map(c => <option key={c.code} value={c.code}>{c.code}: {c.name}</option>)}
          </select>
        </div>
        {/* Students Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200">Student</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200">Email</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200">Year</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200">Progress</th>
                <th className="py-3 px-4 text-center text-gray-700 dark:text-gray-200">Attendance</th>
                <th className="py-3 px-4 text-center text-gray-700 dark:text-gray-200">Last Active</th>
                <th className="py-3 px-4 text-center text-gray-700 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <UserCircle size={28} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{s.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{s.email}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{s.year}</td>
                  <td className="py-3 px-4">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${s.progress}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">{s.progress}%</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block w-4 h-4 rounded-full ${getAttendanceColor(s.attendance)}`}></span>
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">{s.attendance}%</span>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-300">{s.lastActive}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mr-2" title="View Details" onClick={() => openModal(s)}><Eye size={18} /></button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 mr-2" title="Message"><MessageCircle size={18} /></button>
                    <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200" title="Add Note" onClick={() => openModal(s)}><FileText size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Detail Modal */}
        {showModal && activeStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100" onClick={closeModal}><X size={28} /></button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UserCircle size={48} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{activeStudent.name}</div>
                  <div className="text-gray-500 dark:text-gray-300">{activeStudent.email}</div>
                  <div className="text-gray-500 dark:text-gray-300 text-sm">{activeStudent.year}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2"><BarChart2 size={18}/> Progress</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${activeStudent.progress}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">{activeStudent.progress}% completed</div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2"><CheckCircle size={18}/> Attendance</div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-4 h-4 rounded-full ${getAttendanceColor(activeStudent.attendance)}`}></span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{activeStudent.attendance}%</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2"><FileText size={18}/> Instructor Notes</div>
                <textarea className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-900 dark:text-gray-100" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Add notes or feedback..." />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" onClick={saveNote}>Save Note</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 