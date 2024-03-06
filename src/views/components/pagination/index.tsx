import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PaginationWrapper } from './style'
import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'

interface IProps {
  children?: ReactNode
  currentPage?: number
  total?: number
  onPageChange?: PaginationProps['onChange']
}

/* 不要和引入的Pagination组件同名，不然会报错：Import declaration conflicts with local declaration of 'Pagination'. */
const HCFPagination: FC<IProps> = (props) => {
  const { currentPage, total, onPageChange } = props

  function itemRender(_: number, type: string, originalElement: ReactNode) {
    if (type === 'prev') {
      return <button className="control prev">&lt; 上一页</button>
    }
    if (type === 'next') {
      return <button className="control next">下一页 &gt;</button>
    }
    return originalElement
  }

  return (
    <PaginationWrapper>
      <Pagination
        className="pagination"
        size="small"
        current={currentPage}
        defaultCurrent={1}
        total={total}
        showSizeChanger={false}
        itemRender={itemRender}
        onChange={onPageChange}
      ></Pagination>
    </PaginationWrapper>
  )
}

export default memo(HCFPagination)
