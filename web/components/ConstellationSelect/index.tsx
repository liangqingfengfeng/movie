import styles from './index.less';
import { Select } from 'antd';
import { CONSTELLATION } from '@/util/config'
import { useRequest } from 'ahooks'
import { getConstellationInfo } from '@/service/index'
import { useModel } from 'umi'
import { useRef, useState } from 'react';
import classNames from 'classnames';

type Props = {
  onStartBtnClick: () => void
}

export default function ConstellationSelect(props: Props) {
  const { onStartBtnClick } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [constellation, setConstellation] = useState('');
  const { setConstellationInfo, constellationInfo } = useModel('constellation', ({ setConstellationInfo, constellationInfo }) => ({ setConstellationInfo, constellationInfo }));

  const { run } = useRequest(getConstellationInfo, {
    manual: true,
    onSuccess: (result: any) => {
      if (result.msg === 'success') {
        const constellationList = result.newslist;
        constellationList.forEach((item: { type: string, content: string}) => {
          if (item.type === '幸运数字') {
            setConstellationInfo({ luckyNumber: item.content })
          } else if (item.type === '幸运颜色') {
            setConstellationInfo({ luckyColor: item.content })
          }
        })
        
      }
    }
  })

  const handleSelect = (value: string) => {
    setConstellation(value)
    run(value)
  }

  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.toggle(styles['container--animation'])
    }
    location.href = `/movie?luckyNumber=${constellationInfo.luckyNumber}&luckyColor=${constellationInfo.luckyColor}`
    console.log('constellationInfo', constellationInfo)
    // onStartBtnClick();
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.selectBlock}>
        <label>星座：</label>
        <Select options={CONSTELLATION} className={styles.select} onSelect={handleSelect}></Select>
      </div>
      <div className={classNames(styles.button, !constellation ? styles['button--disable'] : '')} onClick={handleClick}>start</div>
    </div>
  );
}
