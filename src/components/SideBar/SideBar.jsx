import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Sidebar Avatar" className="sidebar__user-avatar" />
      <p className="sidebar__username">Yohan Encarnacion</p>
    </div>
  );
}

export default SideBar;
