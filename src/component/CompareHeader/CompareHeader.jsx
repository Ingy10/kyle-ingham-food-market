import "./CompareHeader.scss";
import cartWhite from "../../assets/icons/cart-white.png";
import listWhite from "../../assets/icons/list-2-white.png";
import settingsWhite from "../../assets/icons/settings-white.png";
import basketWeave from "../../assets/images/basket-weave.jpg";

function CompareHeader() {
  return (
    <>
      <header className="compare-header">
        <img className="compare-header__background-image" src={basketWeave} />
        <div className="compare-header__overlay"></div>
        <div className="compare-header__container-nav">
          <div className="compare-header__wrapper-icon">
            <img
              className="compare-header__icon-left"
              src={cartWhite}
              alt="shopping list"
            />
            <p className="compare-header__icon-text">LIST</p>
          </div>
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
        <div className="compare-header__search-container">
          <input
            className="compare-header__search-bar"
            type="text"
            placeholder="Search Food Items..."
          />
          <img className="compare-header__search-icon" src="" />
        </div>
      </header>
    </>
  );
}

export default CompareHeader;
