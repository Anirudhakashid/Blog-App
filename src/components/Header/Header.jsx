import React, { useState, useEffect } from "react";
import { Container, LogoutBtn, Logo, ThemeButton } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "../../context/theme.js";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(themeMode);
  }, [themeMode]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-400 dark:bg-gray-800 dark:text-slate-200">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100 dark:hover:text-black "
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
              <ThemeButton />
            </ThemeProvider>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
