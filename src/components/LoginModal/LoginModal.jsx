import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./Login.css";

const LoginModal = ({ isOpen, onClose, handleLogin, switchToRegister }) => {
  const { values, handleChange, resetForm, isValid } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleLogin) {
      handleLogin(values);
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      hideSubmitButton={true}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Email"
          required
          className="modal__input"
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Password"
          required
          className="modal__input"
        />
      </label>

      <div className="modal__button-row">
        <button
          type="button"
          className="modal__link-btn"
          onClick={switchToRegister}
        >
          Sign Up
        </button>
        <button
          type="submit"
          className={`modal__submit-btn ${
            !isValid ? "modal__submit-btn_disabled" : ""
          }`}
          disabled={!isValid}
        >
          Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
