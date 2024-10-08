import "./GroceryListPage.scss";
import ListHeader from "../../component/ListHeader/ListHeader";
import ListMain from "../../component/ListMain/ListMain";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import AddUserItemModal from "../../component/AddUserItemModal/AddUserItemModal";
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
  const [showAddUserItemModal, setShowAddUserItemModal] = useState(false);
  const [itemToAddPrice, setItemToAddPrice] = useState("");
  const [itemToAddName, setItemToAddName] = useState("");
  const [itemToAddCategory, setItemToAddCategory] = useState("");
  const [itemToAddUnit, setItemToAddUnit] = useState("");
  const [itemToAddWeight, setItemToAddWeight] = useState("");
  const [activeListItemId, setActiveListItemId] = useState("");
  const [itemToAddId, setItemToAddId] = useState("");
  const { userId, province, groceryListId } = useParams();

  // function to get all items for a given list
  const getListItems = async () => {
    try {
      const listArray = await axios.get(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}`
      );

      const listData = [...listArray.data];

      if (sort === "category") {
        listData.sort((a, b) =>
          a.grocery_list_category.localeCompare(b.grocery_list_category)
        );
      } else if (sort === "sortaz") {
        listData.sort((a, b) =>
          a.grocery_list_item_name.localeCompare(b.grocery_list_item_name)
        );
      } else if (sort === "sortza") {
        listData.sort((a, b) =>
          b.grocery_list_item_name.localeCompare(a.grocery_list_item_name)
        );
      }
      listData.sort((a, b) => b.active_state - a.active_state);
      setListItems(listData);
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
      const finalSortedList = [...sortedList].sort(
        (a, b) => b.active_state - a.active_state
      );
      setListItems(finalSortedList);
      setSortAz(true);
      setSort("sortaz");
    } else {
      const sortedList = [...listItems].sort((a, b) =>
        b.grocery_list_item_name.localeCompare(a.grocery_list_item_name)
      );
      const finalSortedList = [...sortedList].sort(
        (a, b) => b.active_state - a.active_state
      );
      setListItems(finalSortedList);
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
      getAllUserItems();
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
      getAllUserItems();
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

  // function to show add user item modal
  const activateUserItemModal = (
    name,
    price,
    category,
    unit,
    weight,
    listId
  ) => {
    setShowAddUserItemModal(true);
    setItemToAddName(name);
    setItemToAddPrice(price);
    setItemToAddCategory(category);
    setItemToAddUnit(unit);
    setItemToAddWeight(weight);
    setItemToAddId(listId);
  };

  // function to remove user item modal
  const cancelUserItemModal = () => {
    setItemToAddName("");
    setItemToAddPrice("");
    setItemToAddCategory("");
    setItemToAddUnit("");
    setItemToAddWeight("");
    setShowAddUserItemModal(false);
    setActiveListItemId("");
  };

  // function to set active list item id
  const updateActiveListItemId = (id) => {
    setActiveListItemId(id);
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
          AllUserItems={allUserItems}
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
          ActivateUserItemModal={activateUserItemModal}
          ActiveListItemId={activeListItemId}
          UpdateActiveListItemId={updateActiveListItemId}
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
        <div
          className="grocery-list-page__user-item-modal"
          style={{ display: showAddUserItemModal ? `flex` : `none` }}
        >
          <AddUserItemModal
            ItemToAddName={itemToAddName}
            ItemToAddPrice={itemToAddPrice}
            ItemToAddCategory={itemToAddCategory}
            ItemToAddUnit={itemToAddUnit}
            ItemToAddWeight={itemToAddWeight}
            ItemToAddId={itemToAddId}
            CancelUserItemModal={cancelUserItemModal}
            BASE_URL={BASE_URL}
            UpdateActiveListItemId={updateActiveListItemId}
            ChangeActiveState={changeActiveState}
          />
        </div>
      </main>
    </>
  );
}

export default GroceryListPage;
