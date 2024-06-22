import React, { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/library.module.css'
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'


const FooterMenu1 = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);
    const [Pagelist, setPagelist] = useState([]);
    useEffect(() => {
        if (Contextdata.WebData) {

            GetData(Contextdata.WebData.webid)
        }
    }, [Contextdata.WebData]);


    const GetData = async (e) => {
        const sendUM = { webid: e }
        const data = await fetch("/api/V3/List/webite_pages", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedFinal) => {

                if (parsedFinal.ReqD && parsedFinal.ReqD.WebPages) {
                   
                    setPagelist(parsedFinal.ReqD.WebPages)
                    setLoading(false);

                }

            })

    }
    return (
        <div>
            {!Loading &&

                <div>
                    {Pagelist.length > 0 &&
                        <div>
                            <div className={Mstyles.menuurlfGrid}>
                                {Pagelist.map((item, index) => {
                                    return <div key={index} className={Mstyles.menuurlf} onClick={() => router.push(`/${Contextdata.WebData.WebData.webid}/p/${item.PageSlug}`)}>
                                        <span>{item.PageTitle}</span>
                                    </div>
                                }
                                )}
                            </div>

                        </div>
                    }


                </div>


            }

        </div>
    )
}

export default FooterMenu1
