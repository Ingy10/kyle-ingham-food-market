import "./DeleteModal.scss";

function DeleteModal() {
  return (
    <>
      <section className="delete-modal">
        <div className="delete-modal__container">
          <h1 className="delete-modal__title">Delete List Items</h1>
          <h3 className="delete-modal__description">
            Are you sure you want to delete all selected list items?
          </h3>
          <button className="delete-modal__button">DELETE</button>
        </div>
      </section>
    </>
  );
}

export default DeleteModal;
