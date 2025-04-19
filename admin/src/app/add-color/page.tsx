import React from "react";
import LayoutPage from "../components/LayoutPage";
import AddCustomer from "../components/AddCustomer";
import AddColor from "../components/AddColor";

function page() {
  return (
    <LayoutPage>
      <AddColor />
    </LayoutPage>
  );
}

export default page;
