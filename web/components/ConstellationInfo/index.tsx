import styles from './index.less';
import { useQuery } from '@/util/hooks';
import { Params } from '@/pages/movie';

export default function ConstellationInfo() {
  const { query } = useQuery<Params>();

  return (
    <div className={styles.container}>
      <span>今日幸运数字：{query.luckyNumber}</span>
      <span>今日幸运颜色：{query.luckyColor}</span>
    </div>
  );
}
