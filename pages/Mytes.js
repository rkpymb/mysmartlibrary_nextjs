import { useState, useEffect } from 'react';
import ReactHLS from 'react-hls';

function VideoPlayer() {
  const [m3u8Url, setM3u8Url] = useState('');
  const [Loading, setLoading] = useState(false);

  useEffect(() => {

    GetData()
  }, []);


  const GetData = async () => {
    const sendUM = { videoId: "LTTnk4IdKcw" }
    const data = await fetch(`http://localhost:3001/home/livestream2`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        // setM3u8Url(parsed.m3u8Url);
        // setLoading(false);
        console.log(parsed)
      }).catch((error) => console.error(error));
  }

  return (
    <div>

      {Loading &&

        <div>
          <p>Loading..</p>
        </div>
      }
      {!Loading &&

        <div>
          {/* <video controls width={'100%'}>
            <source src={`http://localhost:3001/home/youtubeProxy${m3u8Url}`} type="application/x-mpegURL" />
            Your browser does not support the video tag.
          </video> */}

          <ReactHLS url={`https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1701229709/ei/LWBmZbbuF9_Fz7sPz8iumA8/ip/2409:40e5:1f:3700:edd2:5531:49b:fe19/id/T81jwJ_WpjE.1/itag/95/source/yt_live_broadcast/requiressl/yes/ratebypass/yes/live/1/sgoap/gir%3Dyes%3Bitag%3D140/sgovp/gir%3Dyes%3Bitag%3D136/rqh/1/hls_chunk_host/rr5---sn-gwpa-pmgl.googlevideo.com/playlist_duration/30/manifest_duration/30/spc/UWF9f4Blg4sTcJIAO3secOwuL_AXb-84tOqijH4pWA/vprv/1/playlist_type/DVR/initcwndbps/567500/mh/D9/mm/44/mn/sn-gwpa-pmgl/ms/lva/mv/m/mvi/5/pl/36/dover/11/pacing/0/keepalive/yes/fexp/24007246/mt/1701207154/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,live,sgoap,sgovp,rqh,playlist_duration,manifest_duration,spc,vprv,playlist_type/sig/ANLwegAwRQIhALUEbWQaHELdvShdw9NtCtVRUbZ7LeO6obGRM1SEXoVnAiBL_nTgYhowx5f-ut0PH081UKxaRFh2Hp4cBN20MMwWSQ%3D%3D/lsparams/hls_chunk_host,initcwndbps,mh,mm,mn,ms,mv,mvi,pl/lsig/AM8Gb2swRgIhAP_NVN7X5KeeITF3D0j6YqwFrxZDMK-OBFCLlmTxIzYCAiEA0cd3KQ0QduHTXTQsjyj_VBb-BtB6Znu-Qbsf3noTi7g%3D/playlist/index.m3u8`}/>
        </div>
      }

    </div>
  );
}

export default VideoPlayer;
