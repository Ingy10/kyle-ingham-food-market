import "./AddUserItemModal.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function addUserItemModal({
  ItemToAddPrice,
  ItemToAddName,
  ItemToAddCategory,
  ItemToAddUnit,
  ItemToAddWeight,
  CancelUserItemModal,
  BASE_URL,
  UpdateActiveListItemId,
}) {
  const { userId, province, groceryListId } = useParams();
  const [defaultUnit, setDefaultUnit] = useState("");
  const [invalidPrice, setInvalidPrice] = useState("");

  useEffect(() => {
    setDefaultUnit(ItemToAddUnit);
  }, [ItemToAddName]);

  // function to add new user item to database
  const addNewItemUserItemsTable = async (event) => {
    event.preventDefault();
    let unit = event.target.unit.value;
    let price = event.target.price.value;
    let weight = event.target.weight.value || 1;

    if (!unit || !price) {
      setInvalidPrice("--invalid");
      return;
    }

    if (unit === "lb") {
      let pricePerLb = price / weight;
      price = (pricePerLb * 2.204623).toFixed(2);
      unit = "kg";
      weight = 1;
    } else if (unit === "100g") {
      price = ((price / weight) * 10).toFixed(2);
      unit = "kg";
      weight = 1;
    } else if (unit === "ml") {
      price = ((price / weight) * 1000).toFixed(2);
      unit = "litre";
      weight = 1;
    } else if (
      (unit === "kg" ||
        unit === "litre" ||
        unit === "unit" ||
        unit === "dozen") &&
      weight != 1
    ) {
      price = (price / weight).toFixed(2);
    }

    const itemToAdd = {
      user_item_name: ItemToAddName,
      user_item_price: price,
      category: ItemToAddCategory,
      unit_of_measure: unit,
      province: province,
      user_id: userId,
    };

    try {
      await axios.post(
        `${BASE_URL}/grocery-list/${userId}/${province}/${groceryListId}/buy`,
        itemToAdd
      );
      CancelUserItemModal();
      UpdateActiveListItemId("");
      setInvalidPrice("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="add-item-modal">
        <div className="add-item-modal__container">
          <h1 className="add-item-modal__title">Add New Item</h1>
          <h4 className="add-item-modal__description">
            No pricing data available for this item. Would you like to add this
            price to your database for future comparison?
          </h4>
          <form
            className="add-item-modal__form"
            onSubmit={() => addNewItemUserItemsTable(event)}
          >
            <h3 className="add-item-modal__item">Item: {ItemToAddName}</h3>
            <div className="add-item-modal__form-container">
              <div className="add-item-modal__input-container add-item-modal__input-container--1">
                <label className="add-item-modal__label add-item-modal__label--price">
                  Price $
                </label>
                <input
                  className={`add-item-modal__input add-item-modal__input--price${invalidPrice}`}
                  type="number"
                  step="any"
                  name="price"
                  defaultValue={ItemToAddPrice}
                  autoComplete="off"
                />
              </div>
              <div className="add-item-modal__input-container add-item-modal__input-container--2">
                <label className="add-item-modal__label add-item-modal__label--weight">
                  Weight
                </label>
                <input
                  className="add-item-modal__input add-item-modal__input--weight"
                  type="number"
                  step="any"
                  name="weight"
                  defaultValue={ItemToAddWeight}
                  autoComplete="off"
                />
              </div>
              <div className="add-item-modal__input-container add-item-modal__input-container--3">
                <label className="add-item-modal__label add-item-modal__label--unit">
                  Unit
                </label>
                <select
                  className="add-item-modal__input add-item-modal__input--unit"
                  name="unit"
                  value={defaultUnit}
                  onChange={(e) => setDefaultUnit(e.target.value)}
                >
                  <option value="lb">lb</option>
                  <option value="kg">kg</option>
                  <option value="100g">100g</option>
                  <option value="unit">unit</option>
                  <option value="litre">litre</option>
                  <option value="ml">ml</option>
                  <option value="dozen">dozen</option>
                </select>
              </div>
            </div>
            <div className="add-item-modal__button-container">
              <button
                className="add-item-modal__button add-item-modal__button--add"
                type="submit"
              >
                ADD
              </button>
              <button
                className="add-item-modal__button add-item-modal__button--cancel"
                onClick={CancelUserItemModal}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default addUserItemModal;
