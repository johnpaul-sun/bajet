import React, { useEffect, useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { MainContext } from "src/context/MainContext";

type PaginateType = {
  data: any,
  type: any
}

function Paginate({ data, type }: PaginateType) {
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  const {
    wallet: {
      page: [, setWalletPage]
    },
    pocket: {
      page: [, setPocketPage]
    }
  } = useContext(MainContext) as any;

  useEffect(() => {
    setPageCount(data?.last_page || 0);
    setCurrentPage(data?.current_page);
  }, [data]);

  const handlePageClick = (e: any) => {
    const page = e.selected + 1;

    switch (type) {
      case 'wallet': {
        setWalletPage(page)
        break;
      }
      case 'pocket': {
        setPocketPage(page)
        break;
      }
      default:
        break;
    }

    setCurrentPage(page);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      onPageChange={handlePageClick}
      pageRangeDisplayed={data.per_page}
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
