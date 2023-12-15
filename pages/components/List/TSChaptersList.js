import React, { useState, useEffect, useContext } from 'react';

import Badge from '@mui/material/Badge';
import { useRouter } from 'next/router'


import MYS from '../../../Styles/mystyle.module.css'

import { FiChevronRight } from "react-icons/fi";
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Nodatafound from '../Extra/Nodatafound'
import Skeleton from '@mui/material/Skeleton';

import {
   
    styled,

    IconButton,
  
    useTheme,
 
} from '@mui/material';

function RecentOrders({ tsid }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [JWTtokenFinal, setJWTtokenFinal] = useState(Contextdata.JwtToken);
    const router = useRouter()
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        setTimeout(function () {
            GetData()
        }, 1000);
    }, [router.query])

    const Demodata = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 6
        }
    ]


    const GetData = async () => {
        const sendUM = { tsid: tsid, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Students/TSChaptersList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setRetdata(parsed.ReqD.AllChapters)
                setIsLoading(false)
            })
    }

    const theme = useTheme();

    return (

        <div>


            {isLoading &&
                <div className={MYS.Titleboxitem}>

                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} animation="wave" />
                </div>
            }
            {!isLoading &&
                <div className={MYS.Titleboxitem}>

                    Chpaters  ({Retdata.length})
                </div>
            }

            {isLoading &&
                <div>
                    {Demodata.map((item, index) => {
                        return <div className={MYS.ChapterlistItem} key={index} >
                            <div className={MYS.ChapterlistItemA}>
                                <h3> <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200} animation="wave" /></h3>
                                <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={50} animation="wave" />
                            </div>
                            <div className={MYS.ChapterlistItemB}>
                                <Skeleton variant="rectangular" width={70} height={20} animation="wave" />
                            </div>

                        </div>
                    }
                    )}
                </div>
            }
            {!isLoading &&
                <div>
                    {Retdata.length == 0 &&
                        <Nodatafound
                            Title={'No Study material or Pdf Notes Found'}
                            Desc={'We will be add Study Material Soon Please Stay tuned and try after some time '}

                        />
                    }
                    {Retdata.length > 0 &&
                        <div>
                            {Retdata.map((item, index) => {
                                return <div className={MYS.ChapterlistItem} key={item._id} onClick={() => router.push(`/TSPlayGround/${item._id}/${tsid}/${JWTtokenFinal}`)}>
                                    <div className={MYS.ChapterlistItemA}>
                                        <h3>{index + 1}. {item.title}</h3>

                                    </div>

                                    <div className={MYS.ChapterlistItemB}>

                                        <IconButton aria-label="cart" onClick={() => router.push(`/TSPlayGround/${item._id}/${tsid}/${JWTtokenFinal}`)}>
                                            <StyledBadge color="secondary" >
                                                <FiChevronRight />
                                            </StyledBadge>
                                        </IconButton>


                                    </div>

                                </div>
                            }

                            )}
                        </div>
                    }


                </div>

            }

        </div>
    );
}

export default RecentOrders;
