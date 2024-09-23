import "./ListHeader.scss";
import listWhite from "../../assets/icons/list-2-white.png";
import produceDark from "../../assets/images/produce-black.jpg";
import arrowBack from "../../assets/icons/back-arrow.png";
import searchBlack from "../../assets/icons/search-black.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function ListHeader({
  UserId,
  Province,
  GroceryListId,
  BASE_URL,
  GetListItems,
  AllItems,
}) {
  const { register, reset } = useForm();
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    navigate(-1);
  };

  // function to add item to list
  const addItem = async (event) => {
    event.preventDefault();
    // these variables need to be assigned dynamically based on a item_name search of respective tables
    let cpiItemId = null;
    const userItemId = null;

    // Checks to see if item exists in the CPI database for the users province
    const itemFound = AllItems.find(
      (item) =>
        event.target.search.value.toLowerCase() === item.item_name.toLowerCase()
    );

    if (itemFound) {
      cpiItemId = itemFound.id;
    }

    const itemToAdd = {
      grocery_list_id: GroceryListId,
      active_state: true,
      province: Province,
      cpi_item_id: cpiItemId,
      user_item_id: userItemId,
      item_name: event.target.search.value,
      category: event.target.category.value,
    };

    try {
      await axios.post(
        `${BASE_URL}/grocery-list/${UserId}/${Province}/${GroceryListId}`,
        itemToAdd
      );
      GetListItems();
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header className="list-header">
        {/* <img className="list-header__background-image" src={produceDark} /> */}
        {/* <div className="list-header__overlay"></div> */}
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
        <form
          className="list-header__add-item-form"
          onSubmit={() => addItem(event)}
        >
          <div className="list-header__search-container">
            <input
              className="list-header__search-bar"
              type="text"
              placeholder="Add Item..."
              name="search"
              autoComplete="off"
              {...register("search")}
            />
            <img className="list-header__search-bar--icon" src={searchBlack} />
          </div>
          <div className="list-header__input-wrapper">
            <div className="list-header__dropdown-container">
              <select
                className="list-header__dropdown"
                defaultValue=""
                name="category"
                id="category"
                {...register("category")}
              >
                <option value="" disabled>
                  category
                </option>
                <option value="other">other</option>
                <option value="fruit">fruit</option>
                <option value="vegetable">vegetable</option>
                <option value="meat">meat</option>
                <option vlaue="bakery">bakery</option>
                <option vlaue="dairy">dairy</option>
              </select>
            </div>

            <button className="list-header__add-button" type="submit">
              ADD
            </button>
          </div>
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
