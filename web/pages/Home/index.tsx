import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/store';
import React from 'react';

import styles from './index.less';

function Home() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <div className={styles.container}>
        <Header />
      </div>
    </Layout>
  );
}
export default Home;
