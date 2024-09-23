import "./CompareMain.scss";
import zigZagArrowWhite from "../../assets/icons/zigzag-arrow-white.png";
import odometer from "../../assets/images/speedometer.png";
import dollarBlack from "../../assets/icons/dollar-symbol.png";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function CompareMain({ SelectedItem, AllItems }) {
  const [chosenItem, setChosenItem] = useState("");
  const [savingsPerKg, setSavingsPerKg] = useState("");
  const [savingsPercentage, setSavingsPercentage] = useState("");
  const [rotate, setRotate] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [itemHistory, setItemHistory] = useState([]);
  const { register, reset } = useForm();

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
    reset();
  }, [SelectedItem]);

  // Comparison function
  const itemToCompare = (event) => {
    event.preventDefault();
    const itemObj = {
      ...AllItems.find(
        (item) => item.item_name.toLowerCase() === chosenItem.toLowerCase()
      ),
    };

    // Validation
    if (!chosenItem) {
      alert(
        "Please select an item using the search bar above before pushing compare button."
      );
      return;
    } else if (!itemObj) {
      alert(
        "Please select an item to compare by using the search bar.  The list of available items will populate once you begin typing."
      );
    } else if (chosenItem === "") {
      alert(
        "Please select an item to compare by using the search bar.  The list of available items will populate once you begin typing."
      );
      return;
    }

    // Assign variables
    setWeightUnit(itemObj.unit_of_measure);
    const price1 = event.target.price1.value;
    const weight1 = event.target.weight1.value;
    const unit1 = event.target.unit1.value;
    const price2 = event.target.price2.value;
    const unit2 = event.target.unit2.value;

    // Compare price depending on available prices/units of measurement
    if (
      (!price1 && !price2) ||
      (price1 && !weight1) ||
      (price1 && price2 && weight1)
    ) {
      alert(
        "please fill out price and weight information for one of the two options."
      );
      return;
    } else if (price1 && weight1 && !price2) {
      if (unit1 === "lb" && itemObj.unit_of_measure === "kg") {
        let pricePerLb = price1 / weight1;
        let pricePerKg = pricePerLb * 2.204623;
        setSavingsPerKg((pricePerKg - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePerKg / itemObj.market_price - 1) * 100).toFixed(2)
        );
        itemObj.my_price = pricePerKg.toFixed(2);
        itemObj.percentage_savings = (
          (pricePerKg / itemObj.market_price - 1) *
          100
        ).toFixed(2);
      } else if (
        (unit1 === "kg" && itemObj.unit_of_measure === "kg") ||
        (unit1 === "unit" && itemObj.unit_of_measure === "unit") ||
        (unit1 === "litre" && itemObj.unit_of_measure === "litre") ||
        (unit1 === "dozen" && itemObj.unit_of_measure === "dozen")
      ) {
        let pricePer = price1 / weight1;
        setSavingsPerKg((pricePer - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePer / itemObj.market_price - 1) * 100).toFixed(2)
        );
        itemObj.my_price = pricePer.toFixed(2);
        itemObj.percentage_savings = (
          (pricePer / itemObj.market_price - 1) *
          100
        ).toFixed(2);
      } else if (unit1 === "100g" && itemObj.unit_of_measure === "kg") {
        let pricePerKg = (price1 / weight1) * 10;
        setSavingsPerKg((pricePerKg - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePerKg / itemObj.market_price - 1) * 100).toFixed(2)
        );
        itemObj.my_price = pricePerKg.toFixed(2);
        itemObj.percentage_savings = (
          (pricePerKg / itemObj.market_price - 1) *
          100
        ).toFixed(2);
      } else if (unit1 === "ml" && itemObj.unit_of_measure === "litre") {
        let pricePerLitre = (price1 / weight1) * 1000;
        setSavingsPerKg((pricePerLitre - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePerLitre / itemObj.market_price - 1) * 100).toFixed(2)
        );
        itemObj.my_price = pricePerLitre.toFixed(2);
        itemObj.percentage_savings = (
          (pricePerLitre / itemObj.market_price - 1) *
          100
        ).toFixed(2);
      } else {
        alert(
          `Pricing data unavailable for this weight type.  ${itemObj.item_name} pricing data is available in ${itemObj.unit_of_measure}s`
        );
        return;
      }
    } else if (!price1 && !weight1 && price2) {
      if (unit2 === "lb" && itemObj.unit_of_measure === "kg") {
        let pricePerKg = price2 * 2.204623;
        setSavingsPerKg((pricePerKg - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePerKg / itemObj.market_price - 1) * 100).toFixed(2)
        );
        itemObj.my_price = pricePerKg.toFixed(2);
        itemObj.percentage_savings = (
          (pricePerKg / itemObj.market_price - 1) *
          100
        ).toFixed(2);
      } else if (
        (unit2 === "kg" && itemObj.unit_of_measure === "kg") ||
        (unit2 === "unit" && itemObj.unit_of_measure === "unit") ||
        (unit2 === "litre" && itemObj.unit_of_measure === "litre") ||
        (unit2 === "dozen" && itemObj.unit_of_measure === "dozen")
      ) {
        setSavingsPerKg((price2 - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((price2 / itemObj.market_price - 1) * 100).toFixed(2)
        );
        itemObj.my_price = price2;
        itemObj.percentage_savings = (
          (price2 / itemObj.market_price - 1) *
          100
        ).toFixed(2);
      } else if (unit2 === "100g" && itemObj.unit_of_measure === "kg") {
        let pricePerKg = price2 * 10;
        setSavingsPerKg((pricePerKg - itemObj.market_price).toFixed(2));
        setSavingsPercentage(
          ((pricePerKg / itemObj.market_price - 1) * 100).toFixed(2)
        );
        itemObj.my_price = pricePerKg.toFixed(2);
        itemObj.percentage_savings = (
          (pricePerKg / itemObj.market_price - 1) *
          100
        ).toFixed(2);
      } else {
        alert(
          `Pricing data unavailable for this weight type.  ${itemObj.item_name} pricing data is available in ${itemObj.unit_of_measure}s`
        );
        return;
      }
    }
    if (event.target.price2.value) {
      event.target.price1.value = "";
      event.target.weight1.value = "";
    } else if (event.target.price1.value && event.target.unit1.value) {
      event.target.price2.value = "";
    }
    const newObj = itemObj;

    setItemHistory((prevArray) => [newObj, ...prevArray]);
    reset();
  };

  // function to keep recent history to last 5 searches
  useEffect(() => {
    if (itemHistory.length > 5) {
      const newArray = itemHistory;
      newArray.pop();
      setItemHistory(newArray);
    }
  }, [itemHistory]);

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
              <span className="compare-main__input-wrapper">
                <input
                  className="compare-main__input compare-main__input--price-1"
                  type="text"
                  placeholder="Price"
                  name="price1"
                  autoComplete="off"
                  {...register("price1")}
                />
                <img className="compare-main__input--icon" src={dollarBlack} />
              </span>
              <input
                className="compare-main__input compare-main__input--weight"
                type="text"
                placeholder="Weight"
                name="weight1"
                autoComplete="off"
                {...register("weight1")}
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
                <option value="ml">&nbsp; ml</option>
                <option value="litre">litre</option>
                <option value="dozen">dozen</option>
              </select>
            </div>
            <p className="compare-main__text compare-main__text--1">OR</p>
            <h4 className="compare-main__details-summary compare-main__details-summary--2">
              Use this option if you have the price per weight unit:
            </h4>
            <div className="compare-main__inputs-2">
              <span className="compare-main__input-wrapper">
                <input
                  className="compare-main__input compare-main__input--price-2"
                  type="text"
                  placeholder="Price"
                  name="price2"
                  autoComplete="off"
                  {...register("price2")}
                />
                <img className="compare-main__input--icon" src={dollarBlack} />
              </span>
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
                <option value="dozen">dozen</option>
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
                : `*You would spend $${savingsPerKg} per ${weightUnit} above market price`}
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
                  src={zigZagArrowWhite}
                />
              </div>
              <div className="compare-main__title compare-main__title--3">
                <h3 className="compare-main__title-text">
                  Market
                  <br />$
                </h3>
              </div>
              <div className="compare-main__title compare-main__title--4">
                <h3 className="compare-main__title-text">
                  My
                  <br />$
                </h3>
              </div>
            </div>
            <ul className="compare-main__list">
              {itemHistory.map((item) => (
                <li className="compare-main__list-row" key={uuidv4()}>
                  <div className="compare-main__list-item-container compare-main__list-item-container--1">
                    <p className="compare-main__list-item compare-main__list-item--name">
                      {item.item_name}
                    </p>
                  </div>
                  <div className="compare-main__list-item-container compare-main__list-item-container--2">
                    <p
                      className="compare-main__list-item compare-main__list-item--savings"
                      style={{
                        color: item.percentage_savings > 0 ? `red` : "green",
                      }}
                    >
                      {item.percentage_savings}%
                    </p>
                  </div>
                  <div className="compare-main__list-item-container compare-main__list-item-container--3">
                    <p className="compare-main__list-item compare-main__list-item--market-price">
                      {item.market_price} / {item.unit_of_measure}
                    </p>
                  </div>
                  <div className="compare-main__list-item-container compare-main__list-item-container--4">
                    <p className="compare-main__list-item compare-main__list-item--my-price">
                      {item.my_price} / {item.unit_of_measure}
                    </p>
                  </div>
                </li>
              ))}
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
// }

export default CompareMain;
