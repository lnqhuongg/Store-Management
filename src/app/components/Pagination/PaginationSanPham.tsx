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
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Nếu tổng số trang <= 5, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Nếu tổng số trang > 5, tính toán các trang cần hiển thị
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      // Điều chỉnh để luôn hiển thị đủ 5 trang nếu có thể
      if (currentPage <= 3) {
        endPage = Math.min(totalPages, maxVisiblePages);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
      
      // Thêm ellipsis nếu cần
      if (startPage > 1) {
        visiblePages.unshift('...');
        visiblePages.unshift(1);
      }
      if (endPage < totalPages) {
        visiblePages.push('...');
        visiblePages.push(totalPages);
      }
    }
    
    return visiblePages;
  };
  const visiblePages = getVisiblePages();
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
        {visiblePages.map((page, index) => (
          <li
            key={index}
            className={`page-item ${
              page === currentPage ? 'active' : ''
            } ${page === '...' ? 'disabled' : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
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
