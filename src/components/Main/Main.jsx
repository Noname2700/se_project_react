import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../utils/CurrentTemperatureUnitContext.jsx";
import { useContext } from "react";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  handleDeleteItem,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter(
              (item) =>
                item.weather.toLowerCase() === weatherData.type.toLowerCase()
            )
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteItem}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
