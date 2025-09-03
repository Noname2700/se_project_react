import "./ItemCard.css";

function ItemCard({ item, onCardClick = () => {} }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <div className="card">
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      <h2 className="card__name">{item.name}</h2>
    </div>
  );
}

export default ItemCard;
