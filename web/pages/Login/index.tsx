import Layout from '@/components/Layout';
import LoginForm, { LoginAction } from '@/components/LoginForm';
// import { Image } from 'antd-mobile';
import Image from '@/components/ImageWrapper';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styles from './index.less';

function About() {
  const [imgList, setImgList] = useState<string[]>([]);
  const [imgListHeight, setImgListHeight] = useState(0);
  const loginAction = useMemo(() => {
    if (location.pathname.includes(LoginAction.Login)) {
      return LoginAction.Login;
    } else if (location.pathname.includes(LoginAction.Register)) {
      return LoginAction.Register;
    }
    return LoginAction.Login;
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      setImgListHeight(300 * 10);
    }, 0);
  }, []);

  useEffect(() => {
    setImgList([
      require('../../assert/img/bg1.jpg'),
      require('../../assert/img/bg2.png'),
      require('../../assert/img/bg3.jpg'),
      require('../../assert/img/bg4.jpg'),
      require('../../assert/img/bg5.png'),
      require('../../assert/img/bg1.jpg'),
      require('../../assert/img/bg2.png'),
      require('../../assert/img/bg3.jpg'),
      require('../../assert/img/bg4.jpg'),
      require('../../assert/img/bg5.png'),
    ]);
  }, []);

  return (
    <Layout>
      {/* <Image src={require('@/assert/img/logo.png')} className={styles.logo} />
      <Image src={require('@/assert/img/logo.png')} className={styles.logo} />
      <Image src={require('@/assert/img/logo.png')} className={styles.logo} /> */}
      {/* <div style={{ minHeight: 150 * 3 }}> */}
      <div>
        {imgList.length > 0 &&
          imgList.map(item => (
            <div className={styles.imgWrap} style={{ width: 345, height: 300 }}>
              <Image
                src={item}
                className={styles.logo}
                width={345}
                height={300}
                thumbnail='https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20'
              />
            </div>
            // <Image src={item} className={styles.logo} />
          ))}
      </div>

      <LoginForm action={loginAction} />
      {loginAction === LoginAction.Login && (
        <div className={styles.button} onClick={() => (location.href = '/register')}>
          注册
        </div>
      )}
    </Layout>
  );
}
export default About;
