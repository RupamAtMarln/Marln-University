import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { 
  ArrowLeft, 
  FileText, 
  Upload, 
  User, 
  Calendar,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  BookOpen,
  Gavel,
  MapPin,
  Clock
} from 'lucide-react';

function CaseBriefsSubmissionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course || { title: 'All Courses' };
  const returnTo = location.state?.returnTo || (location.key ? -1 : '/student/courses');

  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    submissionDate: new Date().toISOString().split('T')[0],
    courseCaseBriefs: [
      {
        courseName: '',
        courseCode: '',
        caseBriefs: [
          {
            caseName: '',
            citation: '',
            court: '',
            date: '',
            facts: '',
            issue: '',
            holding: '',
            reasoning: '',
            dissent: '',
            significance: ''
          }
        ]
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courseCaseBriefs: [
        ...prev.courseCaseBriefs,
        {
          courseName: '',
          courseCode: '',
          caseBriefs: [
            {
              caseName: '',
              citation: '',
              court: '',
              date: '',
              facts: '',
              issue: '',
              holding: '',
              reasoning: '',
              dissent: '',
              significance: ''
            }
          ]
        }
      ]
    }));
  };

  const removeCourse = (courseIndex) => {
    if (formData.courseCaseBriefs.length > 1) {
      setFormData(prev => ({
        ...prev,
        courseCaseBriefs: prev.courseCaseBriefs.filter((_, index) => index !== courseIndex)
      }));
    }
  };

  const addCaseBrief = (courseIndex) => {
    setFormData(prev => ({
      ...prev,
      courseCaseBriefs: prev.courseCaseBriefs.map((course, index) => {
        if (index === courseIndex) {
          return {
            ...course,
            caseBriefs: [
              ...course.caseBriefs,
              {
                caseName: '',
                citation: '',
                court: '',
                date: '',
                facts: '',
                issue: '',
                holding: '',
                reasoning: '',
                dissent: '',
                significance: ''
              }
            ]
          };
        }
        return course;
      })
    }));
  };

  const removeCaseBrief = (courseIndex, caseIndex) => {
    setFormData(prev => ({
      ...prev,
      courseCaseBriefs: prev.courseCaseBriefs.map((course, index) => {
        if (index === courseIndex) {
          return {
            ...course,
            caseBriefs: course.caseBriefs.filter((_, caseIdx) => caseIdx !== caseIndex)
          };
        }
        return course;
      })
    }));
  };

  const updateCourse = (courseIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      courseCaseBriefs: prev.courseCaseBriefs.map((course, index) => {
        if (index === courseIndex) {
          return { ...course, [field]: value };
        }
        return course;
      })
    }));
  };

  const updateCaseBrief = (courseIndex, caseIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      courseCaseBriefs: prev.courseCaseBriefs.map((course, index) => {
        if (index === courseIndex) {
          return {
            ...course,
            caseBriefs: course.caseBriefs.map((caseBrief, caseIdx) => {
              if (caseIdx === caseIndex) {
                return { ...caseBrief, [field]: value };
              }
              return caseBrief;
            })
          };
        }
        return course;
      })
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    formData.courseCaseBriefs.forEach((course, courseIndex) => {
      if (!course.courseName.trim()) {
        newErrors[`course${courseIndex}Name`] = 'Course name is required';
      }
      if (!course.courseCode.trim()) {
        newErrors[`course${courseIndex}Code`] = 'Course code is required';
      }

      course.caseBriefs.forEach((caseBrief, caseIndex) => {
        if (!caseBrief.caseName.trim()) {
          newErrors[`course${courseIndex}Case${caseIndex}Name`] = 'Case name is required';
        }
        if (!caseBrief.facts.trim()) {
          newErrors[`course${courseIndex}Case${caseIndex}Facts`] = 'Facts are required';
        }
        if (!caseBrief.issue.trim()) {
          newErrors[`course${courseIndex}Case${caseIndex}Issue`] = 'Issue is required';
        }
        if (!caseBrief.holding.trim()) {
          newErrors[`course${courseIndex}Case${caseIndex}Holding`] = 'Holding is required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Case briefs submitted successfully!');
      // Smart navigation after successful submission
      if (typeof returnTo === 'number') {
        navigate(returnTo);
      } else {
        navigate(returnTo);
      }
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  // Smart back navigation - go to where we came from or default to courses
                  if (typeof returnTo === 'number') {
                    navigate(returnTo);
                  } else {
                    navigate(returnTo);
                  }
                }}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Case Briefs Submission Form</h1>
                <p className="text-gray-600 dark:text-gray-400">Submit case briefs and legal analysis</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Gavel className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  Case Brief Assignment Instructions
                </h2>
                <div className="text-green-800 dark:text-green-200 space-y-2 text-sm">
                  <p>
                    This form allows you to submit case briefs for multiple courses. For each course, provide the course information 
                    and detailed case briefs including facts, issues, holdings, and reasoning.
                  </p>
                  <p>
                    <strong>Note:</strong> Each case brief should include all required sections. You can add multiple courses 
                    and multiple case briefs per course. Make sure all required fields are completed before submission.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Student Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.studentName 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.studentName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.studentName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.studentId 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                    }`}
                    placeholder="Enter your student ID"
                  />
                  {errors.studentId && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.studentId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Course Case Briefs */}
            {formData.courseCaseBriefs.map((course, courseIndex) => (
              <div key={courseIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                    Course {courseIndex + 1}
                  </h2>
                  {formData.courseCaseBriefs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCourse(courseIndex)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course Name *
                    </label>
                    <input
                      type="text"
                      value={course.courseName}
                      onChange={(e) => updateCourse(courseIndex, 'courseName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors[`course${courseIndex}Name`] 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                      }`}
                      placeholder="e.g., Criminal Law"
                    />
                    {errors[`course${courseIndex}Name`] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Name`]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course Code *
                    </label>
                    <input
                      type="text"
                      value={course.courseCode}
                      onChange={(e) => updateCourse(courseIndex, 'courseCode', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors[`course${courseIndex}Code`] 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                      }`}
                      placeholder="e.g., CRIM201"
                    />
                    {errors[`course${courseIndex}Code`] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Code`]}</p>
                    )}
                  </div>
                </div>

                {/* Case Briefs List */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Case Briefs</h3>
                    <button
                      type="button"
                      onClick={() => addCaseBrief(courseIndex)}
                      className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Case Brief
                    </button>
                  </div>

                  {course.caseBriefs.map((caseBrief, caseIndex) => (
                    <div key={caseIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Case Brief {caseIndex + 1}
                        </h4>
                        {course.caseBriefs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCaseBrief(courseIndex, caseIndex)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Case Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Case Name *
                          </label>
                          <input
                            type="text"
                            value={caseBrief.caseName}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'caseName', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              errors[`course${courseIndex}Case${caseIndex}Name`] 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                            }`}
                            placeholder="e.g., Brown v. Board of Education"
                          />
                          {errors[`course${courseIndex}Case${caseIndex}Name`] && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Case${caseIndex}Name`]}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Citation
                          </label>
                          <input
                            type="text"
                            value={caseBrief.citation}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'citation', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                            placeholder="e.g., 347 U.S. 483 (1954)"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Court
                          </label>
                          <input
                            type="text"
                            value={caseBrief.court}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'court', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                            placeholder="e.g., U.S. Supreme Court"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            value={caseBrief.date}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>

                      {/* Case Analysis */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Facts *
                          </label>
                          <textarea
                            value={caseBrief.facts}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'facts', e.target.value)}
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              errors[`course${courseIndex}Case${caseIndex}Facts`] 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                            }`}
                            placeholder="Summarize the key facts of the case..."
                          />
                          {errors[`course${courseIndex}Case${caseIndex}Facts`] && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Case${caseIndex}Facts`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Issue *
                          </label>
                          <textarea
                            value={caseBrief.issue}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'issue', e.target.value)}
                            rows={2}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              errors[`course${courseIndex}Case${caseIndex}Issue`] 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                            }`}
                            placeholder="What legal question is the court addressing?"
                          />
                          {errors[`course${courseIndex}Case${caseIndex}Issue`] && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Case${caseIndex}Issue`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Holding *
                          </label>
                          <textarea
                            value={caseBrief.holding}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'holding', e.target.value)}
                            rows={2}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              errors[`course${courseIndex}Case${caseIndex}Holding`] 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                            }`}
                            placeholder="What did the court decide?"
                          />
                          {errors[`course${courseIndex}Case${caseIndex}Holding`] && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Case${caseIndex}Holding`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Reasoning
                          </label>
                          <textarea
                            value={caseBrief.reasoning}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'reasoning', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                            placeholder="Explain the court's legal reasoning and analysis..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Dissent (if any)
                          </label>
                          <textarea
                            value={caseBrief.dissent}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'dissent', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                            placeholder="Summarize any dissenting opinions..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Significance
                          </label>
                          <textarea
                            value={caseBrief.significance}
                            onChange={(e) => updateCaseBrief(courseIndex, caseIndex, 'significance', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                            placeholder="What is the broader impact of this decision?"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add Course Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={addCourse}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Course
              </button>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submit Case Briefs
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CaseBriefsSubmissionForm;
