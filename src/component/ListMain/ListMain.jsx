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
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ListMain({
  ListItems,
  SortCategory,
  SortName,
  ChangeActiveState,
  ResetList,
}) {
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
                <li
                  className="list-main__list-item-row"
                  key={item.grocery_list_item_id}
                  style={{
                    backgroundColor: item.active_state === 0 ? `grey` : "",
                    opacity: item.active_state === 0 ? ".7" : "",
                    boxShadow:
                      item.active_state === 0 ? "inset 2px 2px 8px black" : "",
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
                      {item.market_price} / {item.unit_of_measure}
                    </p>
                  </div>
                  <div className="list-main__list-item-container list-main__list-item-container--4">
                    <p className="list-main__list-item list-main__list-item--my-price">
                      $1.34
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
              ))}
            </ul>
            <footer className="list-main__list-footer">
              <div className="list-main__footer-container">
                <button
                  className="list-main__reset-button"
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
                <p className="list-main__foot-note">
                  *Food prices available only for items tracked in provincial
                  CPI report
                </p>
              </div>
            </footer>
          </section>
        </main>
      </>
    );
  }
}

export default ListMain;
