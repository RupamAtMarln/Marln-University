import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { instructors as initialInstructors, departments, batches } from '../../data/instructors';
import { Plus, Edit, Eye, X, Users, BookOpen, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function InstructorManagement() {
  const [instructors, setInstructors] = useState(initialInstructors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', department: '' });

  // State for viewing courses/batches
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showBatchesModal, setShowBatchesModal] = useState(false);

  // State for engagement modal
  const [showEngagementModal, setShowEngagementModal] = useState(false);

  // Add Instructor
  const handleAdd = (e) => {
    e.preventDefault();
    const newInstructor = {
      id: instructors.length + 1,
      name: form.name,
      email: form.email,
      department: form.department,
      assignedCourses: [],
      assignedBatches: [],
      engagement: 0
    };
    setInstructors([...instructors, newInstructor]);
    setShowAddModal(false);
    setForm({ name: '', email: '', department: '' });
  };

  // Edit Instructor
  const handleEdit = (e) => {
    e.preventDefault();
    setInstructors(instructors.map(i => i.id === selectedInstructor.id ? { ...selectedInstructor, ...form } : i));
    setShowEditModal(false);
    setForm({ name: '', email: '', department: '' });
  };

  const openEditModal = (instructor) => {
    setSelectedInstructor(instructor);
    setForm({ name: instructor.name, email: instructor.email, department: instructor.department });
    setShowEditModal(true);
  };

  const openViewModal = (instructor) => {
    setSelectedInstructor(instructor);
    setShowViewModal(true);
  };

  // Assign Courses (UI only)
  const [showAssignCourses, setShowAssignCourses] = useState(false);
  const [courseForm, setCourseForm] = useState({ course: '', program: '', start: '', end: '' });
  const handleAssignCourse = (e) => {
    e.preventDefault();
    setInstructors(instructors.map(i => i.id === selectedInstructor.id ? {
      ...i,
      assignedCourses: [...i.assignedCourses, { ...courseForm }]
    } : i));
    setCourseForm({ course: '', program: '', start: '', end: '' });
    setShowAssignCourses(false);
  };

  // Assign Batches (UI only)
  const [showAssignBatches, setShowAssignBatches] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const handleAssignBatches = () => {
    setInstructors(instructors.map(i => i.id === selectedInstructor.id ? {
      ...i,
      assignedBatches: selectedBatches
    } : i));
    setShowAssignBatches(false);
    setSelectedBatches([]);
  };

  const openCoursesModal = (instructor) => {
    setSelectedInstructor(instructor);
    setShowCoursesModal(true);
  };
  const openBatchesModal = (instructor) => {
    setSelectedInstructor(instructor);
    setShowBatchesModal(true);
  };

  const openEngagementModal = (instructor) => {
    setSelectedInstructor(instructor);
    setShowEngagementModal(true);
  };

  // Mock engagement breakdown data
  const getEngagementData = (instructor) => ([
    { name: 'Classes', value: Math.round(instructor.engagement * 0.9) },
    { name: 'Assignments', value: Math.round(instructor.engagement * 0.8) },
    { name: 'Feedback', value: Math.round(instructor.engagement * 0.95) },
    { name: 'Attendance', value: instructor.engagement },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Instructor Management</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add New Instructor</span>
            </button>
          </div>

          {/* Instructor List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Batches</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {instructors.map((instructor) => (
                  <tr key={instructor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{instructor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{instructor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{instructor.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-700 flex flex-col items-center">
                      <button onClick={() => openCoursesModal(instructor)} className="flex flex-col items-center focus:outline-none">
                        <BookOpen size={18} className="inline-block mb-1" />
                        {instructor.assignedCourses.length}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-700 flex flex-col items-center">
                      <button onClick={() => openBatchesModal(instructor)} className="flex flex-col items-center focus:outline-none">
                        <Users size={18} className="inline-block mb-1" />
                        {instructor.assignedBatches.length}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <button onClick={() => openEngagementModal(instructor)} className="flex items-center justify-center w-full focus:outline-none">
                        <BarChart3 size={18} className="inline-block mb-1 text-yellow-600" />
                        <span className="ml-1 font-semibold">{instructor.engagement}%</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => openViewModal(instructor)} className="text-blue-600 hover:text-blue-800"><Eye size={18} /></button>
                      <button onClick={() => openEditModal(instructor)} className="text-green-600 hover:text-green-800"><Edit size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Instructor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Add New Instructor</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
                  <option value="">Select Department</option>
                  {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Instructor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Instructor Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Edit Instructor</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
                  <option value="">Select Department</option>
                  {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Instructor Modal */}
      {showViewModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedInstructor.name} - Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="mb-4">
              <div className="font-semibold">Email:</div>
              <div className="mb-2">{selectedInstructor.email}</div>
              <div className="font-semibold">Department:</div>
              <div className="mb-2">{selectedInstructor.department}</div>
              <div className="font-semibold">Engagement:</div>
              <div className="mb-2">{selectedInstructor.engagement}%</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Assigned Courses:</div>
              {selectedInstructor.assignedCourses.length === 0 ? (
                <div className="text-gray-500">No courses assigned.</div>
              ) : (
                <ul className="list-disc ml-6">
                  {selectedInstructor.assignedCourses.map((c, idx) => (
                    <li key={idx}>{c.course} ({c.program}) <span className="text-xs text-gray-500">[{c.start} to {c.end}]</span></li>
                  ))}
                </ul>
              )}
              <button onClick={() => setShowAssignCourses(true)} className="mt-2 text-blue-600 hover:underline">Assign Course</button>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Assigned Batches:</div>
              {selectedInstructor.assignedBatches.length === 0 ? (
                <div className="text-gray-500">No batches assigned.</div>
              ) : (
                <ul className="list-disc ml-6">
                  {selectedInstructor.assignedBatches.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
              <button onClick={() => setShowAssignBatches(true)} className="mt-2 text-blue-600 hover:underline">Assign Batches</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Courses Modal */}
      {showAssignCourses && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Assign Course to {selectedInstructor.name}</h2>
              <button onClick={() => setShowAssignCourses(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleAssignCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={courseForm.course} onChange={e => setCourseForm(f => ({ ...f, course: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Program</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={courseForm.program} onChange={e => setCourseForm(f => ({ ...f, program: e.target.value }))} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={courseForm.start} onChange={e => setCourseForm(f => ({ ...f, start: e.target.value }))} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={courseForm.end} onChange={e => setCourseForm(f => ({ ...f, end: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAssignCourses(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Assign Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Batches Modal */}
      {showAssignBatches && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Assign Batches to {selectedInstructor.name}</h2>
              <button onClick={() => setShowAssignBatches(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Batches</label>
                <select multiple className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" value={selectedBatches} onChange={e => setSelectedBatches(Array.from(e.target.selectedOptions, option => option.value))}>
                  {batches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAssignBatches(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="button" onClick={handleAssignBatches} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Assign Batches</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Courses Modal */}
      {showCoursesModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Courses for {selectedInstructor.name}</h2>
              <button onClick={() => setShowCoursesModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            {selectedInstructor.assignedCourses.length === 0 ? (
              <div className="text-gray-500">No courses assigned.</div>
            ) : (
              <ul className="list-disc ml-6">
                {selectedInstructor.assignedCourses.map((c, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-semibold">{c.course}</span> <span className="text-xs text-gray-500">({c.program})</span><br/>
                    <span className="text-xs text-gray-500">{c.start} to {c.end}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {/* Batches Modal */}
      {showBatchesModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Batches for {selectedInstructor.name}</h2>
              <button onClick={() => setShowBatchesModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            {selectedInstructor.assignedBatches.length === 0 ? (
              <div className="text-gray-500">No batches assigned.</div>
            ) : (
              <ul className="list-disc ml-6">
                {selectedInstructor.assignedBatches.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Engagement Modal */}
      {showEngagementModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Engagement for {selectedInstructor.name}</h2>
              <button onClick={() => setShowEngagementModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getEngagementData(selectedInstructor)} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2563eb" name="Engagement (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
} 