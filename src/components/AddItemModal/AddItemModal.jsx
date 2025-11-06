import { useEffect, useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {
  const { values, handleChange, resetForm, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  
  const [error, setError] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });


  useEffect(() => {
    if(isOpen){
      resetForm({
        name: "",
        imageUrl: "",
        weather: "",
      });
      setError({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen, resetForm]);

  const isFormValid =
    values.name?.trim() !== "" && values.imageUrl?.trim() !== "" && values.weather !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {
      name: values.name ? "" : "Name is required",
      imageUrl: values.imageUrl ? "" : "Image URL is required",
      weather: values.weather ? "" : "Weather type is required",
    };
    setError(newError);
    if (newError.name || newError.imageUrl || newError.weather) return;
    onAddItemModalSubmit({ 
      name: values.name, 
      imageUrl: values.imageUrl, 
      weather: values.weather 
    });
  };

  const handleWeatherChange = (e) => {
    setValues(prev => ({ ...prev, weather: e.target.value }));
  };
  

  return (
    <ModalWithForm
      title="New garment"
      buttonText="add garment"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className={`modal__input ${
            error.name ? "modal__input_type_error" : ""
          }`}
          id="name"
          name="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
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
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
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
            checked={values.weather === "Hot"}
            onChange={handleWeatherChange}
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
            checked={values.weather === "Warm"}
            onChange={handleWeatherChange}
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
            checked={values.weather === "Cold"}
            onChange={handleWeatherChange}
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
