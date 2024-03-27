import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Grid } from '@mui/material';
import DialogCertCheck from './dialog.cert.check';
import { useSelector } from 'react-redux';
function ComponentButtonAction() {
    let login = useSelector(state => state.reducer.login);
    let VITE_PATH = import.meta.env.VITE_PATH;
    const [openDialogCheckCert, setOpenDialogCheckCert] = useState(false);
    return (
        <>
            <Grid item xs={12}>
                <div className="flex items-center px-[24px] py-[16px] gap-6">
                    <span className="text-[1.5em] font-bold text-[#484f57]" style={{ letterSpacing: '1px' }}>MANPOWER CHECK-IN</span>
                    {
                        login && <Button size="small" variant="contained" startIcon={<HomeIcon />} onClick={() => window.open(`../../${VITE_PATH}/management`, '_blank')}>ระบบหลังบ้าน</Button>
                    }
                    <Button size="small" variant="contained" startIcon={<SearchIcon />} onClick={() => setOpenDialogCheckCert(true)}>ตรวจสอบ MQ,SA</Button>
                </div>
            </Grid>
            <DialogCertCheck open={openDialogCheckCert} close={setOpenDialogCheckCert} />
        </>
    )
}

export default ComponentButtonAction