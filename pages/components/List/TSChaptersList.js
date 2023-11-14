import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';
import CatTable from './Extra/CatTable';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Label from 'src/components/Label';
import Image from 'next/image';
import EditTSChaptersmodal from '../Edit/EditTSChaptersmodal'
import DeleteCatModal from '../Edit/DeleteCatModal'
import MYS from '../../../Styles/mystyle.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '../../../Data/config'
import Button from '@mui/material/Button';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ListIcon from '@mui/icons-material/List';
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,

    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';

function RecentOrders({ tsid }) {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [JWTtoken, setJWTtoken] = useState(true);
    const router = useRouter()
    useEffect(() => {
        const Tk = localStorage.getItem('Token');
        setJWTtoken(Tk)
        const handleSubmit = async () => {
            const sendUM = { tsid: tsid }
            const data = await fetch("/api/V3/List/TSChaptersList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.AllChapters)
                    setRetdata(parsed.ReqD.AllChapters)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    return (

        <>
            <Card>
                {!isLoading &&
                    <div>
                        {Retdata.map((item, index) => {
                            return <div className={MYS.ItemList} key={item._id}>
                                <div className={MYS.ItemListBox}>
                                   
                                    <div className={MYS.ItemListBoxB}>
                                        <h3>{index+1}. {item.title}</h3>
                                       
                                       
                                        <div style={{minHeight:'20px'}}>
                                            </div>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <EditTSChaptersmodal ProductData={item} Chapterid={tsid} />
                                            <div style={{ minWidth:'10px'}}></div>
                                            <div style={{ minWidth: '10px' }}></div>
                                            <Link href={`/TSPlayGround/${item._id}/${tsid}/${JWTtoken}`}>
                                                <Button size='small' variant="outlined" startIcon={<ListIcon />}>
                                                 Attempt now
                                                </Button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        }

                        )}
                      
                    </div>

                }
            </Card>

        </>
    );
}

export default RecentOrders;
