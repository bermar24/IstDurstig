import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Leaf,
  List,
  Plus,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Settings
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setProfileDropdownOpen(false);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'My Plants', href: '/plants', icon: Leaf },
    { name: 'Plant Lists', href: '/plant-lists', icon: List },
    { name: 'Add Plant', href: '/add-plant', icon: Plus },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Leaf className="h-8 w-8 text-green-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">Ist Durstig</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`${
                                isActive(item.href)
                                    ? 'border-green-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Link>
                    );
                  })}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="relative profile-dropdown">
                  <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <User className="h-5 w-5 text-gray-400" />
                    <span>{user?.firstName} {user?.lastName}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                          <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                          <div className="text-gray-500">{user?.email}</div>
                        </div>
                        <button
                            onClick={handleProfileClick}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-200"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Profile & Settings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                >
                  {mobileMenuOpen ? (
                      <X className="block h-6 w-6" />
                  ) : (
                      <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
              <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`${
                                isActive(item.href)
                                    ? 'bg-green-50 border-green-500 text-green-700'
                                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <Icon className="h-4 w-4 mr-3" />
                            {item.name}
                          </div>
                        </Link>
                    );
                  })}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <User className="h-5 w-5 text-gray-400" />
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                        onClick={() => {
                          handleProfileClick();
                          setMobileMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-3" />
                        Profile & Settings
                      </div>
                    </button>
                    <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              </div>
          )}
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {children}
          </div>
        </main>
      </div>
  );
};

export default Layout;