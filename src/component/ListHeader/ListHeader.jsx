import "./ListHeader.scss";
import listWhite from "../../assets/icons/list-2-white.png";
import arrowBack from "../../assets/icons/back-arrow.png";
import searchBlack from "../../assets/icons/search-black.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function ListHeader({
  UserId,
  Province,
  GroceryListId,
  BASE_URL,
  GetListItems,
  AllItems,
  AllUserItems,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItemsList, setSearchItemsList] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    navigate(-1);
  };

  // function to add item to list
  const addItem = async (event) => {
    event.preventDefault();
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
      category: event.target.category.value || "other",
    };

    try {
      await axios.post(
        `${BASE_URL}/grocery-list/${UserId}/${Province}/${GroceryListId}`,
        itemToAdd
      );
      GetListItems();
      setSearchTerm("");
      setCategory("");
    } catch (error) {
      console.error(error);
    }
  };

  // function to handle changes in input bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    searchItems(event);
    if (event.target.value === "") {
      setSearchItemsList([]);
    }
  };

  // function to search all user and cpi items from search bar
  const searchItems = (event) => {
    const targetValue = event.target.value.toLowerCase();
    const foundItem1 = AllItems.filter((item) =>
      item.item_name.toLowerCase().includes(targetValue)
    );
    const foundItem2 = AllUserItems.filter((item) =>
      item.user_item_name.toLowerCase().includes(targetValue)
    );

    const searchListDropdown = [
      ...new Map(
        foundItem1
          .concat(foundItem2)
          .map((item) => [
            item.user_item_name?.toLowerCase() || item.item_name.toLowerCase(),
            item,
          ])
      ).values(),
    ];
    setSearchItemsList(searchListDropdown);
  };

  // function to set the item name in the search bar
  const setItemName = (name, category) => {
    setSearchItemsList([]);
    setSearchTerm(name);
    setCategory(category);
  };

  return (
    <>
      <header className="list-header">
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
              onChange={() => handleInputChange(event)}
              value={searchTerm}
              autoComplete="off"
            />
            <img className="list-header__search-bar--icon" src={searchBlack} />
            <ul className="list-header__search-items-list">
              {searchItemsList.map((item) => (
                <li
                  className="list-header__search-item"
                  key={item.id}
                  onClick={() =>
                    setItemName(
                      item.item_name || item.user_item_name,
                      item.category
                    )
                  }
                >
                  {item.item_name || item.user_item_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="list-header__input-wrapper">
            <div className="list-header__dropdown-container">
              <select
                className="list-header__dropdown"
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
