import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import Mstyles from '../../../Styles/home.module.css'
import { FiChevronRight } from "react-icons/fi";
import Image from 'next/image'
import Footer from 'src/components/Footer';
import Link from 'next/link';
import DbProfileCounter from 'src/components/UserDashboard/DbProfileCounter';
import { useRouter, useParams } from 'next/router'
import DbCourselistGridByCatid from '../../components/List/DbCourselistGridByCatid'
import DbTSlistGridByCatid from '../../components/List/DbTSlistGridByCatid'
import DbVideolistGridByCatid from '../../components/List/DbVideolistGridByCatid'
function DashboardCrypto() {
  const router = useRouter()
 
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const Contextdata = useContext(CheckloginContext)

  return (
    <>
      <Head>
        <title>Learning Dashboard</title>
      </Head>

      <div className={MYS.DbContainerpadding}>
        <div>
          <div className={Mstyles.OnlyMobile}>
            <div style={{ minHeight: '20px' }}></div>
          </div>
          <DbProfileCounter />
        </div>

      </div>

      {Contextdata.GoalStatus &&


        <div>
          <div className={MYS.DbContainerpadding}>
            <div className={MYS.ContainerItemBox}>
              <div className={Mstyles.GridItemHomeDB}>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fce4ec' }} onClick={() => router.push('/MyCourses')}>
                  <div className={Mstyles.HeroBoxTwoItemIcon}>
                    <Image src={`/img/mycourses.png`}
                      alt="image"
                      layout="responsive"
                      placeholder='blur'
                      width={100}
                      height={100}
                      quality={100}
                      blurDataURL={blurredImageData} x

                    />
                  </div>
                  <div className={Mstyles.HeroBoxTwoItemText}>
                    <span>My Courses</span>
                  </div>

                  <div className={Mstyles.BtnWithIcon}>
                    <div>
                      <span>View courses</span>

                    </div>
                    <div>
                      <FiChevronRight size={15} />
                    </div>
                  </div>
                </div>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#e8dfff' }} onClick={() => router.push('/MyTS')}>
                  <div className={Mstyles.HeroBoxTwoItemIcon}>
                    <Image src={`/img/myexam.png`}
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
                    <span>My Tests Series</span>
                  </div>

                  <div className={Mstyles.BtnWithIcon}>
                    <div>
                      <span>Let's Practice</span>

                    </div>
                    <div>
                      <FiChevronRight size={15} />
                    </div>
                  </div>
                </div>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fff0cb' }} onClick={() => router.push('/Results')}>
                  <div className={Mstyles.HeroBoxTwoItemIcon} >
                    <Image src={`/img/notepad.png`}
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
                    <span>My Results</span>
                  </div>

                  <div className={Mstyles.BtnWithIcon}>
                    <div>
                      <span>Start Learning</span>
                    </div>
                    <div>
                      <FiChevronRight size={15} />
                    </div>
                  </div>
                </div>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#b6ffe4' }} onClick={() => router.push(`/StudyMaterials/${Contextdata.MainCat.slug}`)}>
                  <div className={Mstyles.HeroBoxTwoItemIcon}>
                    <Image src={`/img/school.png`}
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

                  <div className={Mstyles.BtnWithIcon}>
                    <div>
                      <span>Explore more</span>

                    </div>
                    <div>
                      <FiChevronRight size={15} />
                    </div>
                  </div>
                </div>
                <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#e8dfff' }} onClick={() => router.push(`/Videos/${Contextdata.MainCat.slug}`)}>
                  <div className={Mstyles.HeroBoxTwoItemIcon} >
                    <Image src={`/img/lecturer.png`}
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
                    <span>Free Video Lectures</span>
                  </div>

                  <div className={Mstyles.BtnWithIcon}>
                    <div>
                      <span>Watch Clasees</span>
                    </div>
                    <div>
                      <FiChevronRight size={15} />
                    </div>
                  </div>
                </div>
                <Link href={'https://erp.driteducation.com/verification/studentdocsverification'}  >
                  <div className={Mstyles.HeroBoxTwoItem} style={{ backgroundColor: '#fff0cb' }}>
                    <div className={Mstyles.HeroBoxTwoItemIcon}>
                      <Image src={`/img/certificate.png`}
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
                      <span>Certificate Verification</span>
                    </div>

                    <div className={Mstyles.BtnWithIcon}>
                      <div>
                        <span>Verify Certificate</span>

                      </div>
                      <div>
                        <FiChevronRight size={15} />
                      </div>
                    </div>
                  </div>

                </Link>


              </div>
            </div>

          </div>

         
          <DbVideolistGridByCatid catid={Contextdata.MainCat.slug} />
          <DbCourselistGridByCatid catid={Contextdata.MainCat.slug} />
          <DbTSlistGridByCatid catid={Contextdata.MainCat.slug} />
          <div style={{ minHeight: '100px' }}></div>
        </div>
      }
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
