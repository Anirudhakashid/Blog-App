import React from "react";
import useTheme from "../context/theme";

export default function ThemeButton() {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const toggleTheme = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <div className="flex items-center">
      <label className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={themeMode === "dark"}
          className="toggle-checkbox absolute opacity-0 w-0 h-0"
        />
        <span className="toggle-slider block w-10 h-6 bg-gray-300 rounded-full cursor-pointer transition-all duration-300 ease-in-out"></span>
        <span className="toggle-slider-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform"></span>
      </label>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-slate-300">
        Toggle Theme
      </span>
    </div>
  );
}
