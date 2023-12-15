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
        <div>
            <div className={MYS.GoalBox}>
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
                <div className={MYS.OnlyMobile}>
                    <div style={{ minHeight: '5px' }}></div>

                </div>
                <div className={MYS.GoalBoxGroup}>
                    <div className={MYS.GoalBoxGroupA}>
                        <div className={MYS.targetimg}>
                            <Image
                                src={`/img/target.png`}
                                alt="image"
                                layout="responsive"
                                placeholder='blur'
                                width={50}
                                height={50}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />
                        </div>

                        <div className={MYS.targetText}>
                            {Contextdata.GoalStatus ?
                                <div>
                                    <div className={MYS.OnlyDesktop}>
                                        <span>{Contextdata.GoalStatus && Contextdata.MainCat.name}</span>
                                    </div>

                                    <div className={MYS.OnlyMobile}>

                                        <span>{Contextdata.GoalStatus && Contextdata.MainCat.name.slice(0, 20)}</span>
                                    </div>
                                </div> :
                                <div>
                                    <span>Set Your Goal</span>
                                </div>


                            }

                        </div>

                    </div>

                    <div className={MYS.GoalBoxGroupB}>
                        <SetGoal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DbProfileCounter
