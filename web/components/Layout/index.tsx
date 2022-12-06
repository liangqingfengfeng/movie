import React from 'react';
import styles from './index.less';

type Props = {
  title?: string;
  children: React.ReactNode;
  showHeader?: boolean;
};

function Layout(props: Props) {
  const { title = '星座电影', children, showHeader = true } = props;

  return (
    <div className={styles.container}>
      {showHeader && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
}
export default Layout;
