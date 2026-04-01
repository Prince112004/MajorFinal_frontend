import React from "react";

import {
  UserPlus,
  BookOpen,
  Link,
  Clock,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const GenerateTable = () => {
  const actions = [
    {
      title: "Add Teacher",
      href: "/addTeacher",
      icon: UserPlus,
      color:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      desc: "Register new faculty members",
    },
    {
      title: "Add Subject",
      href: "/addsubject",
      icon: BookOpen,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      desc: "Create new course modules",
    },
    {
      title: "Assign Subjects",
      href: "/assign",
      icon: Link,
      color:
        "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
      desc: "Map teachers to subjects",
    },
    {
      title: "Add Backlog",
      href: "/addbacklog",
      icon: Clock,
      color:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      desc: "Manage academic backlogs",
    },
    {
      title: "Set Constraint",
      href: "/addconstraint",
      icon: SlidersHorizontal,
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
      desc: "Define scheduling constraints",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">


      {/* Main Container */}
      <div className="pt-24 pb-16 px-3 sm:px-4 lg:px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8 w-full">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            Administrative Actions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage your academic resources efficiently.
          </p>
        </div>

        {/* Cards */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <RouterLink
                key={index}
                to={action.href}
                className="
                  group rounded-xl p-4
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                  hover:-translate-y-1
                  w-full
                "
              >
                <div className="flex flex-col items-center text-center gap-2">
                  {/* Icon */}
                  <div className={`p-2.5 rounded-lg ${action.color}`}>
                    <Icon size={20} />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {action.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                    {action.desc}
                  </p>
                </div>
              </RouterLink>
            );
          })}
        </div>

        {/* Generate Button */}
        <div className="w-full flex justify-center mt-10">
          <button
            className="
              flex items-center gap-2 px-5 py-2.5
              bg-blue-600 hover:bg-blue-700
              text-white text-sm font-medium
              rounded-lg
              shadow-sm hover:shadow-md
              transition-all duration-300
              hover:-translate-y-[1px]
            "
          >
            <Sparkles size={16} className="text-yellow-300" />
            Generate Time Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateTable;
