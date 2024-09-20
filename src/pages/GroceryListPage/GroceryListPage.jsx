import "./GroceryListPage.scss";
import ListHeader from "../../component/ListHeader/ListHeader";
import ListMain from "../../component/ListMain/ListMain";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function GroceryListPage() {
  const [listItems, setListItems] = useState([]);
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

  // renders list on page load
  useEffect(() => {
    getListItems();
  }, []);

  return (
    <>
      <ListHeader
        BASE_URL={BASE_URL}
        UserId={userId}
        Province={province}
        GroceryListId={groceryListId}
        GetListItems={getListItems}
      />
      <ListMain BASE_URL={BASE_URL} ListItems={listItems} />
    </>
  );
}

export default GroceryListPage;
