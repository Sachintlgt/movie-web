import Button from "@/app/components/Button";
import { IPagination } from "@/interfaces/pagination";
import React, { Fragment } from "react";

const Pagination: React.FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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
        title="Prev"
        action={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
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
        title="Next"
        action={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
