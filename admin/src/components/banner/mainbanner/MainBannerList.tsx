"use client";
import Pagination from "../../ui/Pagination";
import useGetMainBanners from "@/hooks/useGetMainBanners";
import ListHeader from "@/components/ui/list/ListHeader";
import ListBody from "@/components/ui/list/ListBody";
import MainBannerTable from "./MainBannerTable";
function MainBannerList() {
  const {
    mainbanners,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetMainBanners();

  return (
    <>
      <ListHeader
        title="Banner chính"
        totalItems={totalItems}
        addLink="/add-mainbanner"
      />

      <ListBody>
        <MainBannerTable
          mainbanners={mainbanners}
          isLoading={isLoading}
          mutate={mutate}
        />
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

export default MainBannerList;
