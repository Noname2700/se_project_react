import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather } from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import MenuButton from "../HeaderButton/HeaderButton.jsx";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../Context/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AdditemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import { deleteItems, getItems, postItems } from "../../utils/api.js";

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

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
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
    closeActiveModal();
  }, []);

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    postItems({ name, imageUrl, weather })
      .then(() => {
        return getItems();
      })
      .then((data) => {
        setClothingItems(data);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleCardDelete = (card) => {
    deleteItems(card).then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== card._id)
      );
      setIsConfirmOpen(false);
      setSelectedCard(null);
    });
  };

  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <MenuButton
              username="Yohan Encarnacion"
              onAddClick={handleAddClick}
              onToggleChange={handleToggleSwitchChange}
              checked={currentTemperatureUnit === "C"}
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
                  />
                }
              />
              <Route
                path="/main"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleDeleteItem={handleCardDelete}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                }
              />
            </Routes>
          </div>

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
              onConfirm={() => {
                handleCardDelete(selectedCard);
                setIsConfirmOpen(false);
                setSelectedCard(null);
              }}
              handleCloseClick={closeActiveModal}
            />
          )}
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
