import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { programs as initialPrograms } from '../../data/programs';
import { Plus, Edit, Eye, X } from 'lucide-react';

export default function ProgramManagement() {
  const [programs, setPrograms] = useState(initialPrograms);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form, setForm] = useState({ name: '', duration: '', specialization: '' });

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Program Management</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add New Program</span>
            </button>
          </div>

          {/* Program List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Years)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.specialization}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => openViewModal(program)} className="text-blue-600 hover:text-blue-800"><Eye size={18} /></button>
                      <button onClick={() => openEditModal(program)} className="text-green-600 hover:text-green-800"><Edit size={18} /></button>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Add New Program</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Program Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (Years)</label>
                <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.specialization} onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Program Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Edit Program</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Program Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (Years)</label>
                <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" required value={form.specialization} onChange={e => setForm(f => ({ ...f, specialization: e.target.value }))} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Program Modal */}
      {showViewModal && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProgram.name} - Terms/Semesters</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="space-y-2">
              {selectedProgram.terms.map(term => (
                <div key={term.term} className="border rounded p-3 flex items-center justify-between">
                  <span className="font-semibold">Term/Semester {term.term}</span>
                  <span className="text-sm text-gray-500">Courses: {term.courses.length}</span>
                  {/* Future: Add manage courses button here */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 