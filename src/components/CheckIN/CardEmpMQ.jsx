import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import React from 'react'

function CardEmpMQ(props) {
    const { listMQ } = props;
    return (
        <Card>
            <CardHeader title="MQ " className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent>
                {
                    listMQ?.length ? listMQ.map((mq, index) => {
                        return <>{mq.mqName} ({mq.mqCode})</>
                    }) : <div>ไม่พบข้อมูล MQ</div>
                }
            </CardContent>
        </Card>
    )
}

export default CardEmpMQ