import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({
  item,
  onCardClick = () => {},
  onCardLike = () => {},
  isOwn = false,
  isLoggedIn = false,
}) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked =
    item.likes && currentUser?._id
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const fallbackImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzI1IiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMyNSAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjUiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGM0YzIi8+CjxwYXRoIGQ9Ik0xNjIuNSA4MEMxNzAuNzg0IDgwIDE3Ny41IDg2LjcxNTcgMTc3LjUgOTVWMTI1QzE3Ny41IDEzMy4yODQgMTcwLjc4NCAxNDAgMTYyLjUgMTQwSDEzNy41QzEyOS4yMTYgMTQwIDEyMi41IDEzMy4yODQgMTIyLjUgMTI1Vjk1QzEyMi41IDg2LjcxNTcgMTI5LjIxNiA4MCAxMzcuNSA4MEgxNjIuNVoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTE0MiA5NUMxNDIgMTAwLjUyMyAxNDYuNDc3IDEwNSAxNTIgMTA1QzE1Ny41MjMgMTA1IDE2MiAxMDAuNTIzIDE2MiA5NUMxNjIgODkuNDc3IDE1Ny41MjMgODUgMTUyIDg1QzE0Ni40NzcgODUgMTQyIDg5LjQ3NyAxNDIgOTVaIiBmaWxsPSIjQzRDNEM0Ii8+CjxwYXRoIGQ9Ik0xMjcgMTI1TDE0MiAxMTBMMTUyIDEyMEwxNjcgMTA1TDE3MyAxMjVIMTI3WiIgZmlsbD0iI0M0QzRDNCIvPgo8L3N2Zz4K";

  const getImageSrc = () => {
    // Handle undefined, null, empty string, or problematic URLs
    if (
      !item?.imageUrl ||
      typeof item.imageUrl !== "string" ||
      item.imageUrl.trim() === "" ||
      item.imageUrl === "undefined" ||
      item.imageUrl.includes("via.placeholder.com") ||
      item.imageUrl.includes("placeholder.com")
    ) {
      return fallbackImage;
    }
    return item.imageUrl;
  };

  return (
    <div className="card">
      <img
        onClick={handleCardClick}
        src={getImageSrc()}
        alt={item.name}
        className="card__image"
        onError={(e) => {
          // Prevent infinite loop by checking if we're already showing fallback
          if (e.target.src !== fallbackImage) {
            console.error("Failed to load image:", item.imageUrl);
            e.target.src = fallbackImage;
            e.target.title = `Failed to load: ${item.name}`;
          }
        }}
      />
      {isLoggedIn && (
        <button onClick={handleLike} className={itemLikeButtonClassName}>
          ♡
        </button>
      )}
      <h2 className="card__name">{item.name}</h2>
    </div>
  );
}

export default ItemCard;
