import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FileText, Upload, Edit, Trash2, Plus } from 'lucide-react';

const dummyCourses = [
  { id: 1, name: 'CS101' },
  { id: 2, name: 'CS102' },
  { id: 3, name: 'CS103' },
];

const dummyMaterials = [
  { id: 1, title: 'Syllabus', type: 'syllabus', file: 'syllabus.pdf', uploadDate: '2024-06-01', courseId: 1 },
  { id: 2, title: 'Study Guide', type: 'study', file: 'study_guide.pdf', uploadDate: '2024-06-02', courseId: 1 },
  { id: 3, title: 'Assignment 1', type: 'assignment', file: 'assignment1.pdf', uploadDate: '2024-06-03', courseId: 2 },
  { id: 4, title: 'Quiz 1', type: 'quiz', file: 'quiz1.pdf', uploadDate: '2024-06-04', courseId: 3 },
];

export default function CourseMaterials() {
  const [materials, setMaterials] = useState(dummyMaterials);
  const [showModal, setShowModal] = useState(false);
  const [modalMaterial, setModalMaterial] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(dummyCourses[0].id);

  const openAddMaterial = () => {
    setModalMaterial({ title: '', type: 'syllabus', file: '', uploadDate: new Date().toISOString().split('T')[0], courseId: selectedCourse });
    setShowModal(true);
  };

  const openEditMaterial = (material) => {
    setModalMaterial(material);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMaterial(null);
  };

  const saveMaterial = () => {
    if (modalMaterial.id) {
      setMaterials(materials.map(m => m.id === modalMaterial.id ? modalMaterial : m));
    } else {
      setMaterials([...materials, { ...modalMaterial, id: Date.now() }]);
    }
    setShowModal(false);
    setModalMaterial(null);
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModalMaterial({ ...modalMaterial, file: file.name });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Course Materials</h1>
            <button onClick={openAddMaterial} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 flex items-center gap-2">
              <Plus size={18} /> Add Material
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Select Course</label>
            <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={selectedCourse} onChange={e => setSelectedCourse(Number(e.target.value))}>
              {dummyCourses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.filter(m => m.courseId === selectedCourse).map(material => (
              <div key={material.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col bg-white dark:bg-gray-800">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{material.title}</h2>
                  <div className="flex gap-2">
                    <button onClick={() => openEditMaterial(material)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"><Edit size={18} /></button>
                    <button onClick={() => deleteMaterial(material.id)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"><Trash2 size={18} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">{material.type}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">File: {material.file}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">Uploaded: {material.uploadDate}</p>
              </div>
            ))}
          </div>
        </div>
        {showModal && modalMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100" onClick={closeModal}><Trash2 size={28} /></button>
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">{modalMaterial.id ? 'Edit Material' : 'Add Material'}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                <input type="text" className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalMaterial.title} onChange={e => setModalMaterial({ ...modalMaterial, title: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Type</label>
                <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalMaterial.type} onChange={e => setModalMaterial({ ...modalMaterial, type: e.target.value })}>
                  <option value="syllabus">Syllabus</option>
                  <option value="study">Study Guide</option>
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">File</label>
                <input type="file" className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" onChange={handleFileChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Upload Date</label>
                <input type="date" className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full dark:bg-gray-900 dark:text-gray-100" value={modalMaterial.uploadDate} onChange={e => setModalMaterial({ ...modalMaterial, uploadDate: e.target.value })} />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" onClick={saveMaterial}>{modalMaterial.id ? 'Save Changes' : 'Add Material'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 