'use client';

import React from 'react';
import "./Pagination.css";

interface PaginationProps {
  currentPage: number; // trang hiện tại 
  totalPages: number; // tất cả các trnag
  onPageChange: (page: number) => void; // nút chuyển đổi giữa các trang 
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="d-flex justify-content-center mt-4">
      <ul className="pagination pagination-custom">
        {/* Nút Previous */}
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          <span className="page-link">{'<'}</span>
        </li>

        {/* Các nút số trang */}
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            <span className="page-link">{page}</span>
          </li>
        ))}

        {/* Nút Next */}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        >
          <span className="page-link">{'>'}</span>
        </li>
      </ul>
    </div>
  );
}
