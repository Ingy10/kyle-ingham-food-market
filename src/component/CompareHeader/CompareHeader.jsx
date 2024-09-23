import "./CompareHeader.scss";
import cartWhite from "../../assets/icons/cart-white.png";
import listWhite from "../../assets/icons/list-2-white.png";
import searchBlack from "../../assets/icons/search-black.png";
import produceSpread from "../../assets/images/produce-spread.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

function CompareHeader({
  SearchItems,
  SearchItemsList,
  SelectItemToCompare,
  RemoveList,
  Invalid,
  RemoveInvalidState,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // function to set search term
  const searchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  // function to select item from dropdown filter
  const setItemName = (item) => {
    setSearchTerm(item);
    RemoveList();
  };

  // function to handle input changes in the search-bar
  const handleInputChange = (event) => {
    searchInput(event);
    SearchItems(event);
  };

  // function for form submission
  const searchFormSubmit = (event) => {
    event.preventDefault();
    SelectItemToCompare(event);
    setSearchTerm("");
    RemoveList();
  };

  return (
    <>
      <header className="compare-header">
        <img className="compare-header__background-image" src={produceSpread} />
        <div className="compare-header__overlay"></div>
        <div className="compare-header__container-nav">
          <Link
            className="compare-header__list-link"
            to={"/grocery-list/1/alberta/1"}
          >
            <div className="compare-header__wrapper-icon">
              <img
                className="compare-header__icon-left"
                src={cartWhite}
                alt="shopping list"
              />
              <p className="compare-header__icon-text">LIST</p>
            </div>
          </Link>
          <div className="compare-header__title-container">
            <h1 className="compare-header__title">Food Market</h1>
            <h3 className="compare-header__sub-title">
              A Food Price Comparison App
            </h3>
          </div>
          <div className="compare-header__wrapper-list">
            <img
              className="compare-header__icon-right"
              src={listWhite}
              alt="shopping list"
            />
          </div>
        </div>
        <form
          className="compare-header__form"
          onSubmit={() => searchFormSubmit(event)}
        >
          <div className="compare-header__search-container">
            <input
              className={`compare-header__search-bar compare-header__search-bar${Invalid}`}
              type="text"
              placeholder="Search Items..."
              name="search"
              onChange={() => {
                handleInputChange(event);
                RemoveInvalidState();
              }}
              value={searchTerm}
              autoComplete="off"
            />
            <p
              className="compare-header__search-bar-info"
              style={{ display: !Invalid ? `none` : `flex` }}
            >
              *Please select a valid item from search item list
            </p>
            <img
              className="compare-header__search-bar--icon"
              src={searchBlack}
            />
            <ul className="compare-header__search-items-list">
              {SearchItemsList.map((item) => (
                <li
                  className="compare-header__search-item"
                  key={item.id}
                  onClick={() => setItemName(item.item_name)}
                >
                  {item.item_name}
                </li>
              ))}
            </ul>
          </div>
          <button className="compare-header__button" type="submit">
            SELECT
          </button>
        </form>
      </header>
    </>
  );
}

export default CompareHeader;
