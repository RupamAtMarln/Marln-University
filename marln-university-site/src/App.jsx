import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import InstructorDashboard from './pages/instructor/InstructorDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

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
          </Route>
          <Route element={<PrivateRoute allowedRoles={['instructor']} />}>
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['student']} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
