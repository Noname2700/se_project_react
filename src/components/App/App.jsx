import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getWeather } from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import {
  deleteItem,
  getItems,
  postItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { checkToken, editProfile, signup, signin } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const currentUser = {
    _id: userData._id,
    email: userData.email,
    name: userData.name,
    avatar: userData.avatar,
  };

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  const handleSwitchToRegister = () => {
    setActiveModal("register");
  };

  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    setIsConfirmOpen(true);
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setIsConfirmOpen(false);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    editProfile({ name, avatar })
      .then((updatedUser) => {
        setUserData((prevData) => ({
          ...prevData,
          name: updatedUser.name || name,
          avatar: updatedUser.avatar || avatar,
        }));
        closeActiveModal();
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setUserData({
            _id: res._id || "",
            email: res.email || "",
            name: res.name || "",
            avatar: res.avatar || "",
          });
          console.log("User authenticated with existing token");
        })
        .catch((error) => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          console.error("Token validation failed:", error);
        });
    }
  }, []);

  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      signup({ name: username, email, password, avatar: "" })
        .then(() => {
          return signin({ email, password });
        })
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          setUserData({
            _id: res.user?._id || "",
            email: res.user?.email || email,
            name: res.user?.name || username,
            avatar: res.user?.avatar || "",
          });
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/");
        })
        .catch((error) => {
          console.error("Registration or login failed:", error);
        });
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return console.error("Email and password are required");
    }
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        if (res.token) {
          setUserData({
            _id: res.user?._id || "",
            email: res.user?.email || email,
            name: res.user?.name || "",
            avatar: res.user?.avatar || "",
          });
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    postItems({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updateCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updateCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updateCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updateCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    deleteItem(card)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        setIsConfirmOpen(false);
        setSelectedCard(null);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({ email: "", name: "", avatar: "" });
    navigate("/");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleDeleteItem={handleCardDelete}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      handleSignOut={handleSignOut}
                      isLoggedIn={isLoggedIn}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSave={handleEditProfileSubmit}
            userData={currentUser}
          />

          <AddItemModal
            activeModal={activeModal}
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            openConfirmationModal={openConfirmationModal}
          />

          {isConfirmOpen && (
            <DeleteConfirmationModal
              isOpen={isConfirmOpen}
              onClose={closeActiveModal}
              handleCloseClick={closeActiveModal}
              onConfirm={() => {
                handleCardDelete(selectedCard);
                setIsConfirmOpen(false);
                setSelectedCard(null);
              }}
            />
          )}

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            switchToLogin={handleSwitchToLogin}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            switchToRegister={handleSwitchToRegister}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
