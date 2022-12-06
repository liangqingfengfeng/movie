import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';

type Props = {
  itemHeight: number;
  containerHeight: number;
  moreRatio?: number;
  list: any[];
  itemRender: (data: any) => React.ReactNode;
};

type Position = {
  index: number;
  top: number;
  height: number;
  bottom: number;
};

function VirtualList(props: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const { itemHeight, containerHeight, itemRender, moreRatio = 0.6, list } = props;
  // 计算可视数量
  const visibleCount = useMemo(() => Math.ceil(containerHeight / itemHeight), [containerHeight, itemHeight]);
  // 初始化展示数量
  const [listData, setListData] = useState<any[]>([]);
  // 初始偏移量
  const [offset, setOffset] = useState(0);
  // 缓存每一项位置信息
  const [position, setPosition] = useState<Position[]>([]);
  // 计算列表高度
  const listHight = position[position.length - 1]?.bottom || 0;

  const getStartIndex = (scrollTop: number, position: Position[]) => {
    let left = 0;
    let right = position.length - 1;
    let index = null;

    while (left <= right) {
      let mid = left + ((right - left) >> 1);
      let bottom = position[mid].bottom;

      if (scrollTop === bottom) {
        return mid + 1;
      } else if (scrollTop > bottom) {
        left = mid + 1;
      } else {
        if (index === null || index > mid) {
          index = mid;
        }
        right = mid - 1;
      }
    }
    return index;
  };

  const getOffset = (startIndex: number, position: Position[]) => {
    return startIndex >= 1 ? position[startIndex - 1].bottom : 0;
  };

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    const startIndex = getStartIndex(scrollTop, position);
    if (startIndex) {
      const endIndex = startIndex + visibleCount;
      const listData = list.slice(startIndex, endIndex);
      const offset = getOffset(startIndex, position);
      setOffset(offset);
      setListData(listData);
    }
  };

  const updateItemPosition = (nodes: NodeListOf<ChildNode>) => {
    nodes.forEach(item => {
      const node = item as Element;
      const rect = node.getBoundingClientRect();
      const index = Number(node.id);
      const initRect = position[index];
      const currentHeight = rect.height;
      const prevHeight = initRect.height;
      const diff = currentHeight - prevHeight;
      if (diff) {
        position[index].bottom += diff;
        position[index].height = currentHeight;
        for (let i = index + 1; i < position.length; ++i) {
          position[i].top = position[i - 1].bottom;
          position[i].bottom += diff;
        }
      }
    });
  };

  useEffect(() => {
    setListData(list.slice(0, visibleCount));
    const position = list.map((_, index) => ({
      index,
      top: index * itemHeight,
      height: itemHeight,
      bottom: (index + 1) * itemHeight,
    }));
    setPosition(position);
  }, [list]);

  useEffect(() => {
    if (listRef.current) {
      if (listRef.current.childNodes && listRef.current.childNodes.length) {
        const nodes = listRef.current.childNodes;
        updateItemPosition(nodes);
      }
    }
  }, [listData]);

  return (
    <div className={styles.container} style={{ height: containerHeight }} onScroll={handleScroll}>
      <div className={styles.phantom} style={{ height: listHight }}></div>
      <div ref={listRef} className={styles.list} style={{ transform: `translateY(${offset}px)` }}>
        {listData &&
          listData.length > 0 &&
          listData.map((item: any, index) => (
            <div id={`${index}`} key={index}>
              {itemRender(item)}
            </div>
          ))}
      </div>
    </div>
  );
}
export default VirtualList;
