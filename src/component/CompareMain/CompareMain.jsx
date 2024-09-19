import "./CompareMain.scss";
import zigZagArrowBlack from "../../assets/icons/zigzag-arrow-black.png";
import odometer from "../../assets/images/speedometer.png";
import { useState, useEffect } from "react";

function CompareMain({ SelectedItem, AllItems }) {
  const [chosenItem, setChosenItem] = useState("");
  const [savingsPerKg, setSavingsPerKg] = useState("");
  const [savingsPercentage, setSavingsPercentage] = useState("");
  const [rotate, setRotate] = useState("");
  // const rotate = savingsPercentage * 2;
  // const savingsPercentage = 5;
  // const savingsPerKg = 1.38;

  // sets the degree to which the needle will rotate on the odometer
  useEffect(() => {
    let num = savingsPercentage * 2;
    if (num > 142) {
      setRotate(142);
    } else if (num < -142) {
      setRotate(-142);
    } else {
      setRotate(num);
    }
  }, [savingsPercentage]);

  // assigns selected item once change is detected from form and re-renders page
  useEffect(() => {
    setChosenItem(SelectedItem);
    console.log(SelectedItem);
  }, [SelectedItem]);

  // Comparison function
  const itemToCompare = (event) => {
    event.preventDefault();
    const itemObj = AllItems.find((item) => item.item_name === chosenItem);
    console.log(itemObj);
    const price1 = event.target.price1.value;
    const weight1 = event.target.weight1.value;
    const unit1 = event.target.unit1.value;
    const price2 = event.target.price2.value;
    const unit2 = event.target.unit2.value;

    if (chosenItem === "") {
      alert(
        "Please select an item to compare by using the search bar.  The list of available items will populate once you begin typing."
      );
    } else if (!itemObj) {
      alert(
        "Item not listed in CPI database.  Please select a similar item from the list that populates below the search bar."
      );
    } else if ((!price1 && !price2) || (price1 && !weight1)) {
      alert(
        "please fill out price and weight information for one of the two options."
      );
    } else if (price1 && weight1 && !price2) {
      console.log("compare line 1");
      if (unit1 === "lb" && itemObj.unit_of_measure === "kg") {
        console.log("weight in lbs");
        let pricePerLb = price1 / weight1;
        let pricePerKg = pricePerLb * 2.204623;
        setSavingsPerKg((pricePerKg - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePerKg / itemObj.market_price - 1) * 100).toFixed(2)
        );
      }
      if (unit1 === "kg" && itemObj.unit_of_measure === "kg") {
        let pricePerKg = price1 / weight1;
        setSavingsPerKg((pricePerKg - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePerKg / itemObj.market_price - 1) * 100).toFixed(2)
        );
      }
    } else if (!price1 && !weight1 && price2) {
      console.log("compare line 2");
    }
  };

  return (
    <>
      <main className="compare-main">
        <div className="compare-main__selected-item-container">
          <h3 className="compare-main__selected-item">Selected Item:</h3>
          <h3 className="compare-main__selected-item-chosen">{chosenItem}</h3>
        </div>
        <section className="compare-main__tool-section">
          <form
            className="compare-main__compare-form"
            onSubmit={() => itemToCompare(event)}
          >
            <h4 className="compare-main__details-summary compare-main__details-summary--1">
              Use this option if you do not have an explicit price per weight
              unit:
            </h4>
            <div className="compare-main__inputs-1">
              <input
                className="compare-main__input compare-main__input--price-1"
                type="text"
                placeholder="Price"
                name="price1"
              />
              <input
                className="compare-main__input compare-main__input--weight"
                type="text"
                placeholder="Weight"
                name="weight1"
              />
              <select
                className="compare-main__input compare-main__input--unit-1"
                defaultValue=""
                name="unit1"
              >
                <option value="lb">&nbsp; lb</option>
                <option value="kg">&nbsp; kg</option>
                <option value="100g">100g</option>
                <option value="unit">unit</option>
                <option value="litre">litre</option>
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
                name="price2"
              />
              <select
                className="compare-main__input compare-main__input--unit-2"
                defaultValue=""
                name="unit2"
              >
                <option value="lb">&nbsp; lb</option>
                <option value="kg">&nbsp; kg</option>
                <option value="100g">100g</option>
                <option value="unit">unit</option>
                <option value="litre">litre</option>
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
