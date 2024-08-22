import Button from "@/app/components/Button";
import { IPagination } from "@/interfaces/pagination";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

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
    <div className="flex items-center justify-center mt-6">
      <Button
        type="button"
        className={`px-4 py-2 mx-1 border rounded ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        action={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title={t("pagination.previous")}
      ></Button>
      {[...Array(totalPages)].map((_, index) => (
        <Fragment key={index}>
          <Button
            type="button"
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
            }`}
            title={String(index + 1)}
            action={() => handlePageChange(index + 1)}
          />
        </Fragment>
      ))}
      <Button
        type="button"
        className={`px-4 py-2 mx-1 border rounded ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        action={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title={t("pagination.next")}
      ></Button>
    </div>
  );
};

export default Pagination;
