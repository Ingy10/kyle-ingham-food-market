import "./GroceryListPage.scss";
import ListHeader from "../../component/ListHeader/ListHeader";
import ListMain from "../../component/ListMain/ListMain";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function GroceryListPage() {
  const [listItems, setListItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [sortAz, setSortAz] = useState(false);
  const [sort, setSort] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [allUserItems, setAllUserItems] = useState([]);
  const { userId, province, groceryListId } = useParams();

  // function to get all items for a given list
  const getListItems = async () => {
    try {
      const listArray = await axios.get(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}`
      );
      if (sort === "category") {
        listArray.data.sort((a, b) =>
          a.grocery_list_category.localeCompare(b.grocery_list_category)
        );
      } else if (sort === "sortaz") {
        listArray.data.sort((a, b) =>
          a.grocery_list_item_name.localeCompare(b.grocery_list_item_name)
        );
      } else if (sort === "sortza") {
        listArray.data.sort((a, b) =>
          b.grocery_list_item_name.localeCompare(a.grocery_list_item_name)
        );
      }
      listArray.data.sort((a, b) => b.active_state - a.active_state);
      setListItems(listArray.data);
      window.scrollTo(0, window.scrollY);
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

  // function to get all user items
  const getAllUserItems = async () => {
    try {
      const allUserItems = await axios.get(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}/user`
      );
      setAllUserItems(allUserItems.data);
    } catch (error) {
      console.error(error);
    }
  };

  // renders list on page load
  useEffect(() => {
    getListItems();
    getAllProvincialCpiItems(province);
    getAllUserItems();
  }, []);

  // function to sort list by category
  const sortCategory = () => {
    listItems.sort((a, b) =>
      a.grocery_list_category.localeCompare(b.grocery_list_category)
    );
    const sortedList = [...listItems].sort(
      (a, b) => b.active_state - a.active_state
    );
    setListItems(sortedList);
    setSort("category");
  };

  // function to sort list by name
  const sortName = () => {
    if (!sortAz) {
      const sortedList = [...listItems].sort((a, b) =>
        a.grocery_list_item_name.localeCompare(b.grocery_list_item_name)
      );
      setListItems(sortedList);
      setSortAz(true);
      setSort("sortaz");
    } else {
      const sortedList = [...listItems].sort((a, b) =>
        b.grocery_list_item_name.localeCompare(a.grocery_list_item_name)
      );
      setListItems(sortedList);
      setSortAz(false);
      setSort("sortza");
    }
  };

  // function to change active state of a list item
  const changeActiveState = async (id, status) => {
    let state = 0;
    if (status === 0) {
      state = 1;
    }
    if (status === 1) {
      state = 0;
    }
    const activeStatus = {
      id: id,
      active_state: state,
    };
    try {
      await axios.patch(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}`,
        activeStatus
      );
      getListItems();
    } catch (error) {
      console.error(error);
    }
  };

  // function to reset active status of all items back to active
  const resetList = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}/reset`
      );
      getListItems();
    } catch (error) {
      console.error(error);
    }
  };

  // function to display delete modal
  const deleteList = () => {
    const countItemsToDelete = listItems.filter(
      (item) => item.active_state === 0
    );
    if (countItemsToDelete.length === 0) {
      setDeleteMessage(`No items to delete`);
      console.log(deleteMessage);
      setShowDeleteModal(true);
      return;
    }
    if (countItemsToDelete.length === 1) {
      setDeleteMessage(
        `Are you sure you want to delete ${countItemsToDelete.length} selected item?`
      );
      setShowDeleteModal(true);
      return;
    }
    setDeleteMessage(
      `Are you sure you want to delete ${countItemsToDelete.length} selected items?`
    );
    setShowDeleteModal(true);
  };

  // function to delete all selected list items
  const deleteListItems = async () => {
    try {
      setShowDeleteModal(false);
      await axios.delete(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}`
      );
      getListItems();
    } catch (error) {
      console.error(error);
    }
  };

  // removes delete modal
  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <main className="grocery-list-page">
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
          ChangeActiveState={changeActiveState}
          ResetList={resetList}
          DeleteList={deleteList}
          BASE_URL={BASE_URL}
          AllCpiItems={allItems}
          AllUserItems={allUserItems}
        />
        <div
          className="grocery-list-page__delete-modal"
          style={{ display: showDeleteModal ? `flex` : `none` }}
        >
          <DeleteModal
            DeleteListItems={deleteListItems}
            CancelDelete={cancelDelete}
            DeleteMessage={deleteMessage}
          />
        </div>
      </main>
    </>
  );
}

export default GroceryListPage;
