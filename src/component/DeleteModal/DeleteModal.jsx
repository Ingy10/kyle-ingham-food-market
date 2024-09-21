import "./DeleteModal.scss";

function DeleteModal({ DeleteListItems, CancelDelete, DeleteMessage }) {
  return (
    <>
      <section className="delete-modal">
        <div className="delete-modal__container">
          <h1 className="delete-modal__title">Delete List Items</h1>
          <h3 className="delete-modal__description">{DeleteMessage}</h3>
          <div className="delete-modal__button-container">
            <button
              className="delete-modal__button delete-modal__button--delete"
              onClick={DeleteListItems}
              style={{
                display:
                  DeleteMessage === `No items to delete` ? `none` : `flex`,
              }}
            >
              DELETE
            </button>
            <button
              className="delete-modal__button delete-modal__button--cancel"
              onClick={CancelDelete}
            >
              CANCEL
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DeleteModal;
