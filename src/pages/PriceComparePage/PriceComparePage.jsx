import "./PriceComparePage.scss";
import CompareHeader from "../../component/CompareHeader/CompareHeader";
import CompareMain from "../../component/CompareMain/CompareMain";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function PriceComparePage() {
  const [allItems, setAllItems] = useState([]);
  const [searchItemsList, setSearchItemsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [invalid, setInvalid] = useState("");
  const { province, userId } = useParams();

  // get request to get all cpi items for a given province
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

  // runs initial get request once when user goes to compare page
  useEffect(() => {
    getAllProvincialCpiItems(province);
  }, []);

  // search bar filter function
  const searchItems = (event) => {
    console.log(event.target.value);
    const foundItem = allItems.filter((item) =>
      item.item_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    let searchItemNames = [];
    let searchObjs = [];
    if (event.target.value !== "") {
      searchItemNames = foundItem.map((name) => name.item_name);
      searchObjs = foundItem.map((item) => item);
    }
    setSearchItemsList(searchObjs);
  };

  // selected search item from submit function
  const selectItemToCompare = (event) => {
    event.preventDefault();
    let foundItem = "";
    foundItem = allItems.filter((item) =>
      item.item_name
        .toLowerCase()
        .includes(event.target.search.value.toLowerCase())
    );
    if (foundItem.length === 0) {
      alert(`Pricing data unavailable for ${event.target.search.value}`);
      setInvalid("--invalid");
      return;
    }
    setInvalid("");
    setSelectedItem(event.target.search.value);
    setSearchItemsList([]);
  };

  // function to remove dropdown list when item is selected
  const removeList = () => {
    setSearchItemsList([]);
  };

  const removeInvalidState = () => {
    setInvalid("");
  };

  return (
    <>
      <CompareHeader
        SearchItems={searchItems}
        SearchItemsList={searchItemsList}
        SelectItemToCompare={selectItemToCompare}
        RemoveList={removeList}
        Invalid={invalid}
        RemoveInvalidState={removeInvalidState}
      />
      <CompareMain SelectedItem={selectedItem} AllItems={allItems} />
    </>
  );
}

export default PriceComparePage;
