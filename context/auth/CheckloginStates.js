import CheckloginContext from './CheckloginContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const CheckloginStates = (props) => {
    const [Data, setData] = useState({});
    const [IsLogin, setIsLogin] = useState(false);

    const [JwtToken, setJwtToken] = useState(null);
    const [PayGatway, setPayGatway] = useState(null);
    const [WebData, setWebData] = useState(null);
    const [WebSettings, setWebSettings] = useState(null);
    const [MainLoaderData, setMainLoaderData] = useState({
        Title: '',
        Msg: '',
    });

    const [ProfileDone, setProfileDone] = useState(0);

    const [MapRadius, setMapRadius] = useState(5000000);
    const [LocationData, setLocationData] = useState(null);
    const [MainLoader, setMainLoader] = useState(true);
    const [UserBranchData, setUserBranchData] = useState(null);

    const router = useRouter()


    useEffect(() => {
        CheckLocation()

        CheckUSerLogin()

    }, [router.query]);

    const CheckUSerLogin = async () => {


        try {
            const token = getCookie('jwt_token');

            if (token) {
                setJwtToken(token)
                const sendUM = {  };
                const data = await fetch("/api/V2/auth/CheckAuth", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(sendUM)
                });
                const parsedFinal = await data.json();

                if (parsedFinal.RetD.UserData) {
                    setData(parsedFinal.RetD.UserData);

                    setIsLogin(true);
                } else {
                  
                }
            } 
        } catch (error) {
            setIsLogin(false);
        }
    };


    const ChnageUserBranchData = async (e) => {
        setUserBranchData(e)

    }
    const ChnagePayGatway = async (e) => {
        setPayGatway(e)

    }

    const ChangeWebData = async (e) => {
        setWebData(e)

    }
    const ChangeWebSettings = async (e) => {
        setWebSettings(e)

    }



    const ChangeLocationData = async (e) => {

        setLocationData(e)
    }
    const ChangeMapRadius = async (e) => {

        setMapRadius(e)
    }


    const CheckLocation = async () => {
        try {
            if (localStorage.getItem('UBranchData')) {
                const UBranchDataD = localStorage.getItem('UBranchData');
                setUserBranchData(JSON.parse(UBranchDataD))
                
            }
        } catch (error) {
            console.log(error)
        }
    };


    // Function to get cookie by name
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    };

    // Function to remove cookie by name
    const removeCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };
    const ChangeMainLoader = async (e) => {
        setMainLoader(e)
    }
    const ChangeMainLoaderData = async (e) => {
        setMainLoaderData(e)
    }
    return (
        <CheckloginContext.Provider value={{ Data, IsLogin, ProfileDone, JwtToken, ChangeLocationData, LocationData, MapRadius, ChangeMapRadius, UserBranchData, ChnageUserBranchData, WebData, ChangeWebData,ChangeWebSettings, ChangeMainLoader, MainLoader, MainLoaderData, ChangeMainLoaderData, ChnagePayGatway, PayGatway,CheckUSerLogin,WebSettings }}>
            {props.children}
        </CheckloginContext.Provider>
    )

}
export default CheckloginStates;