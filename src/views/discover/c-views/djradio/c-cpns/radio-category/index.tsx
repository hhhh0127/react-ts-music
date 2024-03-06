import React, { memo, useRef, useEffect } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import { CategoryContent, CategoryWrapper, CategoryItemImage } from './style'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import {
  changeCurrentIdAction,
  fetchRadioCategoriesAction
} from '../../store/djradio'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const PAGE_SIZE = 18

const RadioCategory: FC<IProps> = () => {
  const { categories = [], currentId } = useAppSelector(
    (state) => ({
      categories: state.djradio.categories,
      currentId: state.djradio.currentId
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRadioCategoriesAction())
  }, [dispatch])

  const page = Math.ceil(categories.length / PAGE_SIZE) || 1

  /* 轮播图类似的，去找下类型 */
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null) // 需要初始化，不然会报错

  function getSize(index: number) {
    return index * PAGE_SIZE > categories.length
      ? index * PAGE_SIZE
      : categories?.length
  }

  return (
    <CategoryWrapper>
      <div
        className="arrow arrow-left"
        onClick={() => carouselRef.current?.prev()}
      ></div>
      <CategoryContent>
        <Carousel dots={{ className: 'dots' }} ref={carouselRef}>
          {Array(page)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className="category-page">
                  {categories
                    ?.slice(index * PAGE_SIZE, getSize(index + 1))
                    .map((item: any) => {
                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            dispatch(changeCurrentIdAction(item.id))
                          }
                          className={classNames('category-item', {
                            active: currentId === item.id
                          })}
                        >
                          <CategoryItemImage
                            className="image"
                            imgUrl={item.picWebUrl}
                          ></CategoryItemImage>
                          <span>{item.name}</span>
                        </div>
                      )
                    })}
                </div>
              )
            })}
        </Carousel>
      </CategoryContent>
      <div
        className="arrow arrow-right"
        onClick={() => carouselRef.current?.next()}
      ></div>
    </CategoryWrapper>
  )
}

export default memo(RadioCategory)
