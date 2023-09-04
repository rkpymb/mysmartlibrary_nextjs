import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CryptoJSKEY } from '../../Data/config'
import CryptoJS from "crypto-js";
const CheckloginStates = (props) => {
    const [Data, setData] = useState({});
    const [IsLogin, setIsLogin] = useState(false);
    const router = useRouter()

    useEffect(() => {
        // check login
        try {
            if (localStorage.getItem('userid')) {
                setIsLogin(true)
                const usermobile = localStorage.getItem('userid');
                const sendUser = { usermobile }
                const data = fetch("/api/UserProfileData", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(sendUser)
                }).then((a) => {
                    return a.json();
                })
                    .then((parsedUser) => {
                        if (parsedUser.usertype == true) {
                            // console.log(parsedUser.token)
                            const NTok = parsedUser.token;
                            decryptData(NTok)
                           
                        } else {
                            setIsLogin(false)
                            // localStorage.clear()
                        }

                    })
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
        
         setData(dataNew.data)
    };

    return (
        <CheckloginContext.Provider value={{ Data, IsLogin }}>
            {props.children}
        </CheckloginContext.Provider>
    )

}
export default CheckloginStates;