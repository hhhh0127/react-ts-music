import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderWrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
}

const ThemeHeaderPlayer: FC<IProps> = (props) => {
  const { title } = props
  return (
    <HeaderWrapper>
      <h3>{title}</h3>
    </HeaderWrapper>
  )
}

export default memo(ThemeHeaderPlayer)
