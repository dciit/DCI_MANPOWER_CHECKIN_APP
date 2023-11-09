import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import React from 'react'

function CardEmpSA(props) {
    const { listSA } = props;
    return (
        <Card>
            <CardHeader title="SA " className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent>
                {
                    listSA?.length ? listSA.map((sa, index) => {
                        return <>{sa.saName} ({sa.mqCode})</>
                    }) : <div>ไม่พบข้อมูล SA</div>
                }
            </CardContent>
        </Card>
    )
}

export default CardEmpSA