import "./CompareMain.scss";
import zigZagArrowBlack from "../../assets/icons/zigzag-arrow-black.png";
import odometer from "../../assets/images/speedometer.png";
import { useState, useEffect } from "react";

function CompareMain({ SelectedItem }) {
  const [selectedItem, setSelectedItem] = useState("");
  const rotate = -30;
  const savingsPercentage = 5;
  const savingsPerKg = 1.38;

  // assigns selected item once change is detected from select form
  useEffect(() => {
    setSelectedItem(SelectedItem);
    console.log(SelectedItem);
  }, [SelectedItem]);

  return (
    <>
      <main className="compare-main">
        <div className="compare-main__selected-item-container">
          <h3 className="compare-main__selected-item">Selected Item:</h3>
          <h3 className="compare-main__selected-item-chosen">{selectedItem}</h3>
        </div>
        <section className="compare-main__tool-section">
          <form className="compare-main__compare-form">
            <h4 className="compare-main__details-summary compare-main__details-summary--1">
              Use this option if you do not have an explicit price per weight
              unit:
            </h4>
            <div className="compare-main__inputs-1">
              <input
                className="compare-main__input compare-main__input--price-1"
                type="text"
                placeholder="Price"
              />
              <input
                className="compare-main__input compare-main__input--weight"
                type="text"
                placeholder="Weight"
              />
              <select
                className="compare-main__input compare-main__input--unit-1"
                defaultValue=""
              >
                <option value="lb">&nbsp; lb</option>
                <option value="kg">&nbsp; kg</option>
                <option value="100g">100g</option>
              </select>
            </div>
            <p className="compare-main__text compare-main__text--1">OR</p>
            <h4 className="compare-main__details-summary compare-main__details-summary--2">
              Use this option if you have the price per weight unit:
            </h4>
            <div className="compare-main__inputs-2">
              <input
                className="compare-main__input compare-main__input--price-2"
                type="text"
                placeholder="Price"
              />
              <select
                className="compare-main__input compare-main__input--unit-2"
                defaultValue=""
              >
                <option value="lb">&nbsp; lb</option>
                <option value="kg">&nbsp; kg</option>
                <option value="100g">100g</option>
              </select>
            </div>
            <button className="compare-main__button-compare" type="submit">
              COMPARE
            </button>
          </form>
          <div className="compare-main__odometer-container">
            <img className="compare-main__odometer-image" src={odometer} />
            <h2
              className="compare-main__odometer-percent"
              style={{
                color: savingsPercentage <= 0 ? "#79d34d" : "#a82a13",
              }}
            >
              {savingsPercentage}%
            </h2>
            <span
              className="compare-main__needle"
              style={{ transform: `rotate(${rotate}deg)` }}
            ></span>
            <span className="compare-main__needle-base"></span>
            <h3 className="compare-main__text-market-value">
              {savingsPercentage <= 0
                ? "Below Market Value"
                : "Above Market Value"}
            </h3>
            <p className="compare-main__text-savings">
              {savingsPercentage <= 0
                ? `*You would spend $${savingsPerKg}/kg below market price!`
                : `*You would spend $${savingsPerKg} per kg above market price`}
            </p>
          </div>
        </section>
        <section className="compare-main__list-section">
          <div className="compare-main__list-background">
            <div className="compare-main__titles">
              <div className="compare-main__title compare-main__title--1">
                <h3 className="compare-main__title-text">Items</h3>
              </div>
              <div className="compare-main__title compare-main__title--2">
                <img
                  className="compare-main__title-image"
                  src={zigZagArrowBlack}
                />
              </div>
              <div className="compare-main__title compare-main__title--3">
                <h3 className="compare-main__title-text">
                  Market
                  <br />
                  $/kg
                </h3>
              </div>
              <div className="compare-main__title compare-main__title--4">
                <h3 className="compare-main__title-text">
                  My
                  <br />
                  $/kg
                </h3>
              </div>
            </div>
            <ul className="compare-main__list">
              <li className="compare-main__list-row">
                <div className="compare-main__list-item-container compare-main__list-item-container--1">
                  <p className="compare-main__list-item compare-main__list-item--name">
                    Chicken
                  </p>
                </div>
                <div className="compare-main__list-item-container compare-main__list-item-container--2">
                  <p className="compare-main__list-item compare-main__list-item--savings">
                    -5%
                  </p>
                </div>
                <div className="compare-main__list-item-container compare-main__list-item-container--3">
                  <p className="compare-main__list-item compare-main__list-item--market-price">
                    $1.42
                  </p>
                </div>
                <div className="compare-main__list-item-container compare-main__list-item-container--4">
                  <p className="compare-main__list-item compare-main__list-item--my-price">
                    $1.50
                  </p>
                </div>
              </li>
            </ul>
            <p className="compare-main__footnote">
              *Food prices available only for items tracked in provincial CPI
              report
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default CompareMain;
