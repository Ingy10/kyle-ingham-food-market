import "./ListMain.scss";
import checkBoxEmpty from "../../assets/icons/check-box-empty-black.png";
import category from "../../assets/icons/category.png";
import veggies from "../../assets/icons/carrot-black.png";
import fruit from "../../assets/icons/apple-black.png";
import dairy from "../../assets/icons/dairy-products-black.png";
import meat from "../../assets/icons/steak-black.png";
import bakery from "../../assets/icons/bread-black.png";

function ListMain() {
  return (
    <>
      <main className="list-main">
        <section className="list-main__list-section">
          <div className="list-main__list-titles">
            <div className="list-main__title list-main__title--1">
              <h3 className="list-main__title-text">Items</h3>
            </div>
            <div className="list-main__title list-main__title--2">
              <img
                className="list-main__title-text list-main__title-category"
                src={category}
              />
            </div>
            <div className="list-main__title list-main__title--3">
              <h3 className="list-main__title-text">
                Market
                <br />
                $/kg*
              </h3>
            </div>
            <div className="list-main__title list-main__title--4">
              <h3 className="list-main__title-text">
                My
                <br />
                $/kg
              </h3>
            </div>
            <div className="list-main__title list-main__title--5">
              <h3 className="list-main__title-text">Buy</h3>
            </div>
          </div>
          <ul className="list-main__list">
            <li className="list-main__list-item-row">
              <div className="list-main__list-item-container list-main__list-item-container--1">
                <p className="list-main__list-item list-main__list-item--name">
                  Strawberries
                </p>
              </div>
              <div className="list-main__list-item-container list-main__list-item-container--2">
                <img
                  className="list-main__list-item list-main__list-item--category"
                  src={fruit}
                />
              </div>
              <div className="list-main__list-item-container list-main__list-item-container--3">
                <p className="list-main__list-item list-main__list-item--market-price">
                  $1.50
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
                  src={checkBoxEmpty}
                />
              </div>
            </li>
          </ul>
          <footer className="list-main__list-footer">
            <div className="list-main__footer-container">
              <button className="list-main__reset-button">RESET</button>
              <p className="list-main__button-description">
                *This will reset all list items back to initial state
              </p>
              <p className="list-main__foot-note">
                *Food prices available only for items tracked in provincial CPI
                report
              </p>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}

export default ListMain;
