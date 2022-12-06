import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React, { useMemo, useRef, useState } from 'react';
import Image from '../Image';
import styles from './index.less';

type Props = {
  src: string;
  thumbnail: string;
  width?: number;
  height?: number;
  playLoad?: boolean;
  [key: string]: any;
};

export default function ImageWrapper(props: Props) {
  const { src, width, height, playLoad = false, thumbnail, ...prop } = props;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  if (playLoad) {
    return <img src={src} {...prop} />;
  }

  const aspectRatio = useMemo(() => {
    if (width && height) {
      return `${(height / width) * 100}%`;
    }
    return '0%';
  }, []);

  const imageObserver = (entries: any, observer: any) => {
    if (entries?.[0]?.isIntersecting) {
      const current = entries[0].target as HTMLElement;
      setIsVisible(true);
      observer.unobserve(current);
    }
  };

  useIntersectionObserver(ref, imageObserver);
  //'https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20'

  return (
    <div ref={ref} className={styles.imageWrap} style={{ paddingBottom: aspectRatio }}>
      {isVisible && <Image src={src} thumbnail={thumbnail} />}
    </div>
  );
}
