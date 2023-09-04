import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CryptoJSKEY } from '../../Data/config'

import CryptoJS from "crypto-js";
const CheckloginStates = (props) => {
    const [Data, setData] = useState({});
    const [IsLogin, setIsLogin] = useState(false);
    const [ProfileDone, setProfileDone] = useState(false);
  
    const router = useRouter()

    useEffect(() => {
        // check login
        try {
            if (localStorage.getItem('userid')) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            console.error(error)
            
        }
      

    }, [router.query]);



    const decryptData = (e) => {
        const bytes = CryptoJS.AES.decrypt(e, CryptoJSKEY);
        const dataNew = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
       
        setData(dataNew)
        CheckisProfileComplete(dataNew)
        
    };
    const CheckisProfileComplete = (UserD) => {
        if (UserD.email == '') {
            setProfileDone(true)
            
        }
    };

    return (
        <CheckloginContext.Provider value={{ Data, IsLogin, ProfileDone }}>
            {props.children}
        </CheckloginContext.Provider>
    )

}
export default CheckloginStates;