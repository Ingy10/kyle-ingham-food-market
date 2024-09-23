import "./ListMain.scss";
import checkBoxEmpty from "../../assets/icons/check-box-empty-black.png";
import checkedBox from "../../assets/icons/check-black.png";
import category from "../../assets/icons/category.png";
import vegetable from "../../assets/icons/carrot-black.png";
import fruit from "../../assets/icons/apple-black.png";
import dairy from "../../assets/icons/dairy-products-black.png";
import meat from "../../assets/icons/steak-black.png";
import bakery from "../../assets/icons/bread-black.png";
import other from "../../assets/icons/other-black.png";
import dollarSymbol from "../../assets/icons/dollar-symbol.png";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ListMain({
  ListItems,
  SortCategory,
  SortName,
  ChangeActiveState,
  ResetList,
  DeleteList,
  BASE_URL,
  AllCpiItems,
  AllUserItems,
  ActivateUserItemModal,
  ActiveListItemId,
  UpdateActiveListItemId,
}) {
  const [showBuyButton, setShowBuyButton] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState("");
  const [listSavingsPerKg, setListSavingsPerKg] = useState("");
  const [listSavingsPercentage, setListSavingsPercentage] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [unit, setUnit] = useState("");
  const { province, userId, groceryListId } = useParams();

  // object to assign images to each category
  const imageAssign = {
    fruit: fruit,
    vegetable: vegetable,
    dairy: dairy,
    meat: meat,
    bakery: bakery,
    other: other,
  };

  // Object to assign image depending on active state
  const activeAssign = {
    1: checkBoxEmpty,
    0: checkedBox,
  };

  // function to compare list item
  const compareItem = (item, event) => {
    event.preventDefault();
    let price = Number(event.target.price.value);
    let weight = Number(event.target.weight.value) || 1;
    const unit = event.target.unit.value;
    const databaseUnit = item.cpi_unit_of_measure || item.user_unit_of_measure;
    const avgDatabasePrice =
      item.market_price && item.avg_user_price
        ? (Number(item.market_price) + Number(item.avg_user_price)) / 2
        : item.market_price
        ? item.market_price
        : item.avg_user_price;

    const itemExistsInCpiDatabase = AllCpiItems.find(
      (cpiItem) =>
        cpiItem.item_name.toLowerCase() ===
        item.grocery_list_item_name.toLowerCase()
    );
    const itemExistsInUserDatabase = AllUserItems.find(
      (userItem) =>
        userItem.user_item_name.toLowerCase() ===
        item.grocery_list_item_name.toLowerCase()
    );

    if (!itemExistsInCpiDatabase && !itemExistsInUserDatabase) {
      ActivateUserItemModal(
        item.grocery_list_item_name,
        price,
        item.grocery_list_category,
        unit,
        weight
      );
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (!price || typeof price !== "number") {
      alert("Please enter a valid number for price");
      setInvalidPrice("invalid");
      return;
    }
    if (unit === "lb" && databaseUnit === "kg") {
      let pricePerLb = price / weight;
      let pricePerKg = pricePerLb * 2.204623;
      setListSavingsPerKg((pricePerKg - avgDatabasePrice).toFixed(2));
      setListSavingsPercentage(
        ((pricePerKg / avgDatabasePrice - 1) * 100).toFixed(2)
      );
      setPricePerUnit(pricePerKg.toFixed(2));
      setUnit(databaseUnit);
    } else if (
      (unit === "kg" && databaseUnit === "kg") ||
      (unit === "unit" && databaseUnit === "unit") ||
      (unit === "litre" && databaseUnit === "litre") ||
      (unit === "dozen" && databaseUnit === "dozen")
    ) {
      let pricePer = price / weight;
      setListSavingsPerKg((pricePer - avgDatabasePrice).toFixed(2));
      setListSavingsPercentage(
        ((pricePer / avgDatabasePrice - 1) * 100).toFixed(2)
      );
      setPricePerUnit(pricePer.toFixed(2));
      setUnit(databaseUnit);
    } else if (unit === "100g" && databaseUnit === "kg") {
      let pricePerKg = (price / weight) * 10;
      setListSavingsPerKg((pricePerKg - avgDatabasePrice).toFixed(2));
      setListSavingsPercentage(
        ((pricePerKg / avgDatabasePrice - 1) * 100).toFixed(2)
      );
      setPricePerUnit(pricePerKg.toFixed(2));
      setUnit(databaseUnit);
    } else if (unit === "ml" && databaseUnit === "litre") {
      let pricePerLitre = (price / weight) * 1000;
      setListSavingsPerKg((pricePerLitre - avgDatabasePrice).toFixed(2));
      setListSavingsPercentage(
        ((pricePerLitre / avgDatabasePrice - 1) * 100).toFixed(2)
      );
      setPricePerUnit(pricePerLitre.toFixed(2));
      setUnit(databaseUnit);
    } else {
      alert(
        `Pricing data unavailable for this weight type.  ${item.grocery_list_item_name} pricing data is available in ${databaseUnit}s`
      );
      return;
    }
    setInvalidPrice("");
    event.target.price.value = "";
    event.target.weight.value = "";
    setShowBuyButton(true);
  };

  // function to buy list item that is being compared and store the purchase data in user items table
  const purchaseListItem = async (id, status, cpiId, itemName, category) => {
    event.preventDefault();

    const itemToAdd = {
      cpi_item_id: cpiId,
      user_item_name: itemName,
      user_item_price: pricePerUnit,
      category: category,
      unit_of_measure: unit,
      province: province,
      user_id: userId,
    };
    try {
      const itemAdded = await axios.post(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}/buy`,
        itemToAdd
      );
    } catch (error) {
      console.error(error);
    }
    setShowBuyButton(false);
    setListSavingsPercentage(0);
    UpdateActiveListItemId("");
    ChangeActiveState(id, status);
  };

  // function to show sub-item for a given list item
  const showSubItem = (id, active) => {
    setListSavingsPercentage(0);
    setShowBuyButton(false);
    setInvalidPrice("");
    if (active === 0) {
      return;
    }
    if (id === ActiveListItemId) {
      UpdateActiveListItemId("");
    } else {
      UpdateActiveListItemId(id);
    }
  };

  const turnOffActiveStateOnReset = () => {
    UpdateActiveListItemId("");
  };

  if (ListItems.length === 0) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <>
        <main className="list-main">
          <section className="list-main__list-section">
            <div className="list-main__list-titles">
              <div className="list-main__titles-left">
                <div
                  className="list-main__title list-main__title--1"
                  onClick={() => SortName()}
                >
                  <h3 className="list-main__title-text">Items</h3>
                </div>
                <div
                  className="list-main__title list-main__title--2"
                  onClick={() => SortCategory()}
                >
                  <img
                    className="list-main__title-text list-main__title-category"
                    src={category}
                  />
                </div>
                <div className="list-main__title list-main__title--3">
                  <h3 className="list-main__title-text">
                    Market
                    <br />
                    $*
                  </h3>
                </div>
              </div>
              <div className="list-main__titles-right">
                <div className="list-main__title list-main__title--5">
                  <h3 className="list-main__title-text">Buy</h3>
                </div>
              </div>
            </div>
            <ul className="list-main__list">
              {ListItems.map((item) => (
                <div
                  className="list-main__list-item-wrapper"
                  key={item.grocery_list_item_id}
                >
                  <li
                    className="list-main__list-item-row"
                    style={{
                      backgroundColor: item.active_state === 0 ? `grey` : "",
                      opacity: item.active_state === 0 ? ".7" : "",
                      boxShadow:
                        item.active_state === 0
                          ? "inset 2px 2px 8px black"
                          : "",
                    }}
                  >
                    <div
                      className="list-main__list-item-left"
                      onClick={() =>
                        showSubItem(
                          item.grocery_list_item_id,
                          item.active_state
                        )
                      }
                    >
                      <div className="list-main__list-item-container list-main__list-item-container--1">
                        <p className="list-main__list-item list-main__list-item--name">
                          {item.grocery_list_item_name}
                        </p>
                      </div>
                      <div className="list-main__list-item-container list-main__list-item-container--2">
                        <img
                          className="list-main__list-item list-main__list-item--category"
                          src={imageAssign[item.grocery_list_category]}
                        />
                      </div>
                      <div className="list-main__list-item-container list-main__list-item-container--3">
                        <p className="list-main__list-item list-main__list-item--market-price">
                          {item.avg_user_price && item.market_price
                            ? (
                                (Number(item.market_price) +
                                  Number(item.avg_user_price)) /
                                2
                              ).toFixed(2)
                            : !item.avg_user_price && !item.market_price
                            ? " "
                            : item.market_price ||
                              Number(item.avg_user_price).toFixed(2)}{" "}
                          /{" "}
                          {item.cpi_unit_of_measure ||
                            item.user_unit_of_measure}
                        </p>
                      </div>
                    </div>
                    <div className="list-main__list-item-right">
                      <div className="list-main__list-item-container list-main__list-item-container--5">
                        <img
                          className="list-main__list-item list-main__list-item--buy"
                          src={activeAssign[item.active_state]}
                          onClick={() =>
                            ChangeActiveState(
                              item.grocery_list_item_id,
                              item.active_state
                            )
                          }
                        />
                      </div>
                    </div>
                  </li>
                  <li
                    className="list-main__sub-item"
                    style={{
                      display:
                        ActiveListItemId === item.grocery_list_item_id
                          ? "flex"
                          : "none",
                      boxShadow:
                        listSavingsPercentage === 0
                          ? "inset 1px 1px 5px #121211c2, inset -1px -1px 1px #121211c2"
                          : listSavingsPercentage > 0
                          ? "inset 2px 2px 7px #a82a13, inset -2px -2px 3px #a82a13"
                          : "inset 2px 2px 7px #556b2f, inset -2px -2px 3px #556b2f",
                    }}
                  >
                    <form
                      className="list-main__compare-form"
                      onSubmit={() => compareItem(item, event)}
                    >
                      <div className="list-main__input-container list-main__input-container--1">
                        <input
                          className={`list-main__input list-main__input--price list-main__input--price-${invalidPrice}`}
                          type="number"
                          step="any"
                          placeholder="price"
                          autoComplete="off"
                          name="price"
                          style={{ display: showBuyButton ? "none" : "flex" }}
                        />
                        <img
                          className="list-main__input--icon"
                          src={dollarSymbol}
                          style={{ display: showBuyButton ? "none" : "flex" }}
                        />
                        <p
                          className="list-main__unit-price-text list-main__unit-price-text--price"
                          style={{ display: showBuyButton ? "flex" : "none" }}
                        >
                          ${pricePerUnit}/{unit}
                        </p>
                      </div>
                      <div className="list-main__input-container list-main__input-container--2">
                        <input
                          className="list-main__input list-main__input--weight"
                          type="number"
                          step="any"
                          placeholder="wt."
                          autoComplete="off"
                          name="weight"
                          style={{ display: showBuyButton ? "none" : "flex" }}
                        />
                      </div>
                      <div className="list-main__input-container list-main__input-container--3">
                        <select
                          className="list-main__input list-main__input--unit"
                          name="unit"
                          style={{ display: showBuyButton ? "none" : "flex" }}
                        >
                          <option value="lb">&nbsp; lb</option>
                          <option value="kg">&nbsp; kg</option>
                          <option value="100g">100g</option>
                          <option value="unit">&nbsp; unit</option>
                          <option value="litre">&nbsp; litre</option>
                          <option value="ml">&nbsp; ml</option>
                          <option value="dozen">dozen</option>
                        </select>
                        <p
                          className="list-main__unit-price-text list-main__unit-price-text--percentage"
                          style={{
                            display: showBuyButton ? "flex" : "none",
                            color: listSavingsPercentage > 0 ? "red" : "green",
                          }}
                        >
                          {listSavingsPercentage}%
                        </p>
                      </div>
                      <div className="list-main__form-button-container">
                        <button
                          className="list-main__form-button list-main__form-button--compare"
                          type="submit"
                          style={{ display: showBuyButton ? "none" : "flex" }}
                        >
                          COMPARE
                        </button>
                        <button
                          className="list-main__form-button list-main__form-button--buy"
                          onClick={() =>
                            purchaseListItem(
                              item.grocery_list_item_id,
                              item.active_state,
                              item.cpi_item_id,
                              item.grocery_list_item_name,
                              item.grocery_list_category
                            )
                          }
                          style={{ display: showBuyButton ? "flex" : "none" }}
                        >
                          BUY
                        </button>
                      </div>
                    </form>
                  </li>
                </div>
              ))}
            </ul>
            <footer className="list-main__list-footer">
              <div className="list-main__footer-wrapper">
                <div className="list-main__footer-container list-main__footer-container--1">
                  <button
                    className="list-main__button list-main__button--reset"
                    onClick={() => {
                      ResetList();
                      turnOffActiveStateOnReset();
                      window.scrollTo({ top: 0, behavior: "auto" });
                    }}
                  >
                    RESET
                  </button>
                  <p className="list-main__button-description">
                    *This will reset all list items back to initial state
                  </p>
                </div>
                <div className="list-main__footer-container list-main__footer-container--1">
                  <button
                    className="list-main__button list-main__button--delete"
                    onClick={() => {
                      DeleteList();
                      window.scrollTo({ top: 0, behavior: "auto" });
                    }}
                  >
                    DELETE
                  </button>
                  <p className="list-main__button-description">
                    *This will delete all selected items from the list
                  </p>
                </div>
              </div>
              <p className="list-main__foot-note">
                *Food prices available only for items tracked in provincial CPI
                report
              </p>
            </footer>
          </section>
        </main>
      </>
    );
  }
}

export default ListMain;
