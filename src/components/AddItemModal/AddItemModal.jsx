import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useForm({
      name: "",
      imageUrl: "",
      weather: "",
    });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItemModalSubmit({
        name: values.name,
        imageUrl: values.imageUrl,
        weather: values.weather,
      });
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="add garment"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          name="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
        />
        {errors.name && (
          <span className="modal__error_visible">{errors.name}</span>
        )}
      </label>
      <label className="modal__label">
        Image
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_type_error" : ""
          }`}
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
        />
        {errors.imageUrl && (
          <span className="modal__error_visible">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
        {errors.weather && (
          <span className="modal__error_visible">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
