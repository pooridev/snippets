import { SVGProps } from 'react'

const LeftAlignIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d='M8 13H14V17H8V13Z' fill='currentColor' fill-opacity='0.5'></path>
    <path d='M6 6H4V18H6V6Z' fill='currentColor'></path>
    <path d='M20 7H8V11H20V7Z' fill='currentColor'></path>
  </svg>
)
export default LeftAlignIcon
