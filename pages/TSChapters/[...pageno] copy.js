import React, { useState, useEffect ,useContext} from 'react';
import { useRouter } from 'next/router'
import MYS from '../../Styles/mystyle.module.css'

export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ GETID: DataSlug, updatekey: KEY })
    // };
    // const response = await fetch(`${process.env.API_URL}Website/Course/CourseData.php`, requestOptions);
    // const CourseFullData = await response.json();

    return {

        props: { DataSlug }, // will be passed to the page component as props
    }

}


const Slug = (DataSlug) => {
    console.log(DataSlug.DataSlug)
    const router = useRouter();
    const [IsLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        setIsLoading(false)
        
       
    }, [router.query]);

    
    
    return <div>
        
        {/* <Head>
            <title>{CourseRetData && CourseRetData.title} Enroll Now</title>
            <meta name="description" content={CourseRetData && CourseRetData.title} />
            <meta property="og:image" content={`${BASE_URL}Storage/panel/img/${CourseRetData && CourseRetData.img}`} />
            <link rel="icon" href="../logo/feviimg.svg" />
        </Head> */}

        {IsLoading &&
            <p> { DataSlug.DataSlug }</p>
            }
       

    </div>
};




export default Slug;