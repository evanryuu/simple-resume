import React from 'react'

import { Icon } from '@iconify/react'
import classNames from 'classnames'

export interface MyGithubProps {
  type?: 'icon' | 'tag' | 'shield'
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
      {
        type === 'shield'
          ? <img src="https://img.shields.io/github/stars/evankwolf/simple-resume?style=social" alt="github" />
          : <Icon icon="bytesize:github" />
      }

      {type === 'tag' ? <span className="ml-1 text-sm font-semibold tracking-widest">Star</span> : null}
    </a>
  )
}

MyGithub.defaultProps = {
  type: 'tag',
}

export default MyGithub
