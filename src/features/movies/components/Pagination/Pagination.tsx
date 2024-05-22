import './styles.scss'
import { FC } from 'react'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}: any) => {
  const getPaginationItems = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            disabled={i === currentPage}
            className={i === currentPage ? 'active' : ''}
          >
            {i}
          </button>,
        )
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          1
        </button>,
      )

      if (currentPage > 3) {
        pages.push(
          <span className="pagination__ellipsis" key="start-ellipsis">
            ...
          </span>,
        )
      }

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            disabled={i === currentPage}
            className={i === currentPage ? 'active' : ''}
          >
            {i}
          </button>,
        )
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span className="pagination__ellipsis" key="end-ellipsis">
            ...
          </span>,
        )
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          disabled={totalPages === currentPage}
        >
          {totalPages}
        </button>,
      )
    }

    return pages
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {getPaginationItems()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}
