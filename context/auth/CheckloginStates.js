import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CryptoJSKEY } from '../../Data/config'

import CryptoJS from "crypto-js";
const CheckloginStates = (props) => {
    const [Data, setData] = useState({});
    const [IsLogin, setIsLogin] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [ProfileDone, setProfileDone] = useState(0);
    const router = useRouter()

    useEffect(() => {
        // check login
        try {
            if (localStorage.getItem('Token')) {
                setIsLogin(true)
                try {
                    if (localStorage.getItem('Token')) {
                        setIsLogin(true)
                        const JwtToken = localStorage.getItem('Token');
                        const sendUser = { JwtToken }

                        const data = fetch("/api/V2/auth/Checklogin", {
                            method: "POST",
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(sendUser)
                        }).then((a) => {
                            return a.json();
                        })
                            .then((parsedUser) => {

                                if (parsedUser.ReqS == true) {

                                    const NTok = parsedUser.RetD;
                                    decryptData(NTok)

                                } else {
                                    setIsLogin(false)
                                    localStorage.clear()
                                }

                            })
                    } else {
                        setIsLogin(false)
                    }
                } catch (error) {
                    console.error(error)

                }
                
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            console.error(error)
            
        }
      

    }, []);



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
    const ChangeCurrentQuestion = (e) => {
        setCurrentQuestion(e)
    };

    return (
        <CheckloginContext.Provider value={{ Data, IsLogin, ProfileDone, currentQuestion, ChangeCurrentQuestion }}>
            {props.children}
        </CheckloginContext.Provider>
    )

}
export default CheckloginStates;