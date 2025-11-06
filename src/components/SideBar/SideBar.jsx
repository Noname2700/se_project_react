import "./SideBar.css";
import { useContext } from "react";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, isOwn = true, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const getPlaceholderAvatar = () => {
    let letter = "U";
    if (currentUser?.name && currentUser.name.length > 0) {
      letter = currentUser.name.charAt(0).toUpperCase();
    } else if (currentUser?.email && currentUser.email.length > 0) {
      letter = currentUser.email.charAt(0).toUpperCase();
    }

    return <div className="sidebar__avatar-placeholder">{letter}</div>;
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
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="sidebar__user-avatar"
        />
      ) : (
        getPlaceholderAvatar()
      )}
      <p className="sidebar__username">{getUserDisplayName()}</p>
      {isOwn && (
        <>
          <button
            onClick={onEditProfile}
            className="sidebar__edit-button"
            type="button"
          >
            Edit profile
          </button>
          <button
            onClick={handleSignOut}
            className="sidebar__signout-button"
            type="button"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}

export default SideBar;
