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
import { LuXSquare, LuCheckSquare, LuXOctagon } from "react-icons/lu";
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import CheckloginContext from '../../context/auth/CheckloginContext'
import Link from 'src/components/Link';
import { FiClock, FiCheckSquare, FiAlertTriangle, FiScissors } from "react-icons/fi";
import Head from 'next/head';
import Tsathero from '../../src/components/Parts/TS/Tsathero'

import crypto from 'crypto';
import { MYKEY } from '../../Data/config'
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'

import Navbarmain from '../../src/components/Parts/Navbarmain'

import Footer from '../../src/components/Parts/Footer'
import LinearProgress from '@mui/material/LinearProgress';
export async function getServerSideProps(context) {
    const SubmitID = context.query.pageno[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ SubmitID: SubmitID, token: process.env.MYKEY })
    };
    const response = await fetch(`${process.env.API_URL}home/TSattempt`, requestOptions);
    const ATDATA = await response.json();

    return {

        props: { ATDATA }, // will be passed to the page component as props
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

function Overview({ ATDATA }) {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const router = useRouter()
    const [Loading, setLoading] = useState(true);

    const [TSData, setTSData] = useState(true);

    const [TotalQuestions, setTotalQuestions] = useState(ATDATA.ATD[0].SubmitData.length);
    const [QuestionsList, setQuestionsList] = useState(ATDATA.ATD[0].SubmitData);

    const [percentage, setPercentage] = useState(0);
    const [Mnow, setMnow] = useState(0);

    useEffect(() => {
        console.log(QuestionsList)
        setLoading(false)
        // console.log(ATDATA.ATD[0])
        setTSData(ATDATA.ATD[0])

    }, [router.query]);


    function calculateStats(QuestionsList) {
        let totalFullMarks = 0; // Variable to store the full marks
        let totalMarks = 0;
        let totalMarksLost = 0;
        let totalAttempted = 0;
        let totalNotAttempted = 0;
        let correctQuestions = 0;
        let incorrectQuestions = 0; // Track incorrect questions
        let totalQuestions = QuestionsList.length;

        QuestionsList.forEach((question) => {
            // Calculate total obtained marks for each question
            question.obtainedMarks = 0;

            if (question.isAtempted) {
                let isCorrect = true;

                question.options.forEach((option) => {
                    if (option.isActive !== option.IsS) {
                        isCorrect = false;
                    }
                });

                if (isCorrect) {
                    question.obtainedMarks = parseInt(question.marks);
                    correctQuestions++;
                } else {
                    incorrectQuestions++; // Increment incorrect questions count
                }
            } else {
                totalNotAttempted++;
            }

            totalFullMarks += parseInt(question.marks); // Add the question's marks to the full marks
            totalMarks += question.obtainedMarks;

            if (question.isAtempted) {
                totalAttempted++;
            }
        });

        // Calculate total marks lost
        totalMarksLost = totalFullMarks - totalMarks;

        // Calculate percentages
        let percentageFullMarks = (totalFullMarks / (totalQuestions * 1)) * 100;
        let percentageMarks = (totalMarks / (totalQuestions * 1)) * 100;
        let percentageMarksLost = (totalMarksLost / (totalQuestions * 1)) * 100;
        let percentageAttempted = (totalAttempted / (totalQuestions * 1)) * 100;
        let percentageNotAttempted = (totalNotAttempted / (totalQuestions * 1)) * 100;
        let percentageCorrectQuestions = (correctQuestions / (totalQuestions * 1)) * 100;
        let percentageIncorrectQuestions = (incorrectQuestions / (totalQuestions * 1)) * 100; // Calculate percentage of incorrect questions
        setMnow(percentageMarks)
        return {
            totalFullMarks,
            totalMarks,
            totalMarksLost,
            totalAttempted,
            totalNotAttempted,
            correctQuestions,
            incorrectQuestions,
            totalQuestions,
            percentageFullMarks,
            percentageMarks,
            percentageMarksLost,
            percentageAttempted,
            percentageNotAttempted,
            percentageCorrectQuestions,
            percentageIncorrectQuestions, // Add percentage of incorrect questions
        };
    }
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const calculatedStats = calculateStats(QuestionsList);
        setStats(calculatedStats);

    }, []);



    return (
        <OverviewWrapper>
            <Navbarmain />
            <div className={Mstyles.ContainerMain}>
                {!Loading &&
                    <div className={Mstyles.ATScoreBox}>


                        <div className={Mstyles.ATScoreBoxItem}>
                            <div className={Mstyles.TagICTAMAt}>
                                Attempted
                            </div>
                            <div style={{ minHeight: '10px' }}></div>
                            <div className={Mstyles.ATScoreBoxItemTitleBox}>
                                <div>
                                    <span>{TSData.ChTitle}</span>
                                </div>
                                <div>
                                    <small>{TSData.TsTitle}</small>
                                </div>
                            </div>
                            <div style={{ minHeight: '15px' }}></div>
                            <div className={Mstyles.ATScoreBoxItemTextIConBox}>
                                <div>
                                    <div className={Mstyles.ATScoreBoxItemTextICon}>
                                        <div className={Mstyles.ATScoreBoxItemTextIConA}>
                                            <FiClock size={20} />
                                        </div>
                                        <div className={Mstyles.ATScoreBoxItemTextIConB}>
                                            Attempted On: {TSData.date}, {TSData.time}
                                        </div>
                                    </div>
                                    <div style={{ minHeight: '10px' }}></div>
                                    <div className={Mstyles.ATbtns} >
                                        <div className={Mstyles.ATbtnsItem}>
                                            <Button variant="outlined">View Solutions</Button>
                                        </div>
                                        <div className={Mstyles.ATbtnsItem}>
                                            <Button variant="outlined">Share Attempt</Button>
                                        </div>

                                    </div>
                                </div>
                                <div className={Mstyles.OnlyDesktop}>
                                    <div>
                                        <img src='/notepad.png' alt='logo' width={'80px'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: '15px' }}></div>
                        <h2>Result Summary</h2>
                        <div style={{ minHeight: '15px' }}></div>
                        <div className={Mstyles.ATScoreBoxItem}>
                            <div className={Mstyles.ATScoreBoxItemTextIConBox}>
                                <div>
                                    <div className={Mstyles.ScorB}>
                                        <span>SCORE</span>
                                    </div>
                                    <div style={{ minHeight: '15px' }}></div>
                                    <div className={Mstyles.MainScorB}>
                                        <span>{stats.totalMarks}</span><small>/{stats.totalFullMarks}</small>
                                        <div>
                                            {Mnow <= 30 &&
                                                <div className={Mstyles.ScoreRemarktag}>Very Poor marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                            {Mnow > 30 && Mnow <= 40 &&
                                                <div className={Mstyles.ScoreRemarktag}> Poor marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                            {Mnow > 40 && Mnow <= 50 &&
                                                <div className={Mstyles.ScoreRemarktag}> Lowest marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                            {Mnow > 50 && Mnow <= 60 &&
                                                <div className={Mstyles.ScoreRemarktag}> Avarage marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                            {Mnow > 60 && Mnow <= 70 &&
                                                <div className={Mstyles.ScoreRemarktag}> Good marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                            {Mnow > 70 && Mnow <= 80 &&
                                                <div className={Mstyles.ScoreRemarktag}> Very Good marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                            {Mnow > 80 && Mnow <= 90 &&
                                                <div className={Mstyles.ScoreRemarktag}> Excellent marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                            {Mnow > 90 && Mnow <= 100 &&
                                                <div className={Mstyles.ScoreRemarktag}> Very Excellent marks with {Mnow.toFixed(2)}%</div>
                                            
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img src='/rising.png' alt='logo' width={'80px'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ minHeight: '15px' }}></div>
                        <h2>Your Progress Report</h2>
                        <div style={{ minHeight: '15px' }}></div>
                        <div className={Mstyles.ProgressBox}>
                            <div className={Mstyles.ProgressBoxItem}>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            <div className={Mstyles.TextWithIConItemA}>
                                                <FiCheckSquare size={20} />
                                            </div>
                                            <div className={Mstyles.TextWithIConItemB}>Correct</div>
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        {stats.correctQuestions}/{stats.totalAttempted}
                                    </div>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                                <LinearProgress variant="determinate" value={stats.percentageCorrectQuestions.toFixed(2)} />
                                <div style={{ minHeight: '10px' }}></div>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            Marks Obtained : {stats.totalMarks}
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        {stats.percentageCorrectQuestions.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                            <div style={{ minHeight: '15px' }}></div>
                            <div className={Mstyles.ProgressBoxItem}>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            <div className={Mstyles.TextWithIConItemA}>
                                                <FiAlertTriangle size={20} />
                                            </div>
                                            <div className={Mstyles.TextWithIConItemB}>Incorrect</div>
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        {stats.incorrectQuestions}/{stats.totalAttempted}
                                    </div>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                                <LinearProgress variant="determinate" value={stats.percentageIncorrectQuestions.toFixed(2)} color="secondary" />
                                <div style={{ minHeight: '10px' }}></div>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            Marks Lost : {stats.totalMarksLost}
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        {stats.percentageIncorrectQuestions.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                            <div style={{ minHeight: '15px' }}></div>
                            <div className={Mstyles.ProgressBoxItem}>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            <div className={Mstyles.TextWithIConItemA}>
                                                <FiScissors size={20} />
                                            </div>
                                            <div className={Mstyles.TextWithIConItemB}>Skipped</div>
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        {stats.totalNotAttempted}/{stats.totalQuestions}
                                    </div>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                                <LinearProgress variant="determinate" color="secondary" value={stats.percentageNotAttempted.toFixed(2)} />
                                <div style={{ minHeight: '10px' }}></div>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            Marks Skipped : 60
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        {stats.percentageNotAttempted.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                            <div style={{ minHeight: '15px' }}></div>
                            <div className={Mstyles.ProgressBoxItem}>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            <div className={Mstyles.TextWithIConItemA}>
                                                <FiClock size={20} />
                                            </div>
                                            <div className={Mstyles.TextWithIConItemB}>Time Taken</div>
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        60/100
                                    </div>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                                <LinearProgress variant="determinate" value={percentage} color="primary" />
                                <div style={{ minHeight: '10px' }}></div>
                                <div className={Mstyles.ProgressBoxTitleBox}>
                                    <div className={Mstyles.ProgressBoxTitleBoxA}>
                                        <div className={Mstyles.TextWithIConItem}>
                                            Total Time : 10 min
                                        </div>
                                    </div>
                                    <div className={Mstyles.ProgressBoxTitleBoxB}>
                                        {`${Math.round(percentage)}%`}
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div style={{ minHeight: '15px' }}></div>
                        <h2>Complete Analysis for each Question </h2>
                        <div style={{ minHeight: '15px' }}></div>
                        <div className={Mstyles.ResultMyAtemptsBox}>

                            {QuestionsList.map((question, index) => (
                                <div key={index} className={Mstyles.QSBOXatResultItm}>
                                    <p>
                                        <strong>Q {index + 1} :</strong> <strong>{question.title}</strong> (Marks: {question.marks})
                                    </p>
                                    <ul>
                                        {question.options.map((option, optionIndex) => (
                                            <li
                                                key={optionIndex}
                                                style={{
                                                    color:
                                                        question.isAtempted && option.IsS
                                                            ? 'blue'
                                                            : 'black',
                                                }}
                                            >
                                                <span>  {option.title}</span>


                                                {question.isAtempted && option.IsS ? (<span
                                                    style={{ color: 'black', fontSize: '12px', marginLeft: 5 }}
                                                > 👈🏽(Option Selected)</span>) : <span></span>

                                                }
                                               
                                                {option.isActive ? (<span
                                                    style={{ color: 'black', fontSize: '12px', marginLeft: 5 }}
                                                > 👈🏽(Correct answer)</span>) : <span></span>

                                                }

                                            </li>
                                        ))}
                                    </ul>
                                    <div className={Mstyles.QSBOXatResultItmFooter}>
                                        <div>
                                            {question.isAtempted ? (
                                                question.obtainedMarks && question.marks ? (
                                                    <div className={Mstyles.tagItemCorrect}>
                                                      <div>
                                                            <LuCheckSquare size={20} />
                                                        </div>    
                                                      <div className={Mstyles.tagItemCorrectText}>
                                                           Correct
                                                        </div>    
                                                    
                                                    </div>
                                                ) : (
                                                        <div className={Mstyles.tagItemInCorrect}>
                                                            <div>
                                                                <LuXSquare size={20} />
                                                            </div>
                                                            <div className={Mstyles.tagItemInCorrectText}>
                                                                Incorrect
                                                            </div>

                                                        </div>
                                                )
                                            ) : (
                                                    <div className={Mstyles.NotAt}>
                                                        <div>
                                                            <LuXOctagon size={20} />
                                                        </div>
                                                        <div className={Mstyles.NotAtText}>
                                                            Not Attempted
                                                        </div>

                                                    </div>
                                            )}
                                        </div>
                                        <div>
                                            {question.isAtempted ? (
                                                question.obtainedMarks && question.marks ? (
                                                    <span style={{ color: '#00a6ff', fontWeight:500 }}>Marks Obtained : {question.marks}</span>
                                                ) : (
                                                        <span style={{ color: 'red', fontWeight: 500 }}>Marks Obtained : 0</span>
                                                )
                                            ) : (
                                                    <span style={{ color: 'black', fontWeight: 500 }}>Marks Obtained : 0</span>
                                            )}
                                        </div>
                                    </div>
                                    

                                </div>
                            ))}
                        </div>
                        <div style={{ minHeight: '55px' }}></div>
                        <div className={Mstyles.ATScoreBoxItem}>
                            <div className={Mstyles.ATScoreBoxItemTextIConBox}>
                                <div>
                                    <div className={Mstyles.ScorB}>
                                        <span>Share This Attempt</span>
                                    </div>
                                    <div style={{ minHeight: '15px' }}></div>
                                    <div className={Mstyles.ATScoreBoxItemTitleBox}>
                                        <div>
                                            <span>{TSData.ChTitle}</span>
                                        </div>
                                        <div>
                                            <small>{TSData.TsTitle}</small>
                                        </div>
                                    </div>
                                    <div style={{ minHeight: '15px' }}></div>
                                    <div className={Mstyles.MainScorB}>
                                     <span>{stats.totalMarks}</span><small>/{stats.totalFullMarks}</small>
                                    </div>
                                    
                                    <div>
                                        <small>Total Obtained Marks</small>
                                    </div>
                                    <div style={{ minHeight: '15px' }}></div>
                                    <div className={Mstyles.ATbtnsItem}>
                                        <Button variant="contained">Share Attempt</Button>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img src='/share.png' alt='logo' width={'80px'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div style={{ minHeight: '50px' }}></div>
            </div>

            <div style={{ minHeight: '205px' }}></div>
            <Footer />



        </OverviewWrapper>
    );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
};
