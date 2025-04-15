import React from 'react';
import cl from "./Pagination.module.css";
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)
    return ( 
        <div className={cl.page__wrapper}>
        {pagesArray.map((p) => (
          <span key={p} className={[cl.page, page === p ? cl.page__current : ''].join(' ')} onClick={() => changePage(p)}>{p}</span>
        ))}
      </div>
     );
}
 
export default Pagination;