import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users2, 
  UserCircle, 
  BookOpen, 
  Bell, 
  BarChart3, 
  LogOut,
  Settings,
  Building2,
  GraduationCap,
  FileText,
  Calendar,
  ClipboardList,
  MessageSquare,
  BookMarked,
  Award,
  Library
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const adminMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'students', label: 'Student Management', icon: Users2, path: '/admin/students' },
  { id: 'instructors', label: 'Instructor Management', icon: UserCircle, path: '/admin/instructors' },
  { id: 'programs', label: 'Program Management', icon: BookOpen, path: '/admin/programs' },
  { id: 'departments', label: 'Depart. Management', icon: Building2, path: '/admin/departments' },
  { id: 'courses', label: 'Course Management', icon: GraduationCap, path: '/admin/courses' },
  { id: 'documents', label: 'Document Management', icon: FileText, path: '/admin/documents' },
  { id: 'calendar', label: 'Academic Calendar', icon: Calendar, path: '/admin/calendar' },
  { id: 'notifications', label: 'Notifications/Queries', icon: Bell, path: '/admin/notifications' },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, path: '/admin/reports' },
  { id: 'users', label: 'User Management', icon: Users2, path: '/admin/users' },
  { id: 'settings', label: 'System Settings', icon: Settings, path: '/admin/settings' },
];

const instructorMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/instructor/dashboard' },
  { id: 'courses', label: 'My Courses', icon: BookOpen, path: '/instructor/courses' },
  { id: 'students', label: 'Students Management', icon: Users2, path: '/instructor/students' },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList, path: '/instructor/assignments' },
  { id: 'grades', label: 'Grades & Assessment', icon: GraduationCap, path: '/instructor/grades' },
  { id: 'calendar', label: 'Teaching Schedule', icon: Calendar, path: '/instructor/calendar' },
  { id: 'materials', label: 'Course Materials', icon: FileText, path: '/instructor/materials' },
  { id: 'messages', label: 'Student Messages', icon: MessageSquare, path: '/instructor/messages' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/instructor/notifications' },
];

const studentMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { id: 'my-courses', label: 'My Courses', icon: BookOpen, path: '/student/courses' },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList, path: '/student/assignments' },
  { id: 'grades', label: 'My Grades', icon: Award, path: '/student/grades' },
  { id: 'schedule', label: 'Class Schedule', icon: Calendar, path: '/student/schedule' },
  { id: 'materials', label: 'Course Materials', icon: Library, path: '/student/materials' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/student/messages' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/student/notifications' },
  { id: 'ecollab', label: 'eCollab', icon: BookMarked, path: '/student/ecollab' },
];

export default function Sidebar({ role: propRole }) {
  const { role: authRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Use the role from props if provided, otherwise use the role from auth context
  const role = propRole || authRole;

  const menuItems = role === 'admin' ? adminMenuItems : 
                   role === 'instructor' ? instructorMenuItems :
                   role === 'student' ? studentMenuItems : [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine active tab based on current path
  const activeTab = menuItems.find(item => location.pathname.startsWith(item.path))?.id;

  // Get user display name based on role
  const getUserDisplayName = () => {
    switch (role) {
      case 'instructor':
        return 'Dr. Emily Carter';
      case 'student':
        return 'John Smith';
      case 'admin':
        return 'Alex Johnson';
      default:
        return 'User';
    }
  };

  // Get profile path based on role
  const getProfilePath = () => {
    switch (role) {
      case 'admin':
        return '/admin/profile';
      case 'instructor':
        return '/instructor/profile';
      case 'student':
        return '/student/profile';
      default:
        return '/';
    }
  };

  return (
    <div className="w-64 h-screen bg-[#11296F] text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-[#0a1f4d]">
        <h1 className="text-xl font-bold">NexusHive</h1>
      </div>

      {/* User Info */}
      <button
        className="p-4 border-b border-[#0a1f4d] w-full text-left hover:bg-[#223a7a] transition-colors"
        onClick={() => navigate(getProfilePath())}
        aria-label="Edit Profile"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
            {getUserDisplayName().split(' ').map(word => word[0]).join('')}
          </div>
          <div>
            <p className="font-medium">{getUserDisplayName()}</p>
            <p className="text-sm text-[#4a6baa]">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
          </div>
        </div>
      </button>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-[#0a1f4d] transition-colors ${
              activeTab === item.id ? 'bg-[#0a1f4d]' : ''
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="p-4 border-t border-[#0a1f4d] flex items-center space-x-3 hover:bg-[#0a1f4d] transition-colors"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}
