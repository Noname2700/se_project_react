import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({handleCardClick, clothingItems, handleAddClick}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection clothingItems={clothingItems} handleCardClick={handleCardClick} handleAddClick={handleAddClick} />
      </section>
    </div>
  );
}

export default Profile;
