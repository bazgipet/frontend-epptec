import React from 'react';
import '../design/Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'

function Pagination({ max, page }) {
  page = parseInt(page, 10)
  return (
    <section className='pagi_section'>

      {
        page !== 1 ?
          (<a href={`/?pageId=${page - 1}`}><FontAwesomeIcon
            icon={faCircleArrowLeft} /></a>) :
          (<a><FontAwesomeIcon icon={faCircleArrowLeft} className='disable' /></a>)
      }

      <span>{page}</span>

      {
        max ?
          (<a><FontAwesomeIcon icon={faCircleArrowRight} className='disable' /></a>)
          :
          (<a href={`/?pageId=${page + 1}`}><FontAwesomeIcon
            icon={faCircleArrowRight} /></a>)
      }
    </section>
  );
}

export default Pagination;