import { SVGProps } from 'react'

const BottomAlignIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke='currentColor'
    fill='none'
    strokeWidth='0'
    viewBox='0 0 24 24'
    aria-hidden='true'
    focusable='false'
    height='18px'
    width='18px'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M13 10H17V16H13V10Z' fill='currentColor' fillOpacity='0.5'></path>
    <path d='M11 4H7V16H11V4Z' fill='currentColor'></path>
    <path d='M18 18H6V20H18V18Z' fill='currentColor'></path>
  </svg>
)
export default BottomAlignIcon
