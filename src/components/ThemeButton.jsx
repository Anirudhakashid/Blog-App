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
    <label className="mt-2">
      <input
        type="checkbox"
        value=""
        onChange={toggleTheme}
        checked={themeMode == "dark"}
      />

      <span className="ml-3 text-sm font-medium dark:text-wh text-gray-900">
        Toggle Theme
      </span>
    </label>
  );
}
