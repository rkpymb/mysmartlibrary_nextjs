import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CryptoJSKEY } from '../../Data/config'

import CryptoJS from "crypto-js";
const CheckloginStates = (props) => {
    const [Data, setData] = useState({});
    const [IsLogin, setIsLogin] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [JwtToken, setJwtToken] = useState(null);
    const [ProfileDone, setProfileDone] = useState(0);
    const [MainTitle, setMainTitle] = useState();
    const [NotiTitle, setNotiTitle] = useState('');
    const [NotiDesc, setNotiDesc] = useState('');
    const [NotiShow, setNotiShow] = useState(false);


    const [MainCat, setMainCat] = useState({});
    const [GoalStatus, setGoalStatus] = useState(false);

    const router = useRouter()

    useEffect(() => {
        setMainTitle('Study Dashboard')
        if (localStorage.getItem('Token')) {
            setIsLogin(true)
            const JwtTokenx = localStorage.getItem('Token');
            setJwtToken(JwtTokenx)
            const sendUser = { JwtToken: JwtTokenx }
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
                        alert('Something went wrong, Please Login again')
                        setIsLogin(false)
                        localStorage.clear()
                    }

                })
        } else {
            setIsLogin(false)
        }


        const mainCatValue = localStorage.getItem('MainCat');
        if (!mainCatValue || mainCatValue.trim() === '') {
            setGoalStatus(false)

        }
        if (localStorage.getItem('MainCat')) {
            const McatData = localStorage.getItem('MainCat');
            if (McatData) {
                const DataObject = JSON.parse(McatData);
                const Final  = Object.keys(DataObject)
                setMainCat(DataObject[0]);
                setGoalStatus(true)
            }else{
                setGoalStatus(false)
            }

        }



    }, [router.query]);





    const decryptData = (e) => {
        const bytes = CryptoJS.AES.decrypt(e, CryptoJSKEY);
        const dataNew = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(dataNew.isActive)
        setData(dataNew)
        CheckisProfileComplete(dataNew)
    };
    const CheckisProfileComplete = (UserD) => {
        if (UserD.email == '') {


        }
    };
    const ChangeCurrentQuestion = (e) => {
        setCurrentQuestion(e)
    };
    const ChangeMainTitle = (e) => {
        setMainTitle(e)
    };
  

    return (
        <CheckloginContext.Provider value={{ Data, IsLogin, ProfileDone, currentQuestion, ChangeCurrentQuestion, JwtToken, MainTitle, ChangeMainTitle, NotiShow, NotiDesc, NotiTitle, MainCat, GoalStatus }}>
            {props.children}
        </CheckloginContext.Provider>
    )

}
export default CheckloginStates;