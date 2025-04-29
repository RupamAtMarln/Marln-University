import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { BookOpen, BarChart2, UserCircle, Edit, CheckCircle, X, MessageCircle } from 'lucide-react';

const dummyCourses = [
  { id: 1, code: 'CS101', name: 'Introduction to Computer Science' },
  { id: 2, code: 'ML305', name: 'Machine Learning' },
  { id: 3, code: 'DS220', name: 'Data Structures' },
];

const dummyGrades = {
  CS101: [
    { id: 1, name: 'Sarah Lee', email: 'sarah.lee@example.com', assignments: [90, 85], final: 88, feedback: 'Great work!' },
    { id: 2, name: 'David Kim', email: 'david.kim@example.com', assignments: [70, 75], final: 73, feedback: 'Needs improvement.' },
    { id: 3, name: 'Eva Green', email: 'eva.green@example.com', assignments: [95, 98], final: 97, feedback: 'Outstanding!' },
  ],
  ML305: [
    { id: 4, name: 'Tom White', email: 'tom.white@example.com', assignments: [80], final: 80, feedback: '' },
    { id: 5, name: 'Uma Black', email: 'uma.black@example.com', assignments: [88], final: 88, feedback: 'Very engaged.' },
  ],
  DS220: [
    { id: 6, name: 'Paul Gray', email: 'paul.gray@example.com', assignments: [78], final: 78, feedback: '' },
    { id: 7, name: 'Grace Black', email: 'grace.black@example.com', assignments: [82], final: 82, feedback: '' },
  ],
};

export default function Grades() {
  const [selectedCourse, setSelectedCourse] = useState(dummyCourses[0].code);
  const [showModal, setShowModal] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);
  const [editFinal, setEditFinal] = useState('');
  const [editFeedback, setEditFeedback] = useState('');

  const students = dummyGrades[selectedCourse] || [];

  const openModal = (student) => {
    setActiveStudent(student);
    setEditFinal(student.final);
    setEditFeedback(student.feedback || '');
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setActiveStudent(null);
    setEditFinal('');
    setEditFeedback('');
  };
  const saveGrade = () => {
    if (activeStudent) {
      activeStudent.final = editFinal;
      activeStudent.feedback = editFeedback;
    }
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Grades & Assessment</h1>
        {/* Course Selector */}
        <div className="mb-6 flex items-center gap-4">
          <BarChart2 size={24} className="text-blue-600" />
          <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="border rounded px-3 py-2 text-lg">
            {dummyCourses.map(c => <option key={c.code} value={c.code}>{c.code}: {c.name}</option>)}
          </select>
        </div>
        {/* Grades Table */}
        <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">Student</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Assignments</th>
                <th className="py-3 px-4 text-center">Final Grade</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t hover:bg-blue-50 transition">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserCircle size={28} className="text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-800">{s.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{s.email}</td>
                  <td className="py-3 px-4 text-center">
                    {s.assignments.map((g, i) => (
                      <span key={i} className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-semibold mr-1">{g}</span>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-lg text-blue-700">{s.final}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 mr-2" title="Edit Grade" onClick={() => openModal(s)}><Edit size={18} /></button>
                    <button className="text-green-600 hover:text-green-800" title="Message"><MessageCircle size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grade Modal */}
        {showModal && activeStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={closeModal}><X size={28} /></button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircle size={48} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{activeStudent.name}</div>
                  <div className="text-gray-500">{activeStudent.email}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2"><BarChart2 size={18}/> Assignment Grades</div>
                <div className="flex gap-2 flex-wrap">
                  {activeStudent.assignments.map((g, i) => (
                    <span key={i} className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-semibold">Assignment {i+1}: {g}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2"><CheckCircle size={18}/> Final Grade</div>
                <input type="number" className="border rounded px-2 py-1 w-24 text-center text-lg font-bold" value={editFinal} onChange={e => setEditFinal(e.target.value)} />
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2"><Edit size={18}/> Feedback</div>
                <textarea className="w-full border rounded p-2" rows={3} value={editFeedback} onChange={e => setEditFeedback(e.target.value)} placeholder="Add feedback..." />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={saveGrade}>Save Grade</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 