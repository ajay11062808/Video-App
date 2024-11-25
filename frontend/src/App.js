import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import Login from './components/Login';
import UploadVideo from './components/UploadVideo';
import Settings from './components/Settings';
import MapPage from './components/MapPage';
import { VideoProvider } from './components/VideoContext'; // Import VideoProvider

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <VideoProvider>
    <div
      className="min-h-screen bg-fixed"
      style={{
        backgroundImage: "url('/Kstate1.jpeg')",
        backgroundSize: '',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#4e2087',
      }}
    >
      <div className="bg-black/40 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {user ? (
            <div className="space-y-6">
              {/* Header with Logo and Logout */}
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                  <img
                    src="/Kstate1.jpeg"
                    alt="Logo"
                    className="h-12 w-auto mr-4"
                  />
                  <h1 className="text-white font-bold text-2xl">Fight Detection</h1>
                </div>

                {/* Logout Button */}
                <div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex justify-center space-x-4 mb-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-300 dark:text-blue-400 font-bold border-b-2 border-blue-300 dark:border-blue-400"
                      : "text-white dark:text-gray-300"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/map"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-300 dark:text-blue-400 font-bold border-b-2 border-blue-300 dark:border-blue-400"
                      : "text-white dark:text-gray-300"
                  }
                >
                  Map
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-300 dark:text-blue-400 font-bold border-b-2 border-blue-300 dark:border-blue-400"
                      : "text-white dark:text-gray-300"
                  }
                >
                  Settings
                </NavLink>
              </nav>

              {/* Main Content */}
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300">
                <Routes>
                  <Route path="/" element={<UploadVideo />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
    </VideoProvider>
  );
};

export default App;
