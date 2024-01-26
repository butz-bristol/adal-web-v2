import { useState } from 'react';

function Pagination({ items, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middle = Math.ceil(maxPagesToShow / 2);
      if (currentPage <= middle) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + middle >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middle;
        endPage = currentPage + middle;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (totalPages > maxPagesToShow) {
      if (startPage > 1) {
        pageNumbers.unshift('...');
        pageNumbers.unshift(1);
      }

      if (endPage < totalPages) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((pageNumber) => pageNumber.toString());
  };

  return (
    <div className="">
      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <span key={index} className="">
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            className={` ${parseInt(pageNumber, 10) === currentPage ? '' : ''}`}
            onClick={() => handlePageChange(parseInt(pageNumber, 10))}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
