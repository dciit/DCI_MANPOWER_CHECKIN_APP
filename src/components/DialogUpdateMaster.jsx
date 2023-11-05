import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { ServiceGetMasterEquipment, ServiceUpdateMaster } from '../Service'
import { MenuItem, Select } from '@mui/material'

function DialogUpdateMaster(props) {
    const { open, close } = props;
    const [masters, setMasters] = useState([]);
    const [objId, setObjId] = useState();
    const [svg, setSvg] = useState('')
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        const master = await ServiceGetMasterEquipment();
        setMasters(master)
    }
    function UpdateMaster() {
        let update = ServiceUpdateMaster({
            objSvg: svg,
            objId: objId
        });
        console.log(update)
    }

    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'} >
            <DialogTitle>

            </DialogTitle>
            <DialogContent dividers>
                <div className='flex flex-col gap-3'>
                    <Select fullWidth value={objId} onChange={(e) => setObjId(e.target.value)}>
                        {
                            masters.map((item) => (
                                <MenuItem value={item.objId}>{item.objName} ({item.objId})</MenuItem>
                            ))
                        }
                    </Select>
                    <textarea className='w-full border-[1px]' rows={3} onChange={(e) => setSvg(e.target.value)}>

                    </textarea>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={() => UpdateMaster()}>บันทึก</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogUpdateMaster