import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';
import CatTable from './Extra/CatTable';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Label from 'src/components/Label';
import Image from 'next/image';
import EditTSmodal from '../Edit/EditTSmodal'
import DeleteCatModal from '../Edit/DeleteCatModal'
import MYS from '../../../Styles/mystyle.module.css'
import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'
import Button from '@mui/material/Button';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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

function RecentOrders() {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
   

    useEffect(() => {
        // check login
        try {
            if (localStorage.getItem('Token')) {
                setIsLoading(true)
                try {
                    if (localStorage.getItem('Token')) {
                        setIsLoading(true)
                        const JwtToken = localStorage.getItem('Token');
                        const sendUser = { JwtToken }
                        const data = fetch("/api/V3/Students/MyTSlist", {
                            method: "POST",
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(sendUser)
                        }).then((a) => {
                            return a.json();
                        })
                            .then((parsedUser) => {
                                setRetdata(parsedUser.ReqData)
                                setIsLoading(false)
                                console.log(parsedUser.ReqData)

                            })
                    } else {
                        setIsLoading(false)
                    }
                } catch (error) {
                    console.error(error)

                }

            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)

        }


    }, [router.query]);
    const theme = useTheme();

    return (

        <>
            <Card>
                {!isLoading &&
                    <div>
                        {Retdata.map((item) => {
                            return <div className={MYS.ItemList} key={item._id}>
                                <div className={MYS.ItemListBox}>
                                    <div className={MYS.ItemListBoxA}>
                                        <Image
                                            src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${item.img}`}
                                            width={250}
                                            height={150}
                                            
                                            alt='img'

                                        />
                                    </div>
                                    <div className={MYS.ItemListBoxB}>
                                        <h3>{item.title}</h3>
                                        <span>{item.pid}</span>
                                        
                                        <div>
                                            <span>Valid till : {item.validityEndDate}</span>
                                        </div>
                                        <div>
                                            <span>{item.StatusText}</span>
                                        </div>
                                       
                                        <div style={{ minHeight: '30px' }}></div>
                                        <Link href={`/TSChapters/${item.pid}`} >
                                            <Button size='small' variant="outlined" startIcon={<ViewStreamIcon />}>
                                                Chapters
                                            </Button>
                                        </Link>
                                       
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
