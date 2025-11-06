import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./Login.css";

const LoginModal = ({ isOpen, onClose, handleLogin, switchToRegister }) => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleLogin) {
      handleLogin(values);
      resetForm();
    }
  };

  const isFormValid = values.email && values.password;

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          id="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Email"
          required
          className="modal__input"
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          id="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Password"
          required
          className="modal__input"
        />
      </label>

      <button
        type="button"
        className="modal__link-btn"
        onClick={switchToRegister}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
