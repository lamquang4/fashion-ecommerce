import React, { useState } from "react";
import MenuSide from "../components/MenuSide";
import Dashboard from "../components/Dashboard";

function page() {
  const [menuSideOpen, setMenuSideOpen] = useState(false);

  const toggleMenuSide = () => {
    setMenuSideOpen(!menuSideOpen);
  };
  return (
    <div>
      <MenuSide isOpen={true} toggleMenu={toggleMenuSide} />
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default page;
