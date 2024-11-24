import React, { useState } from 'react';

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Settings</h2>

      {/* Account Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Account</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Username</label>
            <input
              type="text"
              placeholder="Your username"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            />
          </div>
          <button className="px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
            Save Changes
          </button>
        </div>
      </section>

      {/* Preferences Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Preferences</h3>
        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform ${
                  isDarkMode ? 'translate-x-6' : ''
                } transition-transform`}
              ></div>
            </button>
          </div>

          {/* Additional Button Example */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Enable Notifications</span>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Toggle
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
