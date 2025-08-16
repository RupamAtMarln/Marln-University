import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { 
  ArrowLeft, 
  FileCheck, 
  Upload, 
  User, 
  Calendar,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  BookOpen,
  Clock,
  FileText,
  AlertTriangle
} from 'lucide-react';

function MidtermEssaySubmissionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course || { title: 'All Courses' };
  const returnTo = location.state?.returnTo || (location.key ? -1 : '/student/courses');

  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    submissionDate: new Date().toISOString().split('T')[0],
    courseEssays: [
      {
        courseName: '',
        courseCode: '',
        examDate: '',
        timeLimit: '',
        essayQuestions: [
          {
            questionNumber: '',
            questionText: '',
            answer: '',
            wordCount: '',
            timeSpent: ''
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
      courseEssays: [
        ...prev.courseEssays,
        {
          courseName: '',
          courseCode: '',
          examDate: '',
          timeLimit: '',
          essayQuestions: [
            {
              questionNumber: '',
              questionText: '',
              answer: '',
              wordCount: '',
              timeSpent: ''
            }
          ]
        }
      ]
    }));
  };

  const removeCourse = (courseIndex) => {
    if (formData.courseEssays.length > 1) {
      setFormData(prev => ({
        ...prev,
        courseEssays: prev.courseEssays.filter((_, index) => index !== courseIndex)
      }));
    }
  };

  const addEssayQuestion = (courseIndex) => {
    setFormData(prev => ({
      ...prev,
      courseEssays: prev.courseEssays.map((course, index) => {
        if (index === courseIndex) {
          return {
            ...course,
            essayQuestions: [
              ...course.essayQuestions,
              {
                questionNumber: '',
                questionText: '',
                answer: '',
                wordCount: '',
                timeSpent: ''
              }
            ]
          };
        }
        return course;
      })
    }));
  };

  const removeEssayQuestion = (courseIndex, questionIndex) => {
    setFormData(prev => ({
      ...prev,
      courseEssays: prev.courseEssays.map((course, index) => {
        if (index === courseIndex) {
          return {
            ...course,
            essayQuestions: course.essayQuestions.filter((_, qIdx) => qIdx !== questionIndex)
          };
        }
        return course;
      })
    }));
  };

  const updateCourse = (courseIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      courseEssays: prev.courseEssays.map((course, index) => {
        if (index === courseIndex) {
          return { ...course, [field]: value };
        }
        return course;
      })
    }));
  };

  const updateEssayQuestion = (courseIndex, questionIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      courseEssays: prev.courseEssays.map((course, index) => {
        if (index === courseIndex) {
          return {
            ...course,
            essayQuestions: course.essayQuestions.map((question, qIdx) => {
              if (qIdx === questionIndex) {
                return { ...question, [field]: value };
              }
              return question;
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

    formData.courseEssays.forEach((course, courseIndex) => {
      if (!course.courseName.trim()) {
        newErrors[`course${courseIndex}Name`] = 'Course name is required';
      }
      if (!course.courseCode.trim()) {
        newErrors[`course${courseIndex}Code`] = 'Course code is required';
      }
      if (!course.examDate) {
        newErrors[`course${courseIndex}ExamDate`] = 'Exam date is required';
      }

      course.essayQuestions.forEach((question, questionIndex) => {
        if (!question.questionNumber.trim()) {
          newErrors[`course${courseIndex}Question${questionIndex}Number`] = 'Question number is required';
        }
        if (!question.questionText.trim()) {
          newErrors[`course${courseIndex}Question${questionIndex}Text`] = 'Question text is required';
        }
        if (!question.answer.trim()) {
          newErrors[`course${courseIndex}Question${questionIndex}Answer`] = 'Answer is required';
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
      alert('Midterm essay exams submitted successfully!');
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Midterm Essay Exams Submission Form</h1>
                <p className="text-gray-600 dark:text-gray-400">Submit midterm essay examinations</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <FileCheck className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                  Midterm Essay Exam Instructions
                </h2>
                <div className="text-orange-800 dark:text-orange-200 space-y-2 text-sm">
                  <p>
                    This form allows you to submit midterm essay exams for multiple courses. Each exam should include the exam details, 
                    essay questions, and your written responses. Make sure to include word counts and time spent on each question.
                  </p>
                  <p>
                    <strong>Note:</strong> Each essay question should be answered thoroughly and demonstrate your understanding 
                    of the course material. You can add multiple courses and multiple essay questions per course.
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

            {/* Course Essay Exams */}
            {formData.courseEssays.map((course, courseIndex) => (
              <div key={courseIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-orange-500" />
                    Course {courseIndex + 1}
                  </h2>
                  {formData.courseEssays.length > 1 && (
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
                      placeholder="e.g., Criminal Procedure"
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
                      placeholder="e.g., CRIM302"
                    />
                    {errors[`course${courseIndex}Code`] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Code`]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Exam Date *
                    </label>
                    <input
                      type="date"
                      value={course.examDate}
                      onChange={(e) => updateCourse(courseIndex, 'examDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors[`course${courseIndex}ExamDate`] 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                      }`}
                    />
                    {errors[`course${courseIndex}ExamDate`] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}ExamDate`]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time Limit
                    </label>
                    <input
                      type="text"
                      value={course.timeLimit}
                      onChange={(e) => updateCourse(courseIndex, 'timeLimit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                      placeholder="e.g., 2 hours, 90 minutes"
                    />
                  </div>
                </div>

                {/* Essay Questions List */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Essay Questions</h3>
                    <button
                      type="button"
                      onClick={() => addEssayQuestion(courseIndex)}
                      className="inline-flex items-center px-3 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </button>
                  </div>

                  {course.essayQuestions.map((question, questionIndex) => (
                    <div key={questionIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Essay Question {questionIndex + 1}
                        </h4>
                        {course.essayQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEssayQuestion(courseIndex, questionIndex)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Question Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Question Number *
                          </label>
                          <input
                            type="text"
                            value={question.questionNumber}
                            onChange={(e) => updateEssayQuestion(courseIndex, questionIndex, 'questionNumber', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              errors[`course${courseIndex}Question${questionIndex}Number`] 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                            }`}
                            placeholder="e.g., 1, 2, 3 or A, B, C"
                          />
                          {errors[`course${courseIndex}Question${questionIndex}Number`] && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Question${questionIndex}Number`]}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Word Count
                          </label>
                          <input
                            type="number"
                            value={question.wordCount}
                            onChange={(e) => updateEssayQuestion(courseIndex, questionIndex, 'wordCount', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                            placeholder="e.g., 500"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Question Text *
                        </label>
                        <textarea
                          value={question.questionText}
                          onChange={(e) => updateEssayQuestion(courseIndex, questionIndex, 'questionText', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors[`course${courseIndex}Question${questionIndex}Text`] 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                          }`}
                          placeholder="Copy the essay question from your exam..."
                        />
                        {errors[`course${courseIndex}Question${questionIndex}Text`] && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Question${questionIndex}Text`]}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Answer *
                        </label>
                        <textarea
                          value={question.answer}
                          onChange={(e) => updateEssayQuestion(courseIndex, questionIndex, 'answer', e.target.value)}
                          rows={8}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors[`course${courseIndex}Question${questionIndex}Answer`] 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
                          }`}
                          placeholder="Write your comprehensive answer to the essay question. Include relevant legal principles, case law, and analysis..."
                        />
                        {errors[`course${courseIndex}Question${questionIndex}Answer`] && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[`course${courseIndex}Question${questionIndex}Answer`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Time Spent
                        </label>
                        <input
                          type="text"
                          value={question.timeSpent}
                          onChange={(e) => updateEssayQuestion(courseIndex, questionIndex, 'timeSpent', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-900 dark:text-gray-100"
                          placeholder="e.g., 45 minutes, 1 hour 15 minutes"
                        />
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
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white text-lg font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Course
              </button>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    Important Submission Notice
                  </h3>
                  <ul className="text-yellow-800 dark:text-yellow-200 space-y-1 text-sm">
                    <li>• Ensure all essay questions are answered completely and thoroughly</li>
                    <li>• Include relevant legal citations and case law references where applicable</li>
                    <li>• Submit before the deadline to avoid late penalties</li>
                    <li>• Double-check your answers for accuracy and completeness</li>
                    <li>• Contact your instructor immediately if you encounter technical issues</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-4 bg-orange-600 text-white text-lg font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submit Midterm Essays
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

export default MidtermEssaySubmissionForm;
