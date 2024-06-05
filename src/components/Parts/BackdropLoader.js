import { useState, useEffect, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'
export default function SimpleBackdrop() {
    const router = useRouter()
    const [open, setOpen] = useState(true);
    const Contextdata = useContext(CheckloginContext)

  

    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={Contextdata.MainLoader}

            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="inherit" />
                    <div style={{ textAlign: 'center', margin: 10 }}>
                        <div><h3>{Contextdata.MainLoaderData.Title}</h3></div>
                        <div>{Contextdata.MainLoaderData.Msg}</div>
                    </div>
                </div>


            </Backdrop>
        </div>
    );
}
