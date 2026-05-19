"use client";
import Pagination from "../ui/Pagination";
import useGetCoupons from "@/hooks/useGetCoupons";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import CouponTable from "./CouponTable";
function CouponList() {
  const {
    coupons,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetCoupons();

  return (
    <>
      <ListHeader
        title="Phiếu giảm giá"
        totalItems={totalItems}
        addLink="/add-coupon"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <CouponTable coupons={coupons} isLoading={isLoading} mutate={mutate} />
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default CouponList;
