import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { API_ADD_LAYOUT } from '../Service'
import { useSelector } from 'react-redux'

function DialogAddLayout(props) {
    const { open, close } = props;
    const [layout, setLayout] = useState({
        "layoutCode": "",
        "layoutName": "",
        "layoutSubName": "",
        "factory": "",
        "line": "",
        "subLine": "",
        "layoutStatus": "ACTIVE",
        "updateBy": "",
    });
    useEffect(() => {
        if (open) {
            init();
        }
    }, [open]);
    async function init() {
        setLayout({ ...layout, updateBy: reducer?.code, layoutCode: reducer?.layout });
    }
    const reducer = useSelector(state => state.reducer);
    async function handleAddLayout() {
        // const insert = await API_ADD_LAYOUT(layout);
        console.log(layout)
    }
    return (
        <Dialog open={open} onClose={() => close(false)}>
            <DialogTitle>
                    {
                        JSON.stringify(reducer.layout)
                    }
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>Close</Button>
                <Button variant='contained' onClick={handleAddLayout}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddLayout