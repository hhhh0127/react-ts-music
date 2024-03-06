import React, { memo, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { LyricPanelWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'
import classNames from 'classnames'
import { scrollTo } from '@/utils/ui-helper'

interface IProps {
  children?: ReactNode
}

const LyricPanel: FC<IProps> = () => {
  const { lyrics, lyricIndex } = useAppSelector(
    (state) => ({
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex
    }),
    shallowEqualApp
  )

  const panelRef = useRef(null) // useRef是需要设置初始值的，不然会报错
  useEffect(() => {
    if (lyricIndex > 0 && lyricIndex < 3) return
    scrollTo(panelRef.current, (lyricIndex - 3) * 32, 300) // 歌词滚动（没懂怎么做的？？？）
  }, [lyricIndex])

  return (
    <LyricPanelWrapper ref={panelRef}>
      <div className="lrc-content">
        {lyrics.length > 0 &&
          lyrics?.map((item, index) => {
            return (
              <div
                key={item.time}
                className={classNames('lrc-item', {
                  active: index === lyricIndex
                })}
              >
                {item.text}
              </div>
            )
          })}
      </div>
    </LyricPanelWrapper>
  )
}

export default memo(LyricPanel)
