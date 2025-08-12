"use client";

type OverplayProp = {
  closeMenu: () => void;
};
function Overplay({ closeMenu }: OverplayProp) {
  const handleOverlayClick = () => {
    if (closeMenu) closeMenu();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/50 opacity-100 pointer-events-auto transition ease-in-out duration-500 z-22 xl:hidden"
      onClick={handleOverlayClick}
    ></div>
  );
}

export default Overplay;
