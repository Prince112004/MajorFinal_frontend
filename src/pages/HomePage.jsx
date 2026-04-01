import React from "react"; 
import useThemeStore from "../store/useHomeStore"; 

const HomePage = () => {

  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center transition-colors duration-300 bg-gray-400 text-black dark:bg-gray-900 dark:text-white">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl">
            Current Theme: <span className="font-bold capitalize">{theme}</span>
          </p>
          <p>Click below to change the theme</p>

          <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white p-5 rounded-2xl cursor-pointer hover:bg-green-400 transition-all duration-300 shadow-lg"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;