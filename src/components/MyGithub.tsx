import React from 'react'

import { Icon } from '@iconify/react'
import classNames from 'classnames'

export interface MyGithubProps {
  type?: 'icon' | 'tag'
  className?: string
}

const MyGithub: React.FC<MyGithubProps> = (props) => {
  const { type, className } = props
  const cname = classNames('inline-flex items-center', className)

  return (
    <a
      target="_blank"
      href="https://github.com/evankwolf/simple-resume"
      className={cname}
      rel="noreferrer"
    >
      {type === 'icon' ? null : <span className="mr-1">Star</span>} <Icon icon="bytesize:github" />
    </a>
  )
}

MyGithub.defaultProps = {
  type: 'tag',
}

export default MyGithub
