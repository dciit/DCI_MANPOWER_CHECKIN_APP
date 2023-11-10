import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

function DialogAddSA(props) {
    const { open, close } = props;
    return (
        <Dialog open={open} onClose={() => close(false)}>
            <DialogTitle>
                <Typography>Add SA Rquired</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    asdadad
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>Close</Button>
                <Button variant='contained'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddSA