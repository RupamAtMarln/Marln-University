import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import StudentsManagement from './pages/admin/StudentsManagement.jsx';
import InstructorDashboard from './pages/instructor/InstructorDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProgramManagement from './pages/admin/ProgramManagement.jsx';
import InstructorManagement from './pages/admin/InstructorManagement.jsx';
import CourseManagement from './pages/admin/CourseManagement.jsx';
import DocumentManagement from './pages/admin/DocumentManagement.jsx';
import AcademicCalendar from './pages/admin/AcademicCalendar.jsx';
import Notifications from './pages/admin/Notifications.jsx';
import Reports from './pages/admin/Reports.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import SystemSettings from './pages/admin/SystemSettings.jsx';
import Profile from './pages/admin/Profile.jsx';
import DepartmentDashboard from './pages/admin/DepartmentDashboard.jsx';
import InstructorProfile from './pages/instructor/Profile.jsx';
import MyCourses from './pages/instructor/MyCourses.jsx';
import InstructorStudentsManagement from './pages/instructor/StudentsManagement.jsx';
import Assignments from './pages/instructor/Assignments.jsx';
import Grades from './pages/instructor/Grades.jsx';
import TeachingSchedule from './pages/instructor/TeachingSchedule.jsx';
import CourseMaterials from './pages/instructor/CourseMaterials.jsx';
import NotificationsInstructor from './pages/instructor/Notifications.jsx';
import StudentMessages from './pages/instructor/StudentMessages.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsManagement />} />
            <Route path="/admin/programs" element={<ProgramManagement />} />
            <Route path="/admin/instructors" element={<InstructorManagement />} />
            <Route path="/admin/courses" element={<CourseManagement />} />
            <Route path="/admin/documents" element={<DocumentManagement />} />
            <Route path="/admin/calendar" element={<AcademicCalendar />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/settings" element={<SystemSettings />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/departments" element={<DepartmentDashboard />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['instructor']} />}>
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/profile" element={<InstructorProfile />} />
            <Route path="/instructor/courses" element={<MyCourses />} />
            <Route path="/instructor/students" element={<InstructorStudentsManagement />} />
            <Route path="/instructor/assignments" element={<Assignments />} />
            <Route path="/instructor/grades" element={<Grades />} />
            <Route path="/instructor/calendar" element={<TeachingSchedule />} />
            <Route path="/instructor/materials" element={<CourseMaterials />} />
            <Route path="/instructor/messages" element={<StudentMessages />} />
            <Route path="/instructor/notifications" element={<NotificationsInstructor />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['student']} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
