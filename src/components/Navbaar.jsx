import React, { useState } from "react";
import { Menu, X, GraduationCap, Bell, Sun, Moon } from "lucide-react";
import useThemeStore from "../store/useHomeStore"; // ✅ your logic
import Notification from "./Notification";

const InchargeNavbaar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const { theme, toggleTheme } = useThemeStore(); // ✅ using your store

  const navLinks = [
    { name: "Home", href: "/incharge" },
    { name: "About Us", href: "#" },
    { name: "Documentation", href: "#" },
  ];

  return (
    <div className="px-2 sm:px-2 pt-2 sm:pt-2 pb-0">
      <nav className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 rounded-t-2xl px-5 py-4 transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap size={24} />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Time Table Management System
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}

            {/* 🔥 Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Notifications */}
            <button
              onClick={() => setOpenNotification(true)}
              className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
            >
              <div className="relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative h-2.5 w-2.5 bg-red-500 rounded-full"></span>
                </span>
              </div>
              <span className="text-sm font-medium">Notifications</span>
            </button>

            {/* User */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 cursor-pointer group">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Dr. Alex
              </span>
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* 🔥 Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-64 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-2 pt-2 pb-3 border-t border-gray-100 dark:border-gray-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {
                setOpenNotification(true);
                setIsMobileMenuOpen(false); // 👈 optional but important
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
            >
              <Bell size={18} />
              Notifications
            </button>
          </div>
        </div>
      </nav>
      <Notification open={openNotification} setOpen={setOpenNotification} />
    </div>
  );
};

export default InchargeNavbaar;
