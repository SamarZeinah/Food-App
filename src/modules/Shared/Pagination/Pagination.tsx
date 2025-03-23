import React from 'react'
import { useState } from 'react';

const Pagination = ({arrayOfPages,onPageChange}) => {
const [currentPageGroup, setCurrentPageGroup] = useState(0);//store num of pages to display
const pagesPerGroup = 5; //num of pages in each Group
const totalGroups = Math.ceil(arrayOfPages.length / pagesPerGroup);  //total group=>num of pages/5         assume num of pages=10 [10/5=5]

const startPageIndex = currentPageGroup * pagesPerGroup;   //0*5      start=0
const endPageIndex = Math.min(startPageIndex + pagesPerGroup, arrayOfPages.length);   //0+5,10       end from 5 to 10

const handleNextGroup = () => {
  if (currentPageGroup < totalGroups - 1) {
    setCurrentPageGroup(currentPageGroup + 1);
  }
};

const handlePreviousGroup = () => {
  if (currentPageGroup > 0) {
    setCurrentPageGroup(currentPageGroup - 1);
  }
};

  return (
    <>
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPageGroup === 0 ? 'disabled' : ''}pageItem`}>
          <button className="page-link"  onClick={handlePreviousGroup}  aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
       {arrayOfPages?.slice(startPageIndex, endPageIndex).map((pageNumber)=>{
        return(
          // <li className="page-item" key={pageNumber} onClick={()=>onPageChange(pageNumber)}>
          //   <a className="page-link" href="#">{pageNumber}</a>
          // </li>
          <li className="page-item" key={pageNumber}>
          <button className="page-link" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        </li>

        )
       })}
    <li className={`page-item ${currentPageGroup === totalGroups - 1 ? 'disabled' : ''}pageItem`}>
          <button className="page-link" onClick={handleNextGroup} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>

    </>
  )
}

export default Pagination
