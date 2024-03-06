import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { DjRadioWrapper } from './style'
import RadioCategory from './c-cpns/radio-category'

interface IProps {
  children?: ReactNode
}

const Djradio: FC<IProps> = () => {
  return (
    <DjRadioWrapper className="wrap-v2">
      <RadioCategory />
    </DjRadioWrapper>
  )
}

export default memo(Djradio)
