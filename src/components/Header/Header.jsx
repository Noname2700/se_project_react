import React, { useContext } from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({ handleAddClick, weatherData, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
  });

  const getPlaceholderAvatar = () => {
    let letter = "U";
    if (currentUser?.name && currentUser.name.length > 0) {
      letter = currentUser.name.charAt(0).toUpperCase();
    } else if (currentUser?.email && currentUser.email.length > 0) {
      letter = currentUser.email.charAt(0).toUpperCase();
    }

    return <div className="header__avatar-placeholder">{letter}</div>;
  };

  const getUserDisplayName = () => {
    if (currentUser?.name && currentUser.name.trim().length > 0) {
      return currentUser.name;
    }
    if (currentUser?.email && currentUser.email.length > 0) {
      return currentUser.email.split("@")[0];
    }
    return "User";
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__actions">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}
      </div>

      {isLoggedIn ? (
        <div className="header__user-container">
          <Link to="/profile" className="header__user-link">
            <p className="header__username">{getUserDisplayName()}</p>
          </Link>
          {currentUser?.avatar ? (
            <Link to="/profile">
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="header__user-avatar"
              />
            </Link>
          ) : (
            <Link to="/profile" className="header__avatar-link">
              {getPlaceholderAvatar()}
            </Link>
          )}
        </div>
      ) : (
        <div className="header__auth-container">
          <Link to="/register" className="header__register-link">
            Sign Up
          </Link>
          <Link to="/login" className="header__login-link">
            Log In
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
