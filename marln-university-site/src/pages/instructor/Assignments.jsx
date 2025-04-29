import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { BookOpen, FileText, Users2, Eye, Download, CheckCircle, X, Edit, MessageCircle, ClipboardList } from 'lucide-react';

const dummyCourses = [
  { id: 1, code: 'CS101', name: 'Introduction to Computer Science' },
  { id: 2, code: 'ML305', name: 'Machine Learning' },
  { id: 3, code: 'DS220', name: 'Data Structures' },
];

const dummyAssignments = {
  CS101: [
    { id: 1, title: 'Assignment 1: Basics', due: '2024-06-20', submissions: 38, status: 'Open' },
    { id: 2, title: 'Assignment 2: Loops', due: '2024-06-27', submissions: 30, status: 'Open' },
  ],
  ML305: [
    { id: 3, title: 'Assignment 1: Regression', due: '2024-06-22', submissions: 28, status: 'Open' },
  ],
  DS220: [
    { id: 4, title: 'Assignment 1: Linked Lists', due: '2024-06-25', submissions: 32, status: 'Open' },
  ],
};

const dummySubmissions = {
  1: [
    { id: 1, student: 'Sarah Lee', file: 'Sarah_Assignment1.pdf', submitted: '2024-06-18 10:30', status: 'Submitted', grade: '', feedback: '' },
    { id: 2, student: 'David Kim', file: 'David_Assignment1.pdf', submitted: '2024-06-18 11:00', status: 'Submitted', grade: '', feedback: '' },
    { id: 3, student: 'Eva Green', file: 'Eva_Assignment1.pdf', submitted: '2024-06-18 09:45', status: 'Submitted', grade: '', feedback: '' },
  ],
  2: [],
  3: [
    { id: 4, student: 'Tom White', file: 'Tom_Assignment1.pdf', submitted: '2024-06-19 14:20', status: 'Submitted', grade: '', feedback: '' },
  ],
  4: [
    { id: 5, student: 'Paul Gray', file: 'Paul_Assignment1.pdf', submitted: '2024-06-20 13:00', status: 'Submitted', grade: '', feedback: '' },
  ],
};

export default function Assignments() {
  const [selectedCourse, setSelectedCourse] = useState(dummyCourses[0].code);
  const [showModal, setShowModal] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [grades, setGrades] = useState({});

  const assignments = dummyAssignments[selectedCourse] || [];

  const openModal = (assignment) => {
    setActiveAssignment(assignment);
    setSubmissions(dummySubmissions[assignment.id] || []);
    setShowModal(true);
    setFeedbacks({});
    setGrades({});
  };
  const closeModal = () => {
    setShowModal(false);
    setActiveAssignment(null);
    setSubmissions([]);
    setFeedbacks({});
    setGrades({});
  };
  const handleFeedbackChange = (id, value) => {
    setFeedbacks((prev) => ({ ...prev, [id]: value }));
  };
  const handleGradeChange = (id, value) => {
    setGrades((prev) => ({ ...prev, [id]: value }));
  };
  const saveFeedback = (id) => {
    setSubmissions((prev) => prev.map(s => s.id === id ? { ...s, feedback: feedbacks[id] || '', grade: grades[id] || '' } : s));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Assignments</h1>
        {/* Course Selector */}
        <div className="mb-6 flex items-center gap-4">
          <ClipboardList size={24} className="text-blue-600" />
          <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="border rounded px-3 py-2 text-lg">
            {dummyCourses.map(c => <option key={c.code} value={c.code}>{c.code}: {c.name}</option>)}
          </select>
        </div>
        {/* Assignments Table */}
        <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-center">Submissions</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id} className="border-t hover:bg-blue-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-800">{a.title}</td>
                  <td className="py-3 px-4 text-gray-600">{a.due}</td>
                  <td className="py-3 px-4 text-center">{a.submissions}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${a.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{a.status}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 mr-2" title="View Submissions" onClick={() => openModal(a)}><Eye size={18} /></button>
                    <button className="text-green-600 hover:text-green-800" title="Download All"><Download size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assignment Submissions Modal */}
        {showModal && activeAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={closeModal}><X size={28} /></button>
              <h2 className="text-xl font-bold text-blue-700 mb-4">{activeAssignment.title} - Submissions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="py-2 px-2 text-left">Student</th>
                      <th className="py-2 px-2 text-left">File</th>
                      <th className="py-2 px-2 text-left">Submitted</th>
                      <th className="py-2 px-2 text-center">Status</th>
                      <th className="py-2 px-2 text-center">Grade</th>
                      <th className="py-2 px-2 text-center">Feedback</th>
                      <th className="py-2 px-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 && (
                      <tr><td colSpan={7} className="text-center text-gray-400 py-4">No submissions yet.</td></tr>
                    )}
                    {submissions.map((s) => (
                      <tr key={s.id} className="border-t">
                        <td className="py-2 px-2 font-semibold text-gray-800">{s.student}</td>
                        <td className="py-2 px-2 text-blue-700 underline cursor-pointer">{s.file}</td>
                        <td className="py-2 px-2 text-gray-600">{s.submitted}</td>
                        <td className="py-2 px-2 text-center">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">{s.status}</span>
                        </td>
                        <td className="py-2 px-2 text-center">
                          <input type="text" className="border rounded px-2 py-1 w-16 text-center" value={grades[s.id] !== undefined ? grades[s.id] : s.grade} onChange={e => handleGradeChange(s.id, e.target.value)} placeholder="Grade" />
                        </td>
                        <td className="py-2 px-2 text-center">
                          <input type="text" className="border rounded px-2 py-1 w-32 text-center" value={feedbacks[s.id] !== undefined ? feedbacks[s.id] : s.feedback} onChange={e => handleFeedbackChange(s.id, e.target.value)} placeholder="Feedback" />
                        </td>
                        <td className="py-2 px-2 text-center">
                          <button className="text-blue-600 hover:text-blue-800 mr-2" title="Save Feedback & Grade" onClick={() => saveFeedback(s.id)}><CheckCircle size={18} /></button>
                          <button className="text-green-600 hover:text-green-800" title="Message Student"><MessageCircle size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 