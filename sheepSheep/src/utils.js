import { WIDTH } from "./config.js";

// 随机生成卡片
export const randomItems = () => {
  const items = [];
  // 定义一个map存储各type卡片的数目
  const numsMap = new Map([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ]);
  let id = 0;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const type = Math.floor(Math.random() * 6); // 0~5共六种卡片类型
      numsMap.set(type, numsMap.get(type) + 1);
      id++;
      const item = {
        id,
        type,
        top: WIDTH * i,
        left: WIDTH * j,
        clickable: false,
        zIndex: 1,
      };
      items.push(item);
    }
  }
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const type = Math.floor(Math.random() * 6); // 0~5共六种卡片类型
      numsMap.set(type, numsMap.get(type) + 1);
      id++;
      const item = {
        id,
        type,
        top: WIDTH * i,
        left: WIDTH * j,
        clickable: false,
        zIndex: 2,
      };
      items.push(item);
    }
  }
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const type = Math.floor(Math.random() * 6); // 0~5共六种卡片类型
      numsMap.set(type, numsMap.get(type) + 1);
      id++;
      const item = {
        id,
        type,
        top: WIDTH * i,
        left: WIDTH * j,
        clickable: false,
        zIndex: 3,
      };
      items.push(item);
    }
  }
  // 遍历numsMap，把每个type都补齐成3的倍数
  for (let [key, value] of numsMap) {
    const remainder = 3 - (value % 3);
    if (remainder !== 3) {
      for (let i = 0; i < remainder; i++) {
        id++;
        const randnTop = Math.floor(Math.random() * 75);
        const randnLeft = Math.floor(Math.random() * 75);
        const item = {
          id,
          type: key,
          top: randnTop % WIDTH < 3 ? randnTop + 4 : randnTop,
          left: randnLeft % WIDTH < 3 ? randnLeft + 4 : randnLeft,
          clickable: false,
          zIndex: id,
        };
        items.push(item);
      }
    }
  }
  return items;
};

// 遍历更新卡片的可点状态
export const adaptClickable = (items) => {
  items = [...items];
  const length = items.length;
  // 首先，全部clickable
  items.forEach((item) => {
    item.clickable = true;
  });
  // 两次遍历把被覆盖的卡片clickable设置为false
  items.forEach((item) => {
    const left = item.left;
    const top = item.top;
    for (let i = 0; i < length; i++) {
      // 首先zIndex要低于item
      if (items[i].zIndex < item.zIndex) {
        const left2 = items[i].left;
        const top2 = items[i].top;
        // 重合情况1：左上角被覆盖
        const coverLT =
          top2 > top &&
          top2 < top + WIDTH &&
          left2 > left &&
          left2 < left + WIDTH;
        // 重合情况2：右上角被覆盖
        const coverRT =
          top2 > top &&
          top2 < top + WIDTH &&
          left2 < left &&
          left2 + WIDTH > left;
        // 重合情况3：左下角被覆盖
        const coverLB =
          top2 < top &&
          top2 + WIDTH > top &&
          left2 > left &&
          left2 < left + WIDTH;
        // 重合情况4：右下角被覆盖
        const coverRB =
          top2 < top &&
          top2 + WIDTH > top &&
          left2 < left &&
          left2 + WIDTH > left;
        // 重合情况5：平行覆盖
        const coverBoundary =
          (top2 === top && left2 >= left && left2 < left + WIDTH) ||
          (top2 === top && left2 <= left && left2 + WIDTH > left) ||
          (left2 === left && top2 <= top && top2 + WIDTH > top) ||
          (left2 === left && top2 >= top && top2 < top + WIDTH);
        if (coverLT || coverRT || coverLB || coverRB || coverBoundary) {
          items[i].clickable = false;
        }
      }
    }
  });
  return items;
};
