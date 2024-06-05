import React from 'react'
import { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'
const WebsiteData = () => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()

    useEffect(() => {
        console.log(router.query.sites)
     
       const webid  =router.query.sites
        if (Contextdata.WebData) {
            console.log('Contextdata.WebData available')

        } else {
            console.log('Contextdata.WebData not available')
            GetData(webid)

        }
       

    }, [Contextdata.WebData,router.query]);

    const GetData = async (e) => {
       
        
        const sendUM = { webid: e }
        const data = await fetch("/api/V3/auth/WebsiteData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedFinal) => {
                if (parsedFinal.ReqD.WebData) {
                    Contextdata.ChangeWebData(parsedFinal.ReqD.WebData)
                }
            })

    }
    return (
        <>

        </>
    )
}

export default WebsiteData
