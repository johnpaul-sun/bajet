import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

type PaginateTypes = {
  data: string[]
}

function Paginate({ data }: PaginateTypes) {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setPageCount(data[0].length);
  }, []);

  const handlePageClick = (e: any) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="<<"
      activeLinkClassName="text-primary-100 border border-b-primary-100"
      className="flex justify-between mt-px-15 text-inactive"
      nextLinkClassName="hover:text-primary-100"
      previousLinkClassName="hover:text-primary-100"
    />
  );
}

export default Paginate;
