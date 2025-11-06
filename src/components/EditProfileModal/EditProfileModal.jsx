import { useEffect, useState } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onSave, userData }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && userData) {
      setName(userData.name || "");
      setAvatar(userData.avatar || "");
      setError({
        name: "",
        avatar: "",
      });
    }
  }, [isOpen, userData]);

  const isFormValid = name.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {
      name: name.trim() ? "" : "Name is required",
      avatar: "", 
    };
    setError(newError);

    if (newError.name) return;

    onSave({ name: name.trim(), avatar: avatar.trim() });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save changes"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="profileName" className="modal__label">
        Name 
        <input
          type="text"
          className={`modal__input ${
            error.name ? "modal__input_type_error" : ""
          }`}
          id="profileName"
          placeholder="Enter your name"
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

      <label htmlFor="profileAvatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className={`modal__input ${
            error.avatar ? "modal__input_type_error" : ""
          }`}
          id="profileAvatar"
          placeholder="Enter avatar image URL (optional)"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        {error.avatar && (
          <span className="modal__error_visible">{error.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
