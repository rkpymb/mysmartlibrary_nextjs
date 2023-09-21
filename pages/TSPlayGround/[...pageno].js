import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CircularProgress from '@mui/material/CircularProgress';

import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';
import NavbarPG from '../../src/components/Parts/NavbarPG'

import crypto from 'crypto';
import { MYKEY } from '../../Data/config'
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'

export async function getServerSideProps(context) {
    const ChapterID = context.query.pageno[0];
    const slug = context.query.pageno[1];
    const JWTtoken = context.query.pageno[2];
    // console.log(JWTtoken)

    const headers = {
        Authorization: `Bearer ${JWTtoken}`,
        'Content-Type': 'application/json', // Set the content type for your request
    };
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({ slug: slug, Chapterid: ChapterID, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}student/getcTSANDCHAPTERbyid`, requestOptions);
    const CourseFullData = await response.json();

    return {

        props: { CourseFullData, ChapterID, slug, JWTtoken }, // will be passed to the page component as props
    }

}

const HeaderWrapper = styled(Card)(
    ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview({ CourseFullData, ChapterID, JWTtoken, slug }) {

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [cart, setCart] = useState({});
    const [Loading, setLoading] = useState(true);
    const [LoadingBTN, setLoadingBTN] = useState(false);
    const [QuesBox, setQuesBox] = useState(false);
    const [LoadQues, setLoadQues] = useState(false);
    const [TSData, setTSData] = useState();
    const [TotalQues, setTotalQues] = useState(0);
    const [TotalMarks, setTotalMarks] = useState(0);
    const [ChapterData, setChapterData] = useState();
    const [OptionCounter, setOptionCounter] = useState(0);
    const [QuesList, setQuesList] = useState();
    const [AttemptID, setAttemptID] = useState('');
    const Contextdata = useContext(CheckloginContext)
    const [Securesdlist, setSecuresdlist] = useState('');
    const [QList, setQList] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [AttemtedQuestion, setAttemtedQuestion] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [AttNumber, setAttNumber] = useState(1);

    const [updatedQuestions, setUpdatedQuestions] = useState();

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeRemaining]);

    const seconds = timeRemaining % 60;
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const hours = Math.floor(timeRemaining / 3600);

    useEffect(() => {

        if (Contextdata.IsLogin == true) {

            try {
                if (localStorage.getItem('Token')) {

                    try {
                        if (localStorage.getItem('Token')) {

                            const JwtToken = localStorage.getItem('Token');
                            const sendUser = { JwtToken: JwtToken, Chapterid: ChapterID, slug: slug }
                            const data = fetch("/api/V3/Students/QuesLists", {
                                method: "POST",
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify(sendUser)
                            }).then((a) => {
                                return a.json();
                            })
                                .then((parsedQL) => {

                                    if (parsedQL.ReqS == true) {
                                        setSecuresdlist(parsedQL.RetData)
                                        const encryptedData = parsedQL.RetData


                                        // Decrypt the data using AES decryption
                                        const decipher = crypto.createDecipher('aes-256-cbc', MYKEY);
                                        let decryptedMessage = decipher.update(encryptedData, 'hex', 'utf8');
                                        decryptedMessage += decipher.final('utf8');
                                        const QLwithOPS = JSON.parse(decryptedMessage)

                                        setQList(QLwithOPS)
                                        setUpdatedQuestions(QLwithOPS)
                                        setLoading(false)
                                        setLoadQues(true)


                                    }

                                })
                        } else {

                        }
                    } catch (error) {
                        console.error(error)

                    }

                } else {

                }
            } catch (error) {
                console.error(error)

            }


            setTSData(CourseFullData.TSData)
            setChapterData(CourseFullData.ChapterData)
            setTotalQues(CourseFullData.TotalQues)
            setTotalMarks(CourseFullData.TotalMarks)


        } else {
            router.push('/Login')
        }
        // check login



    }, [router.query]);


    const CreateAtempt = async () => {
        if (Contextdata.IsLogin == true) {
            try {
                if (localStorage.getItem('Token')) {
                    setLoadingBTN(true)
                    const Chid = ChapterID;
                    const Tsid = slug;
                    const Status = 1;
                    const IsActive = true;
                    const StatusText = 'Created';
                    const takenTime = '0';
                    const takenTimeSec = '0';
                    const TotalMarks = '0';
                    const JwtToken = localStorage.getItem('Token');
                    const sendUser = { JwtToken: JwtToken, Chid: Chid, Tsid: Tsid, Status: Status, IsActive: IsActive, StatusText: StatusText, takenTime: takenTime, takenTimeSec: takenTimeSec, TotalMarks: TotalMarks, ChTitle: ChapterData.title, TsTitle: TSData.title }
                    const data = fetch("/api/V3/Students/CreateAtempt", {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(sendUser)
                    }).then((a) => {
                        return a.json();
                    })
                        .then((parsedAtback) => {
                            if (parsedAtback.ReqS == true) {
                                setTimeout(function () {
                                    console.log(QList)
                                    setAttemptID(parsedAtback.RetData.TsAtemptSData._id)
                                    console.log(parsedAtback.RetData.TsAtemptSData._id)
                                    setLoadingBTN(false)
                                    setQuesBox(true)
                                    StartTimer()
                                }, 1000);



                            } else {
                                alert('Something Wnt Wrong, Try again')
                            }
                        })
                } else {

                }
            } catch (error) {
                console.error(error)

            }


        } else {
            router.push('/Login')
        }

    }
    const HandleOptionindex = async (e, b) => {
        if (b !== currentQuestion) {
            setCurrentQuestion(b) 
        } 
    }


    const SubmitAtempt = async () => {
        if (Contextdata.IsLogin == true) {
            if (AttemptID !== '') {
                try {
                    if (localStorage.getItem('Token')) {
                        setLoadingBTN(true)
                        const Chid = ChapterID;
                        const Tsid = slug;
                       
                        const Status = 1;
                        const IsActive = true;
                        const StatusText = 'Created';
                        const takenTime = '0';
                        const takenTimeSec = '0';
                        const TotalMarks = '0';
                        // const studentsData = [
                        //     { namex: 'Student 1', contactInfo: 'Email1@example.com' },
                           
                        //     // Add more student objects as needed
                        // ];

                        const JwtToken = localStorage.getItem('Token');
                        const sendUser = { JwtToken: JwtToken, Chid: Chid, Atid: AttemptID, Tsid: Tsid, Status: Status, IsActive: IsActive, StatusText: StatusText, takenTime: takenTime, takenTimeSec: takenTimeSec, TotalMarks: TotalMarks, SubmitData: updatedQuestions, ChTitle: ChapterData.title, TsTitle: TSData.title }
                        const data = fetch("/api/V3/Students/SubmitAtempt", {
                            method: "POST",
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(sendUser)
                        }).then((a) => {
                            return a.json();
                        })
                            .then((parsedAtback) => {
                                if (parsedAtback.RetData.RetStatus == true) {
                                    router.push(`/TSattempt/${parsedAtback.RetData.SubmitID}`)
                                } else {
                                    setLoadingBTN(false)
                                    alert('Something Went Wrong, try again')
                               }
                               
                            })
                    } else {

                    }
                } catch (error) {
                    console.error(error)

                }
            } else {
                alert('Something Wnt Wrong, Try again')
            }
            


        } else {
            router.push('/Login')
        }

    }

    const StartTimer = async () => {
        function convertMinutesToSeconds(minutes) {
            return minutes * 60;
        }
        const minutes = CourseFullData.ChapterData.duration;
        const seconds = convertMinutesToSeconds(minutes);
        setTimeRemaining(seconds)
    }


   
   

    function updateOption(questionIndex, optionIndex) {
        const updatedQuestionsCopy = [...updatedQuestions];
        // Update the selected option within the same question
        updatedQuestionsCopy[questionIndex].options = updatedQuestionsCopy[questionIndex].options.map((option, oIndex) => {
            if (oIndex === optionIndex) {
                return { ...option, IsS: true };
            } else {
                return { ...option, IsS: false };
            }
        });
        setUpdatedQuestions(updatedQuestionsCopy);
        markQuestionAsAttempted(questionIndex, updatedQuestionsCopy)
      
        

    }

    function markQuestionAsAttempted(questionIndex, data) {
        const updatedQuestionsCopy = [...data];

        // Set the isAttempted key to true for the selected question
        updatedQuestionsCopy[questionIndex].isAtempted = true;

        setUpdatedQuestions(updatedQuestionsCopy);
      
    }




    const handleClick = (questionIndex, optionIndex) => {
       
        // setCurrentQuestion(b)
        // console.log(updatedQuestions)
        const newStatus = true; // Set the new status here
        updateOption(questionIndex, optionIndex, newStatus);
    }


    return (
        <OverviewWrapper>
            {!QuesBox &&
                <div>
                    <Head>
                        <title>Play Ground : {TSData && TSData.title}</title>
                    </Head>
                    <NavbarPG />
                    {!Loading &&
                        <div>
                            <div className={Mstyles.container}>
                                <div style={{ minHeight: '100px' }}></div>
                                <div className={Mstyles.Playground}>

                                    <div className={Mstyles.HeRoboxPGVATitle}>
                                        <h1>{ChapterData && ChapterData.title}</h1>
                                        <span>{TSData && TSData.title}</span>
                                    </div>
                                    <div className={Mstyles.HeRoboxPGVADetails}>
                                        <div>
                                            <span style={{ fontWeight: 'bold' }}>Instructions:</span>
                                        </div>
                                        <div>
                                            <span>{ChapterData && ChapterData.details}</span>
                                        </div>
                                    </div>
                                    <div className={Mstyles.PgCounter}>
                                        <div className={Mstyles.PgCounterItem}>
                                            <span>{TotalQues}</span>
                                            <small>Total Questions</small>
                                        </div>
                                        <div className={Mstyles.PgCounterItem}>
                                            <span>{TotalMarks}</span>
                                            <small>Total Marks</small>
                                        </div>
                                        <div className={Mstyles.PgCounterItem}>
                                            <span>{ChapterData && ChapterData.duration} min</span>
                                            <small>Total Time</small>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                    }




                    <div className={Mstyles.PlaygroundFooter}>


                        {!LoadingBTN &&
                            <div className={Mstyles.HeroBtn} style={{ minWidth: '300px' }} onClick={CreateAtempt}>
                                <span>Start Now</span>
                            </div>
                        }
                        {LoadingBTN &&
                            <CircularProgress />
                        }
                    </div>
                </div>
            }
            {QuesBox &&
                <div>
                    <Head>
                        <title>Test Started : {TSData && TSData.title}</title>
                    </Head>

                    {!Loading &&
                        <div>
                            <div className={Mstyles.navbarBoxPGplayMobile}>
                                <div className={Mstyles.navbarBoxPGplayMobileBox}>
                                    <Link href='/'>
                                        <div className={Mstyles.navbarBoxPGplayMobileBoxLogo}>
                                            <img src='/logo/logomain.png' alt='logo' className={Mstyles.NavLogo} />
                                        </div>
                                       
                                    </Link> 
                                
                                    <div className={Mstyles.blinkText}>
                                        <span>Test Started</span>

                                    </div>
                                   
                                </div>

                                <div className={Mstyles.HTextItemBox}>
                                    <div className={Mstyles.HTextItem}>
                                        Test series : {TSData && TSData.title}
                                    </div>
                                    <div className={Mstyles.HTextItem}>
                                        Chapter : {ChapterData && ChapterData.title}
                                    </div>
                                </div>
                            </div >

                            <div className={Mstyles.containerPlyGroundFlex}>
                                <div className={Mstyles.containerPlyGroundFlexA}>
                                    <div className={Mstyles.navbarBoxPGplay}>
                                        <div className={Mstyles.navbarBoxPGplayNavbar}>
                                            <div className={Mstyles.NavA}>
                                                <div className={Mstyles.logo}>
                                                    <Link href='/'>
                                                        <div className={Mstyles.logomain}>
                                                            <img src='/logo/logomain.png' alt='logo' className={Mstyles.NavLogo} />
                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className={Mstyles.HTextItemBox}>
                                                    <div className={Mstyles.HTextItem}>
                                                        Test series : {TSData && TSData.title}
                                                    </div>
                                                    <div className={Mstyles.HTextItem}>
                                                        Chapter : {ChapterData && ChapterData.title}
                                                    </div>



                                                </div>


                                            </div>

                                            <div className={Mstyles.NavLeft}>
                                                <div className={Mstyles.CountDownItemTitle}>
                                                    <span>Time Left</span>
                                                </div>

                                                <div className={Mstyles.CountDownBox}>
                                                    <div className={Mstyles.CountDownItem}>
                                                        <span>{hours}</span>
                                                    </div>
                                                    <div className={Mstyles.CountDownItem}>
                                                        <span>{minutes}</span>
                                                    </div>
                                                    <div className={Mstyles.CountDownItem}>
                                                        <span>{seconds}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div >

                                    {/* Main start  */}
                                    {LoadQues &&
                                        <div className={Mstyles.QuesPlayBox}>
                                            <div className={Mstyles.QuesBox}>
                                                <div className={Mstyles.QuesBoxOnlymob}>
                                                
                                                </div>
                                                <div>
                                                    <span className={Mstyles.QuesNoTetxTag}>Question No : {currentQuestion + 1}</span>
                                                </div>

                                                <div style={{ minHeight: 10 }}>
                                                </div>
                                                <div className={Mstyles.TitleBoxPlay}>
                                                    <h2 style={{ margin: 0 }}>{updatedQuestions[currentQuestion].title}</h2>
                                                </div>
                                                <div style={{ minHeight: 10 }}>
                                                </div>
                                                <div className={Mstyles.OptionsBox}>
                                                    {updatedQuestions[currentQuestion].options.map((answerOption, index) => (
                                                        <div id={'OPSD' + answerOption._id} className={Mstyles.OptionsItem} onClick={() => handleClick(currentQuestion, index)}
                                                            style={{
                                                                backgroundColor:
                                                                    answerOption.IsS === true ? 'lightblue' : 'white',
                                                                cursor: 'pointer',
                                                            }}

                                                        >
                                                            <div className={Mstyles.OptionsItemIndex}>
                                                                <span>{index + 1}</span>
                                                            </div>
                                                            <div className={Mstyles.OptionsItemTitle}>
                                                                <span>{answerOption.title}</span>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>

                                              
                                            </div>
                                            <div className={Mstyles.QueIndexNoteboxMobile}>
                                                <div className={Mstyles.QueIndexNoteItem}>
                                                    <div className={Mstyles.QueIndexNoteboxA}>
                                                        <div className={Mstyles.IndextItemBoxSelected}>
                                                            <span>1</span>
                                                        </div>
                                                    </div>
                                                    <div className={Mstyles.QueIndexNoteboxB}>
                                                        <span>Current Question</span>
                                                    </div>
                                                </div>
                                                <div className={Mstyles.QueIndexNoteItem}>
                                                    <div className={Mstyles.QueIndexNoteboxA}>
                                                        <div className={Mstyles.IndextItemBox}>
                                                            <span>1</span>
                                                        </div>
                                                    </div>
                                                    <div className={Mstyles.QueIndexNoteboxB}>
                                                        <span>Attempted Question</span>
                                                    </div>
                                                </div>
                                                <div className={Mstyles.QueIndexNoteItem}>
                                                    <div className={Mstyles.QueIndexNoteboxA}>
                                                        <div className={Mstyles.IndextItemBoxNotAt}>
                                                            <span>1</span>
                                                        </div>
                                                    </div>
                                                    <div className={Mstyles.QueIndexNoteboxB}>
                                                        <span>Not Attempted Question</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{minHeight:'50vh'}}>
                                            
                                            </div>
                                        </div>

                                    }

                                </div>
                                <div className={Mstyles.containerPlyGroundFlexB}>
                                    {LoadQues &&
                                        <div>
                                            <div className={Mstyles.IntextitleBox}>
                                                <div className={Mstyles.IndexTitletext}>
                                                    <span>Question index</span>
                                                </div>
                                                <div className={Mstyles.blinkText}>
                                                    <span>Test Started</span>
                                                </div>
                                            </div>

                                            <div className={Mstyles.QueIndexNotebox}>
                                                <div className={Mstyles.QueIndexNoteItem}>
                                                    <div className={Mstyles.QueIndexNoteboxA}>
                                                        <div className={Mstyles.IndextItemBoxSelected}>
                                                            <span>1</span>
                                                        </div>
                                                    </div>
                                                    <div className={Mstyles.QueIndexNoteboxB}>
                                                        <span>Current Question</span>
                                                    </div>
                                                </div>
                                                <div className={Mstyles.QueIndexNoteItem}>
                                                    <div className={Mstyles.QueIndexNoteboxA}>
                                                        <div className={Mstyles.IndextItemBox}>
                                                            <span>1</span>
                                                        </div>
                                                    </div>
                                                    <div className={Mstyles.QueIndexNoteboxB}>
                                                        <span>Attempted Question</span>
                                                    </div>
                                                </div>
                                                <div className={Mstyles.QueIndexNoteItem}>
                                                    <div className={Mstyles.QueIndexNoteboxA}>
                                                        <div className={Mstyles.IndextItemBoxNotAt}>
                                                            <span>1</span>
                                                        </div>
                                                    </div>
                                                    <div className={Mstyles.QueIndexNoteboxB}>
                                                        <span>Not Attempted Question</span>
                                                    </div>
                                                </div>
                                            </div>

                                          

                                            <div className={Mstyles.PlayindexBox}>
                                                {updatedQuestions.map((Item, index) => (
                                                    <div id={'OptionSeleCtedIndex' + Item._id} key={Item._id} className={Mstyles.PlayindexItem} onClick={() => HandleOptionindex(Item._id, index)}
                                                        style={{
                                                            backgroundColor:
                                                                Item.isAtempted === true ? '#00a6ff' : '#FEF9E7',
                                                            cursor: 'pointer',
                                                            color:
                                                                Item.isAtempted === true ? 'white' : 'black',
                                                            border:
                                                                index === currentQuestion ? '3px solid #00a6ff' : 'none',

                                                        }}

                                                    >
                                                        <span>{index + 1}</span>
                                                    </div>
                                                ))}
                                            </div>
                                          
                                        </div>

                                    }
                                </div>
                            </div>
                        </div>


                    }

                    <div className={Mstyles.PlaygroundFooter}>
                        <div>
                            <div className={Mstyles.NavLeftMob}>
                                <div className={Mstyles.CountDownItemTitle}>
                                    <span>Time Left</span>
                                </div>

                                <div className={Mstyles.CountDownBox}>
                                    <div className={Mstyles.CountDownItem}>
                                        <span>{hours}</span>
                                    </div>
                                    <div className={Mstyles.CountDownItem}>
                                        <span>{minutes}</span>
                                    </div>
                                    <div className={Mstyles.CountDownItem}>
                                        <span>{seconds}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Mstyles.PlaygroundFooterBtnBox}>
                            {!LoadingBTN &&
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div className={Mstyles.PlayBtnQ} style={{ backgroundColor: 'red' }} onClick={CreateAtempt}>
                                        <span>End Test Series</span>
                                    </div>


                                    <div className={Mstyles.PlayBtnQ} style={{ marginLeft: 10 }} onClick={SubmitAtempt}>
                                        <span>Submit Test Series</span>
                                    </div>
                                    </div>
                            }
                            {LoadingBTN &&
                                <CircularProgress />
                            }
                           
                       </div>
                    </div>
                </div>
            }






        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
