import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeaderButton.css";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const HeaderButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const panelRef = useRef(null);

  const handleToggleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleAddClick = () => {
    alert("Add clothes clicked!");
  };

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="header">
      <button className="header__trigger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {isOpen && (
        <div className="header__content" ref={panelRef}>
          <div className="header__actions">
            <ToggleSwitch onChange={handleToggleChange} value={checked} />
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
              <img
                src={avatar}
                alt="User Avatar"
                className="header__user-avatar"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderButton;
