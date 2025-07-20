import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
    weekday: "long",
  });

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Yohan Encarnacion</p>
        <img src={avatar} alt="User Avatar" className="header__user-avatar" />
      </div>
    </header>
  );
}

export default Header;
