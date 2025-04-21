"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { FaSortDown } from "react-icons/fa";
import Image from "./Image";
import Pagination from "./Pagination";
import ImageViewer from "./ImageViewer";
function Inventory() {
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);

  useEffect(() => {
    if (showImageViewer) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showImageViewer]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setShowImageViewer(true);
  };

  const toggleDropdownMenu = () => {
    setOpenDropdownMenu((prev) => !prev);
  };
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Hàng trong kho (20)
        </h1>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
        <div className="p-[1.2rem] flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-[150px] h-[30px] border border-[#b0b0b0] inline-block px-[0.5rem] text-[#666] outline-none text-[0.8rem]"
            />
          </div>
          <div className="flex items-center">
            <span className="inline-block mr-[0.6rem] text-[0.9rem] text-[#666]">
              Số lượng
            </span>
            <select
              name=""
              className="w-[100px] h-[30px] border border-[#b0b0b0] inline-block px-[0.5rem] text-[#666] outline-none text-[0.9rem]"
            >
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] text-left text-[#444] text-[0.9rem]">
                Sản phẩm
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Màu</th>
              <th className="text-left text-[#444] text-[0.9rem]">
                Kích thước
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Số lượng</th>
              <th className="text-left text-[#444] text-[0.9rem]">Ngày tạo</th>

              <th className="text-left text-[#444] text-[0.9rem] relative">
                <span
                  onMouseOut={toggleDropdownMenu}
                  onMouseOver={toggleDropdownMenu}
                  className="py-[1rem] cursor-pointer flex items-center gap-[2px]"
                >
                  Tình trạng <FaSortDown size={14} />
                  {openDropdownMenu && (
                    <div className="absolute bg-[#f9f9f9] z-10 top-[90%] left-0 min-w-[160px] shadow-sm font-medium">
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Tất cả
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Còn hàng
                      </button>
                      <button
                        className={`text-black px-4 py-3 block w-full text-left`}
                      >
                        Hết hàng
                      </button>
                    </div>
                  )}
                </span>
              </th>
              <th className="text-left text-[#444] text-[0.9rem]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pl-[1rem] py-[1rem] w-[300px]">
                <div className="flex gap-[10px] items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClick("assets/products/IMGSP0841.png");
                    }}
                  >
                    <Image
                      Src={"assets/products/IMGSP0841.png"}
                      Alt={""}
                      ClassName={"w-[75px] cursor-pointer"}
                    />
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[0.9rem] font-medium  text-[#444]">
                      Áo sơ mi
                    </p>
                  </div>
                </div>
              </td>

              <td className="py-[1rem] text-[0.9rem]  text-[#444]">
                <div className="flex gap-[10px] items-center text-[#FF0000]">
                  <div className="w-5 h-5 bg-[#FF0000]"></div>
                  Đỏ tươi
                </div>
              </td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">XL</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">20/4/2025</td>

              <td className="py-[1rem] text-[0.9rem] text-[#444]">Còn hàng</td>
              <td className="py-[1rem] text-[0.9rem] text-[#444]">
                <div className="flex items-center gap-[15px]">
                  <Link href={"/product"}>
                    <LiaExternalLinkAltSolid
                      size={23}
                      className="text-[#076ffe]"
                    />
                  </Link>
                </div>
              </td>
            </tr>

            {/*
           <tr>
                <td colSpan="8" className="w-full h-[70vh]">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[180px]"}
                    />
                  </div>
                </td>
              </tr>
    */}
          </tbody>
        </table>
      </div>

      <Pagination />

      {showImageViewer && (
        <ImageViewer
          imgSrc={selectedImage}
          closeMenu={() => setShowImageViewer(false)}
        />
      )}
    </>
  );
}

export default Inventory;
