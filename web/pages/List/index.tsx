import Layout from '@/components/Layout';
import { useAppSelector } from '@/store';
import React, { useState } from 'react';
import styles from './index.less';

const list: string[] = [];
for (let i = 0; i < 100000; ++i) {
  list.push(`${i} + ${i}`);
}

const itemHeight = 50;
const listHight = 100000 * 50;
const containerHeight = 400;
const visibleCount = Math.ceil(containerHeight / itemHeight);

function About() {
  const count = useAppSelector(state => state.counter.value);
  const [offset, setOffset] = useState(0);
  const [listData, setListData] = useState(list.slice(0, visibleCount));

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + visibleCount;
    const listData = list.slice(startIndex, endIndex);
    const offset = scrollTop - (scrollTop % itemHeight);
    setOffset(offset);
    setListData(listData);
  };

  return (
    <Layout>
      <div className={styles.container} style={{ height: containerHeight }} onScroll={handleScroll}>
        <div className={styles.phantom} style={{ height: listHight }}></div>
        <div className={styles.list} style={{ transform: `translateY(${offset}px)` }}>
          {listData.map(item => (
            <div className={styles.item} key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export default About;
