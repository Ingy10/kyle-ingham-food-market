import "./ListHeader.scss";
import listWhite from "../../assets/icons/list-2-white.png";
import produceDark from "../../assets/images/produce-black.jpg";
import arrowBack from "../../assets/icons/back-arrow.png";
import searchBlack from "../../assets/icons/search-black.png";
import { Link } from "react-router-dom";

function ListHeader() {
  return (
    <>
      <header className="list-header">
        <img className="list-header__background-image" src={produceDark} />
        <div className="list-header__overlay"></div>
        <div className="list-header__container-nav">
          <Link className="list-header__back-link" to={"/"}>
            <div className="list-header__wrapper-icon">
              <img
                className="list-header__icon-left"
                src={arrowBack}
                alt="shopping list"
              />
            </div>
          </Link>
          <div className="list-header__title-container">
            <h1 className="list-header__title">Food Market</h1>
            <h3 className="list-header__sub-title">
              A Food Price Comparison App
            </h3>
          </div>
          <div className="list-header__wrapper-list">
            <img
              className="list-header__icon-right"
              src={listWhite}
              alt="shopping list"
            />
          </div>
        </div>
        <form className="list-header__add-item-form">
          <div className="list-header__search-container">
            <input
              className="list-header__search-bar"
              type="text"
              placeholder="Add Item..."
            />
            <img className="list-header__search-bar--icon" src={searchBlack} />
          </div>
          <button className="list-header__add-button">ADD</button>
        </form>
      </header>
    </>
  );
}

export default ListHeader;
