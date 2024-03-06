import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Modal } from 'antd'

interface IProps {
  children?: ReactNode
  controlShow?: boolean
  title?: string
  handleOk?: any
  handleCancel?: any
}

const ThemeDialog: FC<IProps> = (props) => {
  const { controlShow, title, handleOk, handleCancel } = props

  return (
    <>
      <Modal
        title={title}
        open={controlShow}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  )
}

export default memo(ThemeDialog)
