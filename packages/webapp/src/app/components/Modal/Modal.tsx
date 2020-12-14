import * as React from 'react'
import type { FC } from 'react'
import * as ReactDOM from 'react-dom'
import snarkdown from 'snarkdown'

import styles from './Modal.module.css'

type ComponentProps = {
  body: string
  title?: string
  close?: () => void
}

const Component: FC<ComponentProps> = ({ title, body, close }) => {
  return (
    <div className={styles.wrapper} onClick={close}>
      <div className={styles.Modal}>
        <div className={styles.body}>
          {title ? <h2 className={styles.title}>{title}</h2> : null }
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: snarkdown(body) }}
          />
        </div>
      </div>
    </div>
  )
}

type Props = ComponentProps & {
  isOpen: boolean
}

export const Modal: FC<Props> = ({ title, body, close, isOpen }) => {
  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <Component title={title} body={body} close={close} />,
    document.body
  )
}
