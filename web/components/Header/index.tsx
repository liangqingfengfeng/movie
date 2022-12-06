import { Image, Swiper } from 'antd-mobile';
import React from 'react';
import styles from './index.less';

const IMAGES = [
  {
    url: require('@/assert/img/bg1.jpg'),
  },
  {
    url: require('@/assert/img/bg2.png'),
  },
  {
    url: require('@/assert/img/bg3.jpg'),
  },
  {
    url: require('@/assert/img/bg4.jpg'),
  },
];

export default function Header() {
  return (
    <div className={styles.header}>
      <Swiper loop>
        {IMAGES.map((item, index) => (
          <Swiper.Item key={index}>
            <div className={styles.content}>
              <Image src={item.url} className={styles.img} />
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
}
