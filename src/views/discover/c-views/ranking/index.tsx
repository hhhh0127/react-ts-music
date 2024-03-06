import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingLeft, RankingRight, RankingWrapper } from './style'
import RankingHeader from './c-cpns/ranking-header'
import RankingList from './c-cpns/ranking-list'
import TopRanking from './c-cpns/top-ranking'
import { useAppDispatch } from '@/store'
import {
  changeCurrentIndexAction,
  fetchPlayListAction,
  fetchTopListAction
} from './store/ranking'

interface IProps {
  children?: ReactNode
}

const Ranking: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeCurrentIndexAction(0))
    dispatch(fetchPlayListAction(19723756))
    dispatch(fetchTopListAction())
  }, [dispatch])
  return (
    <RankingWrapper className="wrap-v2">
      <RankingLeft>
        <TopRanking />
      </RankingLeft>
      <RankingRight>
        <RankingHeader />
        <RankingList />
      </RankingRight>
    </RankingWrapper>
  )
}

export default memo(Ranking)
