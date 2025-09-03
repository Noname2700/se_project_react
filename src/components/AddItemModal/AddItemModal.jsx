import { useEffect, useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });


  useEffect(() => {
    if(isOpen){
      setName("");
      setImageUrl("");
      setWeather("");
      setError({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen]);

  const isFormValid =
    name.trim() !== "" && imageUrl.trim() !== "" && weather !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {
      name: name ? "" : "Name is required",
      imageUrl: imageUrl ? "" : "Image URL is required",
      weather: weather ? "" : "Weather type is required",
    };
    setError(newError);
    if (newError.name || newError.imageUrl || newError.weather) return;
    onAddItemModalSubmit({ name, imageUrl, weather });
  };
  

  return (
    <ModalWithForm
      title="New garment"
      buttonText="add garment"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormvalid={isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className={`modal__input ${
            error.name ? "modal__input_type_error" : ""
          }`}
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          maxLength={30}
        />
        {error.name && (
          <span className="modal__error_visible">{error.name}</span>
        )}
      </label>
      <label htmlFor="image" className="modal__label">
        Image
        <input
          type="url"
          className={`modal__input ${
            error.imageUrl ? "modal__input_type_error" : ""
          }`}
          id="image"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        {error.imageUrl && (
          <span className="modal__error_visible">{error.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="Hot" className="modal__label modal__label_type_radio">
          <input
            id="Hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="Hot"
            checked={weather === "Hot"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Hot
        </label>
        <label htmlFor="Warm" className="modal__label modal__label_type_radio">
          <input
            id="Warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="Warm"
            checked={weather === "Warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Warm
        </label>
        <label htmlFor="Cold" className="modal__label modal__label_type_radio">
          <input
            id="Cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="Cold"
            checked={weather === "Cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Cold
        </label>
        {error.weather && (
          <span className="modal__error_visible">{error.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
