import Button from "./Button";
import { IPagination } from "@/interfaces/pagination";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

// common pagination component for the listig page
const Pagination: React.FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 mb-5">
      <Button
        type="button"
        className={`px-4 py-2 mx-1 text-white font-bold rounded ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-500"
            : "text-white"
        }`}
        action={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title={t("pagination.previous")}
      ></Button>
      {[...Array(totalPages)].map((_, index) => (
        <Fragment key={index}>
          <Button
            type="button"
            className={`px-3 py-1 mx-1 font-bold border rounded ${
              currentPage === index + 1
                ? "bg-primary text-white border-primary"
                : "bg-secondary text-white border-secondary"
            }`}
            title={String(index + 1)}
            action={() => handlePageChange(index + 1)}
          />
        </Fragment>
      ))}
      <Button
        type="button"
        className={`px-4 py-2 mx-1 text-white font-bold rounded ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-500"
            : "text-white"
        }`}
        action={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title={t("pagination.next")}
      ></Button>
    </div>
  );
};

export default Pagination;
