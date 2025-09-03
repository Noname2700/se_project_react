import React, { useContext } from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
  });

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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      </div>

      <div className="header__user-container">
        <Link to="/profile" className="header__user-link">
          <p className="header__username">Yohan Encarnacion</p>
        </Link>
        <Link to="/main">
          <img src={avatar} alt="User Avatar" className="header__user-avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
