'use client'

import { useState } from 'react'

import Pagination from './Pagination'

const noop = () => undefined

const PaginationGallery = () => {
  const [page, setPage] = useState(2)

  return (
    <div className="flex flex-wrap items-center gap-8">
      <Pagination
        currentPage={page}
        nextLabel="Next page"
        onPageChange={setPage}
        previousLabel="Previous page"
        totalPages={5}
      />
      <Pagination
        currentPage={1}
        nextLabel="Next page"
        onPageChange={noop}
        previousLabel="Previous page"
        totalPages={3}
      />
      <Pagination
        currentPage={3}
        nextLabel="Next page"
        onPageChange={noop}
        previousLabel="Previous page"
        totalPages={3}
      />
    </div>
  )
}

export default PaginationGallery
