import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';
import CatTable from './Extra/CatTable';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Label from 'src/components/Label';
import Image from 'next/image';
import EditCatModal from '../Edit/EditCatModal'
import Mstyles from '../../../Styles/home.module.css';
import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'

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
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/V3/List/CatList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD.categories)
                    setRetdata(parsed.ReqD.categories)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    return (<>
        {!isLoading &&
            <div className={Mstyles.CatGrid}>

                {Retdata.map((item) => {
                    return <Link href={`/Category/${item.slug}`} key={item.id} style={{ textDecoration: 'none' }}>
                        <div className={Mstyles.CatGridItem}>
                            <div className={Mstyles.CatGridItemA}>
                                <Image 
                                    src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${item.image}`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={50}
                                    height={50}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                            <div className={Mstyles.CatGridItemB}>
                                <span>{item.name}</span>
                            </div>

                         

                        </div>
                    </Link>
                }

                )}
            </div>

        }

        </>
    );
}

export default RecentOrders;
