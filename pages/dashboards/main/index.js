import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import Mstyles from '../../../Styles/home.module.css'
import PageHeader from 'src/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import CatlistGrid from '../../../pages/components/List/CatlistGrid'
import Link from 'next/link';
import Image from 'next/image';
import TSlistGrid from '../../../pages/components/List/TSlistGrid'
import { FiChevronRight } from "react-icons/fi";
function DashboardCrypto() {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    if (Contextdata.IsLogin == true) {
      console.log('Login')
    } else {
      // setIsLoading(true);
      // router.push('/Login')
      console.log('Not Login')
    }
  });
  return (
    <>
      <Head>
        <title>Supermarks Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader UData={Contextdata.Data} />
      </PageTitleWrapper>
      <div >
        
        <div className={Mstyles.HeroBoxTwoItemBox}>
          <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#e8dfff' }}>
            <div className={Mstyles.HeroBoxTwoItemIcon}>
              <Image src={`/icons/TestsSeries.webp`}
                alt="image"
                layout="responsive"
                placeholder='blur'
                width={100}
                height={100}
                quality={100}
                blurDataURL={blurredImageData}

              />
            </div>
            <div className={Mstyles.HeroBoxTwoItemText}>
              <span>My Test Series</span>
            </div>
            <div className={Mstyles.HeroBoxTwoItemDetails}>
              <span>Practice Test Series made by Top Educators</span>
            </div>
            <div className={Mstyles.BtnWithIcon}>
              <div>
                <Link href='/MyTS' style={{ textDecoration: 'none' }}>
                  <span>Let's Practice</span>
                </Link>

              </div>
              <div>
                <FiChevronRight size={15} />
              </div>
            </div>
          </div>
          <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fce4ec' }}>
            <div className={Mstyles.HeroBoxTwoItemIcon}>
              <Image src={`/icons/StructuredCourses.webp`}
                alt="image"
                layout="responsive"
                placeholder='blur'
                width={100}
                height={100}
                quality={100}
                blurDataURL={blurredImageData}

              />
            </div>
            <div className={Mstyles.HeroBoxTwoItemText}>
              <span>My Courses</span>
            </div>
            <div className={Mstyles.HeroBoxTwoItemDetails}>
              <span>Attempt daily Live/Rec classes with top Educators</span>
            </div>
            <div className={Mstyles.BtnWithIcon}>
              <div>
                <Link href='/MyCourses' style={{ textDecoration: 'none' }}>
                  <span>Attempt Classes</span>
                </Link>

              </div>
              <div>
                <FiChevronRight size={15} />
              </div>
            </div>
          </div>
         
          <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fff0cb' }}>
            <div className={Mstyles.HeroBoxTwoItemIcon} >
              <Image src={`/icons/VideoLectures.webp`}
                alt="image"
                layout="responsive"
                placeholder='blur'
                width={100}
                height={100}
                quality={100}
                blurDataURL={blurredImageData}

              />
            </div>
            <div className={Mstyles.HeroBoxTwoItemText}>
              <span>Video Lectures</span>
            </div>
            <div className={Mstyles.HeroBoxTwoItemDetails}>
              <span>With Best video Lectures clear all your concepts</span>
            </div>
            <div className={Mstyles.BtnWithIcon}>
              <div>
                <Link href='/Courses' style={{ textDecoration: 'none' }}>
                  <span>Start Learning</span>
                </Link>
              </div>
              <div>
                <FiChevronRight size={15} />
              </div>
            </div>
          </div>
          <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#b6ffe4' }}>
            <div className={Mstyles.HeroBoxTwoItemIcon}>
              <Image src={`/icons/StudyNotes.webp`}
                alt="image"
                layout="responsive"
                placeholder='blur'
                width={100}
                height={100}
                quality={100}
                blurDataURL={blurredImageData}

              />
            </div>
            <div className={Mstyles.HeroBoxTwoItemText}>
              <span>Study Materials</span>
            </div>
            <div className={Mstyles.HeroBoxTwoItemDetails}>
              <span>Complete your goal with our best Study Materials</span>
            </div>
            <div className={Mstyles.BtnWithIcon}>
              <div>
                <Link href='/StudyMaterials' style={{ textDecoration: 'none' }}>
                  <span>Explore more</span>
                </Link>

              </div>
              <div>
                <FiChevronRight size={15} />
              </div>
            </div>
          </div>

        
          <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#cddeff' }}>
            <div className={Mstyles.HeroBoxTwoItemIcon}>
              <Image src={`/icons/BookSummaries.webp`}
                alt="image"
                layout="responsive"
                placeholder='blur'
                width={100}
                height={100}
                quality={100}
                blurDataURL={blurredImageData}

              />
            </div>
            <div className={Mstyles.HeroBoxTwoItemText}>
              <span>Best Books</span>
            </div>
            <div className={Mstyles.HeroBoxTwoItemDetails}>
              <span>The best teachers and fellow students</span>
            </div>
            <div className={Mstyles.BtnWithIcon}>
              <div>
                <Link href='/Books' style={{ textDecoration: 'none' }}>
                  <span>Start Reading</span>
                </Link>

              </div>
              <div>
                <FiChevronRight size={15} />
              </div>
            </div>
          </div>



        </div>
        
      </div>
      <Container maxWidth="lg">
        <div style={{ minHeight: '20px' }}></div>
        <div className={Mstyles.HeroBoxTwoTitle}>
          <h1>We cover all Exams and Classes</h1>
          <span>From videos to notes to tests, providing all you need to learn and practice in one place</span>
        </div>
        <div style={{ minHeight: '30px' }}></div>
        <CatlistGrid />
        
      </Container>
      
      <Container maxWidth="lg">
        <div style={{ minHeight: '80px' }}></div>
        <div className={Mstyles.HeroBoxTwoTitle}>
          <h1>Recommended Test Series</h1>
          <span>We have listes the best Test series for your best journey for preparation of different category.</span>
        </div>
        <div style={{ minHeight: '30px' }}></div>
        <div style={{ minHeight: '30px' }}></div>
        <TSlistGrid />
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
