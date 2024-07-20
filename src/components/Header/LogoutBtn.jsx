import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className=" inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100 dark:hover:text-black"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
