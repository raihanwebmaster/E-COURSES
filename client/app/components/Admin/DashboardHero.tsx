'use client'
import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader'

type Props = {}

const DashboardHero = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
        <DashboardHeader open={open} setOpen={setOpen} />
    </div>
  )
}

export default DashboardHero