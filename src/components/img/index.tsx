import React, { FC, ImgHTMLAttributes, useEffect, useRef } from 'react'

export const placeholderImg = '/assets/images/placeholder.jpeg'

export const Img: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // catch error event once
    imgRef.current?.addEventListener(
      'error',
      () => {
        if (imgRef.current) {
          imgRef.current.src = placeholderImg
        }
      },
      { once: true }
    )
  }, [])

  return <img ref={imgRef} alt={alt} src={src || placeholderImg} {...props} />
}
