import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import "./Login.css";

const Login = ({ handleLogin }) => {
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

  return (
    <div className="login">
      <div className="login__header">
        <h1 className="login__title">Welcome Back</h1>
        <p className="login__message">Please sign in to your account</p>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__input-group">
          <input
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="login__input"
          />
        </div>

        <div className="login__input-group">
          <input
            type="password"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="login__input"
          />
        </div>

        <button type="submit" className="login__submit">
          <span>Sign In</span>
        </button>
      </form>

      <div className="login__signup">
        <p>Don't have an account?</p>
        <Link to="/register" className="signup__link">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
