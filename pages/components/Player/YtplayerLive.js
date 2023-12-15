import { useState, useEffect, useContext } from 'react';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import MYS from '../../../Styles/mystyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { useRouter, useParams } from 'next/router'
import Lottie from 'react-lottie'
import * as animationData from '../../../Data/Lottie/livesticker.json'
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

const VideoPlayer = ({ Videoid }) => {
  const Contextdata = useContext(CheckloginContext)
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState(`${Videoid}`);

  const [selectedQuality, setSelectedQuality] = useState(0);
  const [FirstTime, setFirstTime] = useState(true);
  const [LoadingVideo, setLoadingVideo] = useState(true);
  const [VideoSource, setVideoSource] = useState({});


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }


  const GetstreamableUrl = async () => {
    const sendUM = { videoUrl: videoUrl, JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Video/GetstreamableUrl", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((Videoparsed) => {
        console.log(Videoparsed.ReqData)
        if (Videoparsed.ReqData.qualityOptions) {
          setLoadingVideo(false);
          const datai = Videoparsed.ReqData.qualityOptions
          if (Videoparsed.ReqData.qualityOptions[0].isLive) {

            const videoSrc = {
              type: "video",
              sources: [
                {
                  src: Videoid,
                  provider: "youtube",

                }
              ]
            };
            setVideoSource(videoSrc);
            // setVideoSource({
            //   type: 'video',
            //   sources: datai.map(item => ({
            //     src: item.url,
            //     size: parseInt(item.qualityLabel.replace('p', ''), 10)
            //   })),
            // });
          } else {

            setVideoSource({
              type: 'video',
              sources: datai.map(item => ({
                src: item.url,
                size: parseInt(item.qualityLabel.replace('p', ''), 10)
              })),
            });
          }

          if (FirstTime) {
            setSelectedQuality(Videoparsed.ReqData.qualityOptions[0].itag)
            setFirstTime(false)
          }

        } else {
         alert('internal Server Error Video Cannot be played')
        }

      })
  }

  useEffect(() => {


    GetstreamableUrl()

  }, [router.query])
  return (
    <div>
      {LoadingVideo &&
        <div>
          <Skeleton variant="rounded" animation="wave" width={'100%'} height={500} />
        </div>
      }

      <div className={MYS.LiveContainer}>
        {!LoadingVideo &&
          <div className={MYS.plyrbox}>

            <Plyr source={VideoSource} />


          </div>
        }

        {!LoadingVideo &&
          <div className={MYS.livestickerbox}>

            <div className={MYS.livestickerboxA}>
              <div className={MYS.livestickerboxAAnimation}>

                <Lottie options={defaultOptions}
                  width='100%'

                  isStopped={false}
                  isPaused={false} />


              </div>

             


            </div>
            <div className={MYS.livestickerboxB}>

             

            </div>




          </div>
        }
      </div>




    </div>
  )
}

export default VideoPlayer
