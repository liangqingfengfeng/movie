import { SpinLoading } from 'antd-mobile';
import React from 'react';
import styles from './index.less';

export default function GlobalLoading() {
  return (
    <div className={styles.container}>
      <SpinLoading />
    </div>
  );
}
