import "./GroceryListPage.scss";
import ListHeader from "../../component/list-view/ListHeader/ListHeader";
import ListMain from "../../component/list-view/ListMain/ListMain";

function GroceryListPage() {
  return (
    <>
      <h1>Grocery List Page</h1>
      <ListHeader />
      <ListMain />
    </>
  );
}

export default GroceryListPage;
