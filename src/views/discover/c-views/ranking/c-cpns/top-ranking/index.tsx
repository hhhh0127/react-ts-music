import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRankingWrapper } from './style'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import classNames from 'classnames'
import { getImageSize } from '@/utils/format'
import {
  changeCurrentIndexAction,
  fetchPlayListAction
} from '../../store/ranking'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { topList, currentIndex } = useAppSelector(
    (state) => ({
      topList: state.ranking?.topList,
      currentIndex: state.ranking?.currentIndex
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const id = topList[currentIndex]?.id
    console.log(id)
    if (!id) return
    dispatch(fetchPlayListAction(id))
  }, [topList, currentIndex, dispatch])

  function handleItemClick(index: number) {
    dispatch(changeCurrentIndexAction(index))
    const id = topList[index].id
    dispatch(fetchPlayListAction(id)) //  获取对应榜单的列表
  }

  return (
    <TopRankingWrapper>
      {topList.map((item: any, index: number) => {
        let header
        if (index === 0 || index === 4) {
          header = (
            <div className="header">
              {index === 0 ? '云音乐特色榜' : '全球媒体榜'}
            </div>
          )
        }
        return (
          <div key={item.id}>
            {header}
            <div
              className={classNames('item', { active: index === currentIndex })}
              onClick={() => handleItemClick(index)}
            >
              <img src={getImageSize(item.coverImgUrl, 40)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="update">{item.updateFrequency}</div>
              </div>
            </div>
          </div>
        )
      })}
    </TopRankingWrapper>
  )
}

export default memo(TopRanking)
