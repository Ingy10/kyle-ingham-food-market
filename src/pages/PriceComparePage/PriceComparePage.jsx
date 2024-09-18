import "./PriceComparePage.scss";
import CompareHeader from "../../component/CompareHeader/CompareHeader";
import CompareMain from "../../component/CompareMain/CompareMain";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function PriceComparePage() {
  const [allItems, setAllItems] = useState([]);
  const { province, userId } = useParams();

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

  useEffect(() => {
    getAllProvincialCpiItems(province);
  }, []);

  const searchItems = (event) => {
    console.log(event.target.value);
    const foundItem = allItems.find(
      (item) => event.target.value.toLowerCase() == item.item_name.toLowerCase()
    );
    console.log(foundItem);
  };

  return (
    <>
      <CompareHeader SearchItems={searchItems} />
      <CompareMain />
    </>
  );
}

export default PriceComparePage;
