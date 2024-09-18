import "./ListHeader.scss";
import listWhite from "../../assets/icons/list-2-white.png";
import produceDark from "../../assets/images/produce-black.jpg";
import arrowBack from "../../assets/icons/back-arrow.png";
import searchBlack from "../../assets/icons/search-black.png";
import { Link, useNavigate } from "react-router-dom";

function ListHeader() {
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    navigate(-1);
  };
  return (
    <>
      <header className="list-header">
        <img className="list-header__background-image" src={produceDark} />
        <div className="list-header__overlay"></div>
        <div className="list-header__container-nav">
          <div className="list-header__wrapper-icon" onClick={handleGoBack}>
            <img
              className="list-header__icon-left"
              src={arrowBack}
              alt="shopping list"
            />
          </div>
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
        <form className="list-header__add-item-form" onSubmit="">
          <div className="list-header__search-container">
            <input
              className="list-header__search-bar"
              type="text"
              placeholder="Add Item..."
            />
            <img className="list-header__search-bar--icon" src={searchBlack} />
          </div>
          <button className="list-header__add-button" type="submit">
            ADD
          </button>
        </form>
        <div className="list-header__list-tabs">
          <div className="list-header__tab">
            <h3 className="list-header__tab-title">Groceries</h3>
          </div>
        </div>
      </header>
    </>
  );
}

export default ListHeader;
