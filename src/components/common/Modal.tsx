import { CSSProperties, ReactNode, useMemo } from "react"

export default function Modal({
  open,
  onClose,
  children,
  title,
  subTitle
}: {
  open: boolean,
  onClose: {(): void},
  children: ReactNode,
  title?: string,
  subTitle?: string
}) {
  const modalStyle = useMemo<CSSProperties>(() => {
    if (!open) {
      return ({})
    }

    return ({
      opacity: 1,
      pointerEvents: 'auto'
    })
  }, [open])

  return (
    <dialog className='modal' style={modalStyle}>
      <div
        className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur'
        onClick={onClose}
      />
      <div className='modal-box'>
        {title &&
          <div className='px-4 sm:px-0'>
            <h3 className='leading-7'>{title}</h3>
            {subTitle &&
              <p className='mt-1 leading-6 text-sm text-gray-500'>{subTitle}</p>
            }
          </div>
        }

        {children}
      </div>
    </dialog>
  )
}
