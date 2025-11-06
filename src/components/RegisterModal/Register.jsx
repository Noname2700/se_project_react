import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import "./Register.css";

const Register = ({ handleRegistration }) => {
  const { values, handleChange, resetForm } = useForm({
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

  return (
    <div className="register-modal">
      <div className="register-modal__header">
        <h1 className="register-modal__title">Create Account</h1>
        <p className="register-modal__subtitle">
          Join us today! It only takes a few minutes.
        </p>
      </div>

      <form className="register-modal__form" onSubmit={handleSubmit}>
        <div className="register-modal__input-group">
          <input
            type="text"
            name="username"
            value={values.username || ""}
            onChange={handleChange}
            placeholder="Choose a username"
            required
            className="register-modal__input"
            minLength="3"
          />
        </div>

        <div className="register-modal__input-group">
          <input
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className="register-modal__input"
          />
        </div>

        <div className="register-modal__input-group">
          <input
            type="password"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Create a password"
            required
            className="register-modal__input"
            minLength="6"
          />
        </div>

        <div className="register-modal__input-group">
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword || ""}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            className="register-modal__input"
            minLength="6"
          />
        </div>

        <button type="submit" className="register-modal__submit">
          <span>Create Account</span>
        </button>
      </form>

      <div className="register__signin">
        <p>
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
