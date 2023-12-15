import { useState, useEffect, useContext } from 'react';
import MYS from '../../../Styles/mystyle.module.css'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import SetGoal from './Opration/SetGoal'
import GoalBox from 'src/components/UserDashboard/GoalBox';

const DbProfileCounter = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    return (
        <div className={MYS.DbProfileCounter}>
            <div className={MYS.GoalBoxProfilebox}>

                {Contextdata.Data.name
                    ?
                    <span>
                        <span style={{ fontSize: '25px' }}>👋</span>Hi, <span className={MYS.primaryColor}>{Contextdata.Data.name}</span>
                    </span>
                    :
                    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} width={100} animation="wave" />


                }

            </div>
            <GoalBox />
            <div className={MYS.GoalBox}>

            </div>
        </div>
    )
}

export default DbProfileCounter
