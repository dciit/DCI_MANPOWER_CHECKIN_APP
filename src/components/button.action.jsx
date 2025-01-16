import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Grid } from '@mui/material';
import DialogCertCheck from './dialog.cert.check';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
function ComponentButtonAction() {
    let login = useSelector(state => state.reducer.login);
    let VITE_PATH = import.meta.env.VITE_PATH;
    const [openDialogCheckCert, setOpenDialogCheckCert] = useState(false);
    return (
        <>
            <Grid item xs={12}>
                <div className="flex items-center px-[24px] py-[16px] gap-6">
                    <span className="text-[1.5em] font-bold text-[#484f57]" style={{ letterSpacing: '1px' }}>MANPOWER CHECK-IN</span>
                    <div className='flex gap-2'>
                        {
                            login && <Button type='primary' icon={<HomeOutlined />} onClick={() => window.open(`../../${VITE_PATH}/management`, '_blank')}>หน้าหลัก</Button>
                        }
                        {
                            login && <Button type='primary' icon={<SettingOutlined />} onClick={() => window.open(`../../${VITE_PATH}/edit`, '_blank')}>จัดการพื้นที่</Button>
                        }
                    </div>
                </div>
            </Grid>
            <DialogCertCheck open={openDialogCheckCert} close={setOpenDialogCheckCert} />
        </>
    )
}

export default ComponentButtonAction