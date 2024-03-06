import React, { memo } from 'react'
// import type 仅仅引用这个数据类型，而不是这个类别
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
// FC:FunctionComponent
// IProps 是对属性的约束
const Download: FC<IProps> = () => {
  return <div>download</div>
}

export default memo(Download)
