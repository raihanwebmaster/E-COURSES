import { Box, Modal } from '@mui/material'
import React, { Component, ComponentProps, FC } from 'react'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void
    activeItem: number,
    route: string,
    component: React.ComponentType<ComponentProps<any>>;
    setRoute?: (route: string) => void

}

const CustomModal: FC<Props> = ({ open, setOpen, activeItem, route, component:Component, setRoute }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none ' >
                <Component setOpen={setOpen} open={open} />
            </Box>
        </Modal>
    )
}

export default CustomModal