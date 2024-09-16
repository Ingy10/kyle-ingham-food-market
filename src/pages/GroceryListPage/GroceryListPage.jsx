import "./GroceryListPage.scss";
import ListHeader from "../../component/ListHeader/ListHeader";
import ListMain from "../../component/ListMain/ListMain";

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
