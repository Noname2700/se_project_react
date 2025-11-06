import { useForm } from "../../hooks/useForm";
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
      resetForm();
    }
  };

  const isFormValid =
    values.username &&
    values.email &&
    values.password &&
    values.confirmPassword &&
    values.password === values.confirmPassword;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="username" className="modal__label">
        Name*
        <input
          type="text"
          name="username"
          id="username"
          value={values.username || ""}
          onChange={handleChange}
          placeholder="Name"
          required
          className="modal__input"
          minLength="2"
          maxLength="40"
        />
      </label>

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
          minLength="6"
        />
      </label>

      <label htmlFor="confirmPassword" className="modal__label">
        Confirm Password*
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={values.confirmPassword || ""}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="modal__input"
          minLength="6"
        />
      </label>

      <button type="button" className="modal__link-btn" onClick={switchToLogin}>
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
