import React from 'react'
import { Button, Typography } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import { Link } from 'react-router-dom'

const InvalidRoutePage = () => {
  return (
    <div
      style={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>This page is under construction</Typography>
      <Link to="/">
        <Button variant="contained" color="secondary" endIcon={<WarningIcon />}>
          Back Home
        </Button>
      </Link>
    </div>
  )
}

export default InvalidRoutePage
