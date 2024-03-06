import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  position: string
  description: string
  onClick: () => any
  children?: ReactNode
}

const LoginIcon: FC<IProps> = (props) => {
  const { position, description, onClick } = props
  return (
    <div>
      <a
        style={{
          display: 'flex',
          width: '149px',
          marginTop: '19px',
          lineHeight: '38px'
        }}
        onClick={onClick}
      >
        <i
          className="theme-logo"
          style={{
            width: '38px',
            height: '38px',
            backgroundPosition: position
          }}
        ></i>
        <em style={{ marginLeft: '14px' }}>{description}</em>
      </a>
    </div>
  )
}

export default memo(LoginIcon)
