import { SVGProps } from 'react'

const XAxisCenterIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d='M9 13H15V17H9V13Z' fill='currentColor' fillOpacity='0.5'></path>
    <path d='M6 7H18V11H6V7Z' fill='currentColor'></path>
  </svg>
)
export default XAxisCenterIcon
