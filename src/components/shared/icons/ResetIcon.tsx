import { SVGProps } from 'react'

const ResetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke='currentColor'
    fill='currentColor'
    strokeWidth='0'
    viewBox='0 0 24 24'
    aria-hidden='true'
    focusable='false'
    height='1em'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill='none'
      stroke='#000'
      strokeWidth='2'
      d='M8,3 L3,8 L8,13 M12,20 L15,20 C18.3137085,20 21,17.3137085 21,14 C21,10.6862915 18.3137085,8 15,8 L4,8'
    ></path>
  </svg>
)
export default ResetIcon
