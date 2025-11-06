import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isOwn = true,
  profileUser = null, // The user whose profile we're viewing
  handleCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter((item) => {
    if (item.owner) {
      return item.owner === currentUser?._id;
    }
    // For items without owner (legacy items), only show on current user's profile
    return isOwn && currentUser?._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__text">
          {isOwn
            ? "Your items"
            : `${
                currentUser?.name || currentUser?.email?.split("@")[0] || "User"
              }'s items`}
        </p>
        {isOwn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="clothes__addbutton"
          >
            + Add New
          </button>
        )}
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.length > 0 ? (
          userClothingItems.map((item) => (
            <li key={item._id} className="card">
              <ItemCard
                item={item}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                isLoggedIn={isLoggedIn}
                isOwn={
                  isOwn && (item.owner === currentUser?._id || !item.owner)
                }
              />
            </li>
          ))
        ) : (
          <li className="clothes-section__no-items">
            <p className="clothes-section__no-items-text">
              {isOwn
                ? "You haven't added any clothing items yet."
                : "This user hasn't added any items."}
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
