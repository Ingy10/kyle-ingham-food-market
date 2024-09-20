import "./GroceryListPage.scss";
import ListHeader from "../../component/ListHeader/ListHeader";
import ListMain from "../../component/ListMain/ListMain";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function GroceryListPage() {
  const [listItems, setListItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [sortAz, setSortAz] = useState(false);
  const { userId, province, groceryListId } = useParams();

  // function to get all items for a given list
  const getListItems = async () => {
    try {
      const listArray = await axios.get(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}`
      );
      setListItems(listArray.data);
    } catch (error) {
      console.error(error);
    }
  };

  // function to get all cpi items from the users province
  const getAllProvincialCpiItems = async (province) => {
    try {
      province = province.toLowerCase();

      const itemList = await axios.get(
        `${BASE_URL}/compare/${userId}/${province}`
      );

      setAllItems(itemList.data);
    } catch (error) {
      console.error(error);
    }
  };

  // renders list on page load
  useEffect(() => {
    getListItems();
    getAllProvincialCpiItems(province);
  }, []);

  // function to sort list by category
  const sortCategory = () => {
    const sortedList = [...listItems].sort((a, b) =>
      a.grocery_list_category.localeCompare(b.grocery_list_category)
    );
    setListItems(sortedList);
  };

  // function to sort list by name
  const sortName = () => {
    if (!sortAz) {
      const sortedList = [...listItems].sort((a, b) =>
        a.grocery_list_item_name.localeCompare(b.grocery_list_item_name)
      );
      setListItems(sortedList);
      setSortAz(true);
    } else {
      const sortedList = [...listItems].sort((a, b) =>
        b.grocery_list_item_name.localeCompare(a.grocery_list_item_name)
      );
      setListItems(sortedList);
      setSortAz(false);
    }
  };

  return (
    <>
      <ListHeader
        BASE_URL={BASE_URL}
        UserId={userId}
        Province={province}
        GroceryListId={groceryListId}
        GetListItems={getListItems}
        AllItems={allItems}
      />
      <ListMain
        ListItems={listItems}
        SortCategory={sortCategory}
        SortName={sortName}
      />
    </>
  );
}

export default GroceryListPage;
