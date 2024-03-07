import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, CardContent, CircularProgress, Stack, Tab, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_GET_LAYOUT, API_GET_LIST_ANDONBOARD } from '../Service';
import SearchIcon from '@mui/icons-material/Search';
function Efficiency() {
    const [value, setValue] = useState(1);
    const [once, setOnce] = useState(true);
    const [loading, setLoading] = useState(true);
    const [layouts, setLayout] = useState([]);
    const [listAndonBoard, setListAndonBoard] = useState([]);
    const [boardId, setBoardId] = useState('');
    const [url, setUrl] = useState('');
    const pathAndonBoard = 'http://dciweb.dci.daikin.co.jp/lineeff/RealtimeEff.aspx?Board=';
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (once) {
            init();
            setOnce(false);
        }
        if (Object.keys(layouts).length) {
            setLoading(false);
        }
    }, [once, layouts]);

    async function init() {
        let resListAndonBoard = await API_GET_LIST_ANDONBOARD();
        setListAndonBoard(resListAndonBoard);

        let res = await API_GET_LAYOUT();
        res = res.filter(o => o.layoutName != 'TEST' && o.boardId != '' && o.boardId != null);
        setLayout(res);
        if (url == '' && res.length) {
            console.log(res)
            let firstBoard = res[0];
            let boardFirst = firstBoard.boardId.split(';');
            if (boardFirst.length) {
                let boardIdFirst = boardFirst[0];
                firstBoard = boardFirst[0];
                let boardInfoFirst = resListAndonBoard.filter(o=>o.boardId == boardIdFirst);
                setUrl(`${pathAndonBoard}${boardIdFirst}`);
                setBoardId(boardInfoFirst[0])
            }
        }
    }
    async function handleSelectBoard(boardId) {
        setUrl(`${pathAndonBoard}${boardId}`);
        let boardInfo = listAndonBoard.filter(o => o.boardId == boardId);
        if (boardInfo?.length) {
            setBoardId(boardInfo[0]);
        }
    }
    return (
        <div className='p-[24px]'>
            {
                loading ? <div className='flex items-center flex-col gap-1'>
                    <Typography>กำลังโหลดข้อมูล</Typography>
                    <CircularProgress />
                </div> :
                    <Stack>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    {
                                        layouts.map((oLayout, iLayout) => {
                                            return <Tab label={oLayout.layoutName} value={(iLayout + 1)} key={iLayout} />
                                        })
                                    }
                                </TabList>
                            </Box>
                            {
                                layouts.map((oLayout, iLayout) => {
                                    let rBoardId = oLayout.boardId.split(';');
                                    return <TabPanel value={(iLayout + 1)} key={iLayout} className='gap-2' >
                                        <Typography>{oLayout.layoutCode}</Typography>
                                        <Stack direction={'row'} gap={2}>
                                            {
                                                rBoardId.map((oBoard, iBoard) => {
                                                    let boardInfo = listAndonBoard.filter((o => o.boardId == oBoard));
                                                    if (boardInfo.length) {
                                                        // 556ee594 
                                                        return <div className={`${boardInfo[0].boardId == boardId?.boardId ? 'bg-[#556ee5]' : 'bg-[#556ee594]'} text-white rounded-lg pl-4 pr-3 transition-all duration-300 hover:scale-105 py-1 cursor-pointer shadow-lg`} key={iBoard} onClick={() => handleSelectBoard(oBoard)}>{boardInfo[0].pdName} ({oBoard}) <SearchIcon /></div>
                                                    } else {
                                                        return <div className={`bg-[#556ee5] text-white rounded-lg pl-4 pr-3 transition-all duration-300 hover:scale-105 py-1 cursor-pointer shadow-lg`} key={iBoard} onClick={() => handleSelectBoard(oBoard)}>{oBoard} <SearchIcon /></div>
                                                    }
                                                })
                                            }
                                        </Stack>
                                    </TabPanel>
                                })
                            }
                        </TabContext>
                        <Card>
                            <CardContent className='flex flex-col gap-3'>
                                <Typography variant='h3' className='text-[#556ee5] font-semibold'>{boardId?.pdName} ({boardId?.boardId})</Typography>
                                <iframe src={url} title="description" className='h-screen w-[100%]'></iframe>
                            </CardContent>
                        </Card>
                    </Stack>
            }
        </div>
    )
}

export default Efficiency