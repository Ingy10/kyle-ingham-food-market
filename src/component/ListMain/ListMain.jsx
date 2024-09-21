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
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ListMain({
  ListItems,
  SortCategory,
  SortName,
  ChangeActiveState,
  ResetList,
  DeleteList,
}) {
  const [showBuyButton, setShowBuyButton] = useState(false);
  const [activeListItemId, setActiveListItemId] = useState("");

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

  // function to compare a list item
  const compareListItem = () => {
    event.preventDefault();
    setShowBuyButton(true);
  };

  // function to buy list item that is being compared
  const purchaseListItem = () => {
    event.preventDefault();
    setShowBuyButton(false);
  };

  // function to show sub-item for a given list item
  const showSubItem = (id, active) => {
    console.log(id);
    if (active === 0) {
      return;
    }
    if (id === activeListItemId) {
      setActiveListItemId("");
    } else {
      setActiveListItemId(id);
      console.log(activeListItemId);
    }
  };

  if (ListItems.length === 0) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <>
        <main className="list-main">
          <section className="list-main__list-section">
            <div className="list-main__list-titles">
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
              <div className="list-main__title list-main__title--4">
                <h3 className="list-main__title-text">
                  My
                  <br />$
                </h3>
              </div>
              <div className="list-main__title list-main__title--5">
                <h3 className="list-main__title-text">Buy</h3>
              </div>
            </div>
            <ul className="list-main__list">
              {ListItems.map((item) => (
                <div
                  className="list-main__list-item-wrapper"
                  key={item.grocery_list_item_id}
                  onClick={() =>
                    showSubItem(item.grocery_list_item_id, item.active_state)
                  }
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
                          ? (item.market_price + item.avg_user_price) / 2
                          : item.market_price || item.avg_user_price}{" "}
                        / {item.cpi_unit_of_measure}
                      </p>
                    </div>
                    <div className="list-main__list-item-container list-main__list-item-container--4">
                      <p className="list-main__list-item list-main__list-item--my-price">
                        {} / {}
                      </p>
                    </div>
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
                  </li>
                  <li
                    className="list-main__sub-item"
                    style={{
                      display:
                        activeListItemId === item.grocery_list_item_id
                          ? "flex"
                          : "none",
                    }}
                  >
                    <form className="list-main__compare-form">
                      <div className="list-main__input-container list-main__input-container--1">
                        <input
                          className="list-main__input list-main__input--price"
                          placeholder="price"
                          autoComplete="off"
                        />
                        <img
                          className="list-main__input--icon"
                          src={dollarSymbol}
                        />
                      </div>
                      <div className="list-main__input-container list-main__input-container--2">
                        <input
                          className="list-main__input list-main__input--weight"
                          placeholder="wt."
                          autoComplete="off"
                        />
                      </div>
                      <div className="list-main__input-container list-main__input-container--3">
                        <select className="list-main__input list-main__input--unit">
                          <option value="lb">&nbsp; lb</option>
                          <option value="kg">&nbsp; kg</option>
                          <option value="100g">100g</option>
                          <option value="unit">&nbsp; unit</option>
                          <option value="litre">&nbsp; litre</option>
                          <option value="dozen">dozen</option>
                        </select>
                      </div>
                      <div className="list-main__form-button-container">
                        <button
                          className="list-main__form-button list-main__form-button--compare"
                          onClick={() => compareListItem()}
                          style={{ display: showBuyButton ? "none" : "flex" }}
                        >
                          COMPARE
                        </button>
                        <button
                          className="list-main__form-button list-main__form-button--buy"
                          onClick={() => purchaseListItem()}
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
