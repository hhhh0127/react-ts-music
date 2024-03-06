import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayerCommentWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const PlayComment: FC<IProps> = () => {
  return <PlayerCommentWrapper>PlayComment</PlayerCommentWrapper>
}

export default memo(PlayComment)
