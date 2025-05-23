import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { courses as initialCourses, predefinedCourses } from '../../data/courses';
import { Plus, Edit, Eye, X, Download } from 'lucide-react';

export default function CourseManagement() {
  // Load courses from localStorage or static file
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem('courses');
    return stored ? JSON.parse(stored) : initialCourses;
  });
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({ name: '', code: '', credits: '', hours: '', description: '' });

  // Add Course
  const handleAdd = (e) => {
    e.preventDefault();
    const newCourse = {
      id: courses.length + 1,
      name: form.name,
      code: form.code,
      credits: parseInt(form.credits),
      hours: parseInt(form.hours),
      description: form.description,
      source: 'university'
    };
    setCourses([...courses, newCourse]);
    setShowAddModal(false);
    setForm({ name: '', code: '', credits: '', hours: '', description: '' });
  };

  // Edit Course
  const handleEdit = (e) => {
    e.preventDefault();
    setCourses(courses.map(c => c.id === selectedCourse.id ? { ...selectedCourse, ...form, credits: parseInt(form.credits), hours: parseInt(form.hours) } : c));
    setShowEditModal(false);
    setForm({ name: '', code: '', credits: '', hours: '', description: '' });
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setForm({ name: course.name, code: course.code, credits: course.credits, hours: course.hours, description: course.description });
    setShowEditModal(true);
  };

  const openViewModal = (course) => {
    setSelectedCourse(course);
    setShowViewModal(true);
  };

  // Add Predefined Course
  const addPredefinedCourse = (predef) => {
    // Prevent duplicates by code
    if (courses.some(c => c.code === predef.code)) return;
    setCourses([...courses, { ...predef, id: courses.length + 1 }]);
  };

  // Reset to default handler
  const resetCoursesToDefault = () => {
    localStorage.removeItem('courses');
    setCourses(initialCourses);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
            <div className="flex gap-2">
              <button
                onClick={resetCoursesToDefault}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors border border-gray-300"
              >
                Reset Courses to Default
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                <span>Add New Course</span>
              </button>
            </div>
          </div>

          {/* Course List */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-700">{course.credits}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-700">{course.hours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{course.source === 'nexushive' ? 'NexusHive' : 'University'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => openViewModal(course)} className="text-blue-600 hover:text-blue-800"><Eye size={18} /></button>
                      <button onClick={() => openEditModal(course)} className="text-green-600 hover:text-green-800"><Edit size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Predefined Courses */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">NexusHive Predefined Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predefinedCourses.map((predef) => (
                <div key={predef.id} className="border rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-blue-700">{predef.name}</div>
                    <div className="text-sm text-gray-500">{predef.code}</div>
                    <div className="text-xs text-gray-400 mb-2">{predef.credits} credits, {predef.hours} hours</div>
                    <div className="text-xs text-gray-600 mb-2">{predef.description}</div>
                  </div>
                  <button
                    onClick={() => addPredefinedCourse(predef)}
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500"
                    disabled={courses.some(c => c.code === predef.code)}
                  >
                    {courses.some(c => c.code === predef.code) ? 'Added' : 'Add to University'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Add New Course</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Credits</label>
                  <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.credits} onChange={e => setForm(f => ({ ...f, credits: e.target.value }))} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Instructional Hours</label>
                  <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Edit Course</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Credits</label>
                  <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.credits} onChange={e => setForm(f => ({ ...f, credits: e.target.value }))} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Instructional Hours</label>
                  <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Course Modal */}
      {showViewModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedCourse.name} - Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="mb-2"><span className="font-semibold">Code:</span> {selectedCourse.code}</div>
            <div className="mb-2"><span className="font-semibold">Credits:</span> {selectedCourse.credits}</div>
            <div className="mb-2"><span className="font-semibold">Instructional Hours:</span> {selectedCourse.hours}</div>
            <div className="mb-2"><span className="font-semibold">Source:</span> {selectedCourse.source === 'nexushive' ? 'NexusHive' : 'University'}</div>
            <div className="mb-2"><span className="font-semibold">Description:</span> {selectedCourse.description}</div>
          </div>
        </div>
      )}
    </div>
  );
} 