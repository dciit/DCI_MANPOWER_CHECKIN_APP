import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Grid, Stack, Typography } from '@mui/material'

function DialogCertCheck(prop) {
  const { open, close } = prop;
  const ItemDetailEmpCode = ({ title = '', value = '' }) => {
    return <Stack>
      <Typography variant='caption'>{title}</Typography>
      <Typography className='pl-6'>{value}</Typography>
    </Stack>
  }
  return (
    <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'md'}>
      <DialogTitle >
        ตรวจสอบ (MQ,SA) ของพนักงาน
      </DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={6}>
            image
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <ItemDetailEmpCode title='ชื่อ'  value = '1'/>
              <ItemDetailEmpCode title='ตำแหน่ง'  value = '2'/>
              <ItemDetailEmpCode title='อายุ'  value = '3'/>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close(false)} variant='outlined'>Close</Button>
      </DialogActions>
    </Dialog >
  )
}

export default DialogCertCheck