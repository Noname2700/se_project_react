import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather } from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const isFormValid =
    name.trim() !== "" && imageUrl.trim() !== "" && weatherType !== "";

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
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

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        </div>

        <ModalWithForm
          title="New garment"
          buttonText="add garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          isFormValid={isFormValid}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="image" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="image"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </label>
          <fieldset className="modal__radio-button">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="Hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="Hot"
                type="radio"
                className="modal__radio-input"
                name="weatherType"
                value="Hot"
                checked={weatherType === "Hot"}
                onChange={(e) => setWeatherType(e.target.value)}
              />
              Hot
            </label>
            <label
              htmlFor="Warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="Warm"
                type="radio"
                className="modal__radio-input"
                name="weatherType"
                value="Warm"
                checked={weatherType === "Warm"}
                onChange={(e) => setWeatherType(e.target.value)}
              />
              Warm
            </label>
            <label
              htmlFor="Cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="Cold"
                type="radio"
                className="modal__radio-input"
                name="weatherType"
                value="Cold"
                checked={weatherType === "Cold"}
                onChange={(e) => setWeatherType(e.target.value)}
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
