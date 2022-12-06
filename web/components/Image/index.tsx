import classnames from 'classnames';
import React, { useState } from 'react';
import styles from './index.less';

type Props = {
  src: string;
  thumbnail: string;
  alt?: string;
};

export default function Image(props: Props) {
  const { src, thumbnail, alt } = props;
  const [isFullImageLoad, setIsFullImageLoad] = useState(false);

  return (
    <>
      <img
        className={classnames(styles.image, styles.thumbnail, isFullImageLoad ? styles.hidden : '')}
        src={thumbnail}
        alt={alt}
      />
      <img
        className={classnames(styles.image, styles.full, isFullImageLoad ? styles['opacity-1'] : styles['opacity-0'])}
        onLoad={() => setIsFullImageLoad(true)}
        src={src}
        alt={alt}
      />
    </>
  );
}
