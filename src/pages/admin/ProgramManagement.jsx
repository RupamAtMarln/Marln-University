import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { programs as initialPrograms } from '../../data/programs';
import { courses as initialCourses } from '../../data/courses';
import { Plus, Edit, Eye, X } from 'lucide-react';

export default function ProgramManagement() {
  // Load programs from localStorage or static file
  const [programs, setPrograms] = useState(() => {
    const stored = localStorage.getItem('programs');
    return stored ? JSON.parse(stored) : initialPrograms;
  });
  useEffect(() => {
    localStorage.setItem('programs', JSON.stringify(programs));
  }, [programs]);

  const [courses] = useState(() => {
    const stored = localStorage.getItem('courses');
    return stored ? JSON.parse(stored) : initialCourses;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form, setForm] = useState({ name: '', duration: '', specialization: '' });

  // Manage Courses Modal
  const [showManageCourses, setShowManageCourses] = useState(false);
  const [selectedTermIdx, setSelectedTermIdx] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const newProgram = {
      id: programs.length + 1,
      name: form.name,
      duration: parseInt(form.duration),
      specialization: form.specialization,
      terms: Array.from({ length: parseInt(form.duration) * 2 }, (_, i) => ({ term: i + 1, courses: [] }))
    };
    setPrograms([...programs, newProgram]);
    setShowAddModal(false);
    setForm({ name: '', duration: '', specialization: '' });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setPrograms(programs.map(p => p.id === selectedProgram.id ? { ...selectedProgram, ...form, duration: parseInt(form.duration) } : p));
    setShowEditModal(false);
    setForm({ name: '', duration: '', specialization: '' });
  };

  const openEditModal = (program) => {
    setSelectedProgram(program);
    setForm({ name: program.name, duration: program.duration, specialization: program.specialization });
    setShowEditModal(true);
  };

  const openViewModal = (program) => {
    setSelectedProgram(program);
    setShowViewModal(true);
  };

  // Open Manage Courses Modal for a term
  const openManageCourses = (termIdx) => {
    setSelectedTermIdx(termIdx);
    setShowManageCourses(true);
  };

  // Add course to term
  const addCourseToTerm = (courseId) => {
    setPrograms(programs.map(p => {
      if (p.id !== selectedProgram.id) return p;
      const updatedTerms = p.terms.map((t, idx) => {
        if (idx !== selectedTermIdx) return t;
        if (!t.courses.includes(courseId)) {
          return { ...t, courses: [...t.courses, courseId] };
        }
        return t;
      });
      return { ...p, terms: updatedTerms };
    }));
  };

  // Remove course from term
  const removeCourseFromTerm = (courseId) => {
    setPrograms(programs.map(p => {
      if (p.id !== selectedProgram.id) return p;
      const updatedTerms = p.terms.map((t, idx) => {
        if (idx !== selectedTermIdx) return t;
        return { ...t, courses: t.courses.filter(id => id !== courseId) };
      });
      return { ...p, terms: updatedTerms };
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Program Management</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add New Program</span>
            </button>
          </div>

          {/* Program List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration (Years)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{program.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{program.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{program.specialization}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => openViewModal(program)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"><Eye size={18} /></button>
                      <button onClick={() => openEditModal(program)} className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"><Edit size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Add New Program</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (Years)</label>
                <input type="number" min={1} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.specialization} onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">Add Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Program Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Edit Program</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"><X size={24} /></button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (Years)</label>
                <input type="number" min={1} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-700 dark:text-gray-100" required value={form.specialization} onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Program Modal */}
      {showViewModal && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedProgram.name} - Terms/Semesters</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"><X size={24} /></button>
            </div>
            <div className="space-y-2">
              {selectedProgram.terms.map((term, idx) => (
                <div key={term.term} className="border rounded p-3 flex items-center justify-between">
                  <span className="font-semibold">Term/Semester {term.term}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-300">Courses: {term.courses.length}</span>
                    <button onClick={() => openManageCourses(idx)} className="text-blue-600 hover:underline text-sm dark:text-blue-400 dark:hover:text-blue-300">Manage Courses</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manage Courses Modal */}
      {showManageCourses && selectedProgram && selectedTermIdx !== null && (() => {
        // Always get the latest program and term from state
        const latestProgram = programs.find(p => p.id === selectedProgram.id);
        const latestTerm = latestProgram?.terms[selectedTermIdx];
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Manage Courses for {latestProgram.name} - Term {latestTerm.term}</h2>
                <button onClick={() => setShowManageCourses(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"><X size={24} /></button>
              </div>
              <div className="mb-4">
                <div className="font-semibold mb-2">Current Courses:</div>
                {latestTerm.courses.length === 0 ? (
                  <div className="text-gray-500 dark:text-gray-300">No courses assigned.</div>
                ) : (
                  <ul className="list-disc ml-6">
                    {latestTerm.courses.map(cid => {
                      const course = courses.find(c => c.id === cid || c.id === String(cid));
                      return course ? (
                        <li key={cid} className="flex items-center justify-between">
                          <span>{course.name} ({course.code})</span>
                          <button onClick={() => removeCourseFromTerm(course.id)} className="ml-2 text-red-600 hover:underline text-xs dark:text-red-400 dark:hover:text-red-300">Remove</button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
              </div>
              <div className="mb-2 font-semibold">Add Course:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.filter(c => !latestTerm.courses.includes(c.id)).map(course => (
                  <div key={course.id} className={`border rounded-lg p-4 flex flex-col justify-between bg-white dark:bg-gray-700 shadow-sm`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">{course.name}</span>
                      {course.source === 'nexushive' && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded bg-blue-600 text-white dark:bg-blue-700 dark:text-white">MarLn</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">Code: {course.code}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Credits: {course.credits} | Hours: {course.hours}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">{course.description}</div>
                    <button onClick={() => addCourseToTerm(course.id)} className="self-end mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-xs">Add</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
} 