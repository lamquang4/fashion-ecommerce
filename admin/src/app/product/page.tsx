import React from "react";
import Dashboard from "../components/Dashboard";
import MenuSide from "../components/MenuSide";
import Header from "../components/Header";
function page() {
  return (
    <div className="flex h-screen overflow-hidden">
      <MenuSide />
      <main className="w-full">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
}

export default page;
