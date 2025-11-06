import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  profileUser = null,
  onEditProfile,
  handleSignOut,
  isLoggedIn,
}) {
  const isOwn = profileUser === null;

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          profileUser={profileUser}
          onEditProfile={onEditProfile}
          isOwn={isOwn}
          handleSignOut={handleSignOut}
        />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          isOwn={isOwn}
          profileUser={profileUser}
        />
      </section>
    </div>
  );
}

export default Profile;
