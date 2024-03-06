import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { SongsListWrapper } from './style'
import { shallowEqualApp, useAppSelector, useAppDispatch } from '@/store'
import ThemeCover from '@/components/theme-cover'
import HCFpagination from '@/components/pagination'
import { fetchSongsListAction } from '../../store/songs'

interface IProps {
  children?: ReactNode
}

const SongsList: FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { categorySongs } = useAppSelector(
    (state) => ({
      categorySongs: state.songs.categorySongs
    }),
    shallowEqualApp
  )
  const songList = categorySongs?.playlists || []
  const total = categorySongs?.total || 0
  const dispatch = useAppDispatch()

  function onPageChange(page: number) {
    setCurrentPage(page)
    dispatch(fetchSongsListAction(page))
  }

  return (
    <SongsListWrapper>
      <div className="songs-list">
        {songList.map((item: any) => {
          return <ThemeCover info={item} key={item.id} right="30px" />
        })}
      </div>
      <HCFpagination
        currentPage={currentPage}
        total={total}
        onPageChange={onPageChange}
      />
    </SongsListWrapper>
  )
}

export default memo(SongsList)
