import React, {FC} from 'react'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void
    activeItem: number
}

const Header:FC<Props> = (props) => {
  return (
    <div>Header</div>
  )
}

export default Header