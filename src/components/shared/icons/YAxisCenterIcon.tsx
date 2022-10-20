import { SVGProps } from 'react'

const YAxisCenterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke='currentColor'
    fill='none'
    stroke-width='0'
    viewBox='0 0 24 24'
    aria-hidden='true'
    focusable='false'
    height='18px'
    width='18px'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M13 9H17V15H13V9Z' fill='currentColor' fillOpacity='0.5'></path>
    <path d='M7 6H11V18H7V6Z' fill='currentColor'></path>
  </svg>
)
export default YAxisCenterIcon
