import "./ItemModal.css";

function ItemModal({
  activeModal,
  handleCloseClick,
  card,
  openConfirmationModal,

}) {
  if (!card) return null;
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl}
          alt="clothes for types of weather"
          className="modal__image"
        />
        <div
          className="modal__footer"
        >
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">weather:{card.weather}</p>
          <button
            onClick={() => openConfirmationModal(card)}
            className="modal__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
