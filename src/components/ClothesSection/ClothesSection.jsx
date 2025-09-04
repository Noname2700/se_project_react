import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems = defaultClothingItems,
  handleCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__text">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes__addbutton"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <li key={item._id} className="card">
            <ItemCard item={item} onCardClick={handleCardClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
