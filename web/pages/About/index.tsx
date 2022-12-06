import Layout from '@/components/Layout';
import VirtualList from '@/components/VirtualList';
import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const list: string[] = [];
for (let i = 0; i < 100000; ++i) {
  list.push(faker.lorem.sentences());
}

function About() {
  const [listData, setListData] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setListData(list);
    }, 500);
  }, []);

  return (
    <Layout>
      <VirtualList
        list={listData}
        itemHeight={50}
        containerHeight={400}
        itemRender={(item: string) => (
          <div key={item} className={styles.item}>
            {item}
          </div>
        )}
      />
    </Layout>
  );
}
export default About;
