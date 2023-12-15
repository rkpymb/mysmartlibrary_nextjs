import { useState, useEffect, useContext } from 'react';
import Badge from '@mui/material/Badge';
import {
    Typography,
    Box,
    Card,
    IconButton,
    Button,
    styled
} from '@mui/material';
import { LuShoppingBag, LuSearch, LuChevronRight, LuArrowLeft } from "react-icons/lu";
import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../../Styles/home.module.css'
import CircularProgress from '@mui/material/CircularProgress';

import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import Head from 'next/head';

import MainNavBarSecond from '../../src/components/Parts/Navbar/MainNavBarSecond'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import crypto from 'crypto';
import { MYKEY } from '../../Data/config'
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'



import SendIcon from '@mui/icons-material/Send';

export async function getServerSideProps(context) {
    const ChapterID = context.query.pageno[0];
    const slug = context.query.pageno[1];
    const JwtToken = context.query.pageno[2];
    // console.log(JwtToken)

    const headers = {
        Authorization: `Bearer ${JwtToken}`,
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

        props: { CourseFullData, ChapterID, slug, JwtToken }, // will be passed to the page component as props
    }

}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',

    },
}));


const OverviewWrapper = styled(Box)(
    ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview({ CourseFullData, ChapterID, JwtToken, slug }) {

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
    const [TestStarted, setTestStarted] = useState(false);

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
        FirstStep()
    }, [router.query]);


    useEffect(() => {
        if (TestStarted == true) {
            if (TestStarted == true && seconds == 0 && minutes == 0 && hours == 0) {
                alert('Time out , your attempt will be submited');
                SubmitAtemptFinal()
            }
        }

    }, [seconds, minutes, hours]);

    const FirstStep = async () => {
        if (Contextdata.IsLogin == true) {
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

            setTSData(CourseFullData.TSData)
            setChapterData(CourseFullData.ChapterData)
            setTotalQues(CourseFullData.TotalQues)
            setTotalMarks(CourseFullData.TotalMarks)


        } else {
            router.push('/Login')
        }
    }


    const CreateAtempt = async () => {
        setLoadingBTN(true)
        const Chid = ChapterID;
        const Tsid = slug;
        const Status = 1;
        const IsActive = true;
        const StatusText = 'Created';
        const takenTime = '0';
        const takenTimeSec = '0';
        const TotalMarks = '0';

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

    }
    const HandleOptionindex = async (e, b) => {
        if (b !== currentQuestion) {
            setCurrentQuestion(b)
        }
    }

    const SubmitAtempt = async () => {
        let text = "Do you really want to submit ?";
        if (confirm(text) == true) {
            SubmitAtemptFinal()

        }
    }


    const SubmitAtemptFinal = async () => {
        if (AttemptID !== '') {
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
            alert('Something Wnt Wrong, Try again')
        }

    }

    const StartTimer = async () => {
        setTestStarted(true)
        function convertMinutesToSeconds(minutes) {
            return minutes * 60;
        }
        const minutes = CourseFullData.ChapterData.duration;
        const seconds = convertMinutesToSeconds(minutes);
        setTimeRemaining(seconds)
    }
    const PrevQues = async () => {


        console.log(currentQuestion)
        if (currentQuestion !== 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }
    const NextQues = async () => {

        console.log(currentQuestion)
        if (currentQuestion + 1 < TotalQues && currentQuestion + 1 !== TotalQues) {

            setCurrentQuestion(currentQuestion + 1)
        }


    }
    const Exittest = async () => {
        let text = "Do you really want to Exit ?";
        if (confirm(text) == true) {
            router.back()
        }


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
                    <div className={Mstyles.MainBoxContainer}>
                        <div className={Mstyles.secndHeder}>
                            <div className={Mstyles.secndHederBox}>
                                <div className={Mstyles.secndHederBoxA}>
                                    <div>
                                        <IconButton aria-label="cart" onClick={() => router.back()}>
                                            <StyledBadge color="secondary" >
                                                <LuArrowLeft />
                                            </StyledBadge>
                                        </IconButton>
                                    </div>
                                    <div>
                                    <span><span className={Mstyles.linkpageitemClick}>Test Series play Groud</span> </span>


                                    </div>
                                </div>
                                <div className={Mstyles.secndHederBoxB}>
                                </div>
                            </div>
                        </div>

                        <div className={Mstyles.MainBoxContainerInner}>
                            <div>
                                s
                            </div>

                        </div>


                    </div>
                    <Head>
                        <title>Test Series Play Ground : {TSData && TSData.title}</title>
                    </Head>
                    <MainNavBarSecond />
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

                        <div className={Mstyles.PlaygroundFooterBox}>


                            {!LoadingBTN &&
                                <Button variant="contained" endIcon={<FiChevronRight />} onClick={CreateAtempt}>
                                    Start now
                                </Button>
                            }
                            {LoadingBTN &&
                                <CircularProgress />
                            }
                        </div>
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
                                            <img src='/logo/mainlogonav.svg' alt='logo' className={Mstyles.NavLogo} />
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
                                                            <img src='/logo/mainlogonav.svg' alt='logo' className={Mstyles.NavLogo} />
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


                                            <div style={{ minHeight: '50vh' }}>

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




                                            <div className={Mstyles.PlayindexBox}>
                                                {updatedQuestions.map((Item, index) => (
                                                    <div id={'OptionSeleCtedIndex' + Item._id} key={Item._id} className={Mstyles.PlayindexItem} onClick={() => HandleOptionindex(Item._id, index)}
                                                        style={{
                                                            backgroundColor:
                                                                Item.isAtempted === true ? 'green' : '#EBDEF0',
                                                            cursor: 'pointer',
                                                            color:
                                                                Item.isAtempted === true ? 'white' : '#2E4053',
                                                            borderBottom:
                                                                index === currentQuestion ? '5px solid #00a6ff' : 'none',

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
                        {!LoadingBTN &&

                            <div>
                                <div className={Mstyles.OnlyDesktop}>
                                    <div className={Mstyles.PlaygroundFooterBtnBox}>

                                        <div className={Mstyles.PlaygroundFooterBtnBoxFextbtn}>
                                            <IconButton aria-label="prev" onClick={PrevQues}>
                                                <StyledBadge color="secondary" >
                                                    <FiChevronLeft />
                                                </StyledBadge>
                                            </IconButton>
                                            <div className={Mstyles.QuesCountbox}>
                                                {currentQuestion + 1} /  {TotalQues}
                                            </div>
                                            <IconButton aria-label="next" onClick={NextQues}>
                                                <StyledBadge color="secondary" >
                                                    <FiChevronRight />
                                                </StyledBadge>
                                            </IconButton>


                                        </div>
                                        <div className={Mstyles.PlaygroundFooterBtnBoxFextbtn}>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} endIcon={<SendIcon />} onClick={Exittest}>
                                                End and Exit
                                            </Button>
                                            <div style={{ width: '20px' }}></div>
                                            <Button variant="contained" style={{ backgroundColor: '#00a6ff' }} endIcon={<SendIcon />} onClick={SubmitAtempt}>
                                                Final Submit
                                            </Button>

                                        </div>


                                    </div>
                                </div>
                                <div className={Mstyles.OnlyMobile}>
                                    <div className={Mstyles.PlaygroundFooterBtnBoxMobile}>

                                        <div className={Mstyles.PlaygroundFooterBtnBoxFextbtn}>




                                            <IconButton aria-label="prev" onClick={PrevQues}>
                                                <StyledBadge color="secondary" >
                                                    <FiChevronLeft />
                                                </StyledBadge>
                                            </IconButton>
                                            <div className={Mstyles.QuesCountbox}>
                                                {currentQuestion + 1} /  {TotalQues}
                                            </div>
                                            <IconButton aria-label="next" onClick={NextQues}>
                                                <StyledBadge color="secondary" >
                                                    <FiChevronRight />
                                                </StyledBadge>
                                            </IconButton>



                                        </div>
                                        <div style={{ height: '20px' }}></div>
                                        <div className={Mstyles.PlaygroundFooterBtnBoxFextbtn}>
                                            <Button variant="contained" size='small' style={{ backgroundColor: 'red' }} endIcon={<SendIcon />} onClick={Exittest}>
                                                End and Exit
                                            </Button>
                                            <div style={{ width: '20px' }}></div>
                                            <Button variant="contained" size='small' style={{ backgroundColor: '#00a6ff' }} endIcon={<SendIcon />} onClick={SubmitAtempt}>
                                                Final Submit
                                            </Button>

                                        </div>


                                    </div>
                                </div>
                            </div>


                        }
                        <div className={Mstyles.PlaygroundFooterBox}>
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
