import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onClose,
  handleRegistration,
  switchToLogin,
}) => {
  const { values, handleChange, resetForm, isValid } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (handleRegistration) {
      handleRegistration({
        username,
        email,
        password,
        confirmPassword,
      });
    }
  };

  const isPasswordMatch = values.password === values.confirmPassword;
  const isFormValid = isValid && isPasswordMatch;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      hideSubmitButton={true}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="username"
          value={values.username || ""}
          onChange={handleChange}
          placeholder="Name"
          required
          className="modal__input"
          minLength="2"
          maxLength="40"
        />
      </label>

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
          minLength="6"
        />
      </label>

      <label className="modal__label">
        Confirm Password*
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword || ""}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="modal__input"
          minLength="6"
        />
      </label>

      <div className="modal__button-row">
        <button
          type="button"
          className="modal__link-btn"
          onClick={switchToLogin}
        >
          Log In
        </button>
        <button
          type="submit"
          className={`modal__submit-btn ${
            !isFormValid ? "modal__submit-btn_disabled" : ""
          }`}
          disabled={!isFormValid}
        >
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
