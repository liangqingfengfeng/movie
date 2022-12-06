import styles from './index.less';
import { Image, Select } from 'antd';
import { CONSTELLATION } from '@/util/config'
import { useRequest } from 'ahooks'
import { getConstellationInfo } from '@/service/index'
import { useModel } from 'umi'
import { useRef, useState } from 'react';
import classNames from 'classnames';

export type MovieItemType = {
  nm: string,
  cat: string,
  dir: string,
  img: string,
}

type Props = {
  data: MovieItemType,
}

export default function MovieItem(props: Props) {
  const { data } = props;

  return (
    <div className={styles.item}>
      <Image src={data.img} />
      <div>{data.nm}</div>
      <div>{data.cat}</div>
      <div>{data.dir}</div>
    </div>
  );
}
