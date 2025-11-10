import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import useModalClose from "../../hooks/usModalClose.js";

function ItemModal({
  activeModal,
  handleCloseClick,
  card,
  openConfirmationModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOpen = activeModal === "preview";
  useModalClose(isOpen, handleCloseClick);

  if (!card) return null;

  const ownerId = typeof card.owner === "string" ? card.owner : card.owner?._id;
  const isOwn = ownerId === currentUser?._id;

  const fallbackImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDk4IiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQ5OCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0OTgiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGM0YzIi8+CjxwYXRoIGQ9Ik0yNDkgMTIwQzI2NC4xNjQgMTIwIDI3NiAxMzEuODM2IDI3NiAxNDdWMTkzQzI3NiAyMDguMTY0IDI2NC4xNjQgMjIwIDI0OSAyMjBIMjAxQzE4NS44MzYgMjIwIDE3NCAyMDguMTY0IDE3NCAxOTNWMTQ3QzE3NCAxMzEuODM2IDE4NS44MzYgMTIwIDIwMSAxMjBIMjQ5WiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMjA0IDE0N0MyMDQgMTU1LjI4NCAyMTAuNzE2IDE2MiAyMTkgMTYyQzIyNy4yODQgMTYyIDIzNCAxNTUuMjg0IDIzNCAxNDdDMjM0IDEzOC43MTYgMjI3LjI4NCAxMzIgMjE5IDEzMkMyMTAuNzE2IDEzMiAyMDQgMTM4LjcxNiAyMDQgMTQ3WiIgZmlsbD0iI0M0QzRDNCIvPgo8cGF0aCBkPSJNMTg0IDE5M0wyMDQgMTczTDIxOSAxODhMMjQ0IDE2M0wyNTYgMTkzSDE4NFoiIGZpbGw9IiNDNEM0QzQiLz4KPHR1eHQgeD0iMjQ5IiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiI+SW1hZ2UgdW5hdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo=";

  const getImageSrc = () => {
    if (
      !card?.imageUrl ||
      typeof card.imageUrl !== "string" ||
      card.imageUrl.trim() === "" ||
      card.imageUrl === "undefined" ||
      card.imageUrl.includes("via.placeholder.com") ||
      card.imageUrl.includes("placeholder.com")
    ) {
      return fallbackImage;
    }
    return card.imageUrl;
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={getImageSrc()}
          alt="clothes for types of weather"
          className="modal__image"
          onError={(e) => {
            if (e.target.src !== fallbackImage) {
              console.error("Failed to load image:", card.imageUrl);
              e.target.src = fallbackImage;
              e.target.title = `Failed to load: ${card.name}`;
            }
          }}
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">weather:{card.weather}</p>
          {isOwn && (
            <button
              onClick={() => openConfirmationModal(card)}
              className="modal__delete-button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
