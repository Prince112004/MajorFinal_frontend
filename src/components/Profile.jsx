import React from "react";
import {
  Mail,
  LogOut,
  Camera,
  Calendar,
  CheckCircle2,
  Building2,
  UserCircle,
  BadgeCheck,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Profile = ({ onClose }) => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
    if (onClose) onClose();
  };

  // Get role-based color scheme (Only 3 roles)
  const getRoleColors = (role) => {
    switch (role) {
      case "admin":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/20",
          badgeBg: "bg-emerald-100 dark:bg-emerald-900/40",
          badgeText: "text-emerald-700 dark:text-emerald-300",
          accent: "emerald",
          roleName: "Department Incharge"
        };
      case "faculty":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          badgeBg: "bg-blue-100 dark:bg-blue-900/40",
          badgeText: "text-blue-700 dark:text-blue-300",
          accent: "blue",
          roleName: "Faculty Member"
        };
      case "student":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/20",
          badgeBg: "bg-amber-100 dark:bg-amber-900/40",
          badgeText: "text-amber-700 dark:text-amber-300",
          accent: "amber",
          roleName: "Student"
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-950/20",
          badgeBg: "bg-gray-100 dark:bg-gray-900/40",
          badgeText: "text-gray-700 dark:text-gray-300",
          accent: "gray",
          roleName: "User"
        };
    }
  };

  const roleColors = getRoleColors(authUser?.role);
  const accentColor = roleColors.accent;

  // Get accent color classes
  const getAccentClasses = () => {
    switch (accentColor) {
      case "emerald":
        return {
          border: "border-emerald-50",
          button: "bg-emerald-500 hover:bg-emerald-600",
          icon: "text-emerald-500/70",
          status: "text-emerald-500"
        };
      case "blue":
        return {
          border: "border-blue-50",
          button: "bg-blue-500 hover:bg-blue-600",
          icon: "text-blue-500/70",
          status: "text-blue-500"
        };
      case "amber":
        return {
          border: "border-amber-50",
          button: "bg-amber-500 hover:bg-amber-600",
          icon: "text-amber-500/70",
          status: "text-amber-500"
        };
      default:
        return {
          border: "border-gray-50",
          button: "bg-gray-500 hover:bg-gray-600",
          icon: "text-gray-500/70",
          status: "text-gray-500"
        };
    }
  };

  const accentClasses = getAccentClasses();

  // Generate avatar
  const getAvatarUrl = () => {
    const seed = authUser?.username || authUser?.email || "User";
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f1f5f9`;
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "Recently joined";
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  if (!authUser) {
    return (
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800">
      {/* Upper Section - Role based background */}
      <div className={`${roleColors.bg} px-4 pt-10 pb-20 relative`}>
        <div className="flex justify-between items-center p-2">
          <div className="space-y-1">
            <span
              className={`px-3 py-2 ${roleColors.badgeBg} ${roleColors.badgeText} text-[10px] font-bold uppercase tracking-widest rounded-full`}
            >
              {roleColors.roleName}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-800 dark:text-white tracking-tight break-words whitespace-normal">
              {authUser?.username || authUser?.email?.split("@")[0] || "User"}
            </h1>
            <p
              className={`text-slate-500 dark:text-${accentColor}-200/50 text-sm font-medium`}
            >
              {roleColors.roleName}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 p-3 bg-white dark:bg-slate-800 text-rose-500 rounded-2xl shadow-sm hover:bg-rose-50 transition-all active:scale-95 cursor-pointer"
          >
            <LogOut size={18} />
            <span className="text-xs font-bold hidden sm:block">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Lower Section */}
      <div className="px-8 pb-10 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Avatar Section */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative">
              <div
                className={`h-32 w-32 rounded-[2rem] bg-white dark:bg-slate-800 p-2 shadow-xl border ${accentClasses.border}`}
              >
                <img
                  src={getAvatarUrl()}
                  alt="Avatar"
                  className="rounded-[1.5rem] bg-slate-50 dark:bg-slate-700 h-full w-full object-cover"
                />
              </div>
              <button
                className={`absolute -bottom-2 -right-2 p-2 ${accentClasses.button} text-white rounded-xl border-4 border-white dark:border-slate-900 shadow-lg`}
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="mt-6 w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div
                className={`h-10 w-10 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center ${accentClasses.icon} shadow-sm`}
              >
                <BadgeCheck size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  Account Status
                </p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {authUser?.invite_status === "accepted"
                    ? "Verified Member"
                    : "Pending Verification"}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="md:col-span-8 space-y-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <InfoBox
                icon={<Mail />}
                label="Email"
                value={authUser?.email || "Not provided"}
                accentColor={accentColor}
              />
              <InfoBox
                icon={<UserCircle />}
                label="Username"
                value={authUser?.username || "Not set"}
                accentColor={accentColor}
              />
              <InfoBox
                icon={<Building2 />}
                label="Institute"
                value={
                  authUser?.institute?.short_name ||
                  authUser?.institute?.name ||
                  "Not assigned"
                }
                accentColor={accentColor}
              />
              <InfoBox
                icon={<Calendar />}
                label="Member Since"
                value={formatDate(authUser?.createdAt || authUser?.joined)}
                accentColor={accentColor}
              />
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="h-8 px-2 flex items-center text-[10px] font-bold text-slate-400 italic">
                  Role: {authUser?.role?.toUpperCase()}
                </div>
                <div
                  className={`flex items-center gap-1.5 ${accentClasses.status} text-[10px] font-bold uppercase tracking-wider`}
                >
                  <CheckCircle2 size={14} />
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// InfoBox Component
const InfoBox = ({ icon, label, value, accentColor }) => {
  const getIconColor = () => {
    switch (accentColor) {
      case "emerald": return "text-emerald-500/70";
      case "blue": return "text-blue-500/70";
      case "amber": return "text-amber-500/70";
      default: return "text-gray-500/70";
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className={getIconColor()}>
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Profile;