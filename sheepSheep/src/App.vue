<script setup>
import { ref } from "vue";
import items from "./items.js";
import images from "./images.js";
import { adaptClickable, randomItems } from "./utils.js";
import { GAME_STATE } from "./config.js";

// 卡片可点状态更改
const itemsArr = ref(adaptClickable(items));
// 卡片总数目
const totalNums = ref(items.length);
// 已点击的卡片列表
const clicked = ref([]);
// 已点击的卡片数量
let clickedNums = 0;
// 游戏状态
const gameState = ref(GAME_STATE.NOT_START);

const start = ({ dynamic = false }) => {
  gameState.value = GAME_STATE.PENDING;
  clicked.value = [];
  clickedNums = 0;
  // 是否是动态的生成地图
  if (dynamic) {
    const newItems = randomItems();
    itemsArr.value = adaptClickable(newItems);
    totalNums.value = newItems.length;
  } else {
    itemsArr.value = adaptClickable(items);
    totalNums.value = items.length;
  }
};

const clickItem = (item) => {
  if (item.clickable && gameState.value === GAME_STATE.PENDING) {
    // 确认卡片可点且游戏未结束
    // 已点卡片数加一
    clickedNums += 1;
    // 再次更新卡片可点击状态，并且要filter掉当前点击卡片
    itemsArr.value = adaptClickable(
      itemsArr.value.filter((x) => x.id !== item.id)
    );
    // 寻找已点击列表中是否有相同type的卡片，有则放在一起
    const sameType = clicked.value.findIndex((x) => x.type === item.type);
    if (sameType !== -1) {
      // 用splice方法插入该item
      clicked.value.splice(sameType, 0, item);
    } else {
      // 没有同类型则直接push进去
      clicked.value.push(item);
    }
  }
  // 用定时器判断是否可以消除，游戏是否失败或成功
  setTimeout(() => {
    // 1.判断是否可以消除
    for (let i = 0; i < clicked.value.length - 2; i++) {
      if (clicked.value[i].type === clicked.value[i + 2].type) {
        clicked.value.splice(i, 3);
      }
    }
    // 2.判断游戏是否失败
    if (clicked.value.length === 7) {
      gameState.value = GAME_STATE.FAIL;
    }
    // 3.判断游戏是否成功
    if (clickedNums === totalNums.value) {
      // 如果是第一关通过的
      if (clickedNums === items.length) {
        start({ dynamic: true });
      } else {
        gameState.value = GAME_STATE.SUCCESS;
      }
    }
  }, 300);
};
</script>

<template>
  <div class="bg">
    <div class="container">
      <div
        v-for="item in itemsArr"
        :key="item.id"
        :class="item.clickable ? 'item' : 'item gray'"
        :style="`top: ${item.top}vw; left: ${item.left}vw; z-index: ${item.zIndex}`"
        @click="() => clickItem(item)"
      >
        <img :src="images[item.type]" class="item-img" />
      </div>
    </div>
    <div class="bar">
      <div v-for="item in clicked" :key="item.id" class="item bar-item">
        <img :src="images[item.type]" class="item-img" />
      </div>
    </div>
    <div class="game" v-if="gameState !== GAME_STATE.PENDING">
      <div class="text" v-if="gameState === GAME_STATE.SUCCESS">恭喜过关</div>
      <div class="text" v-if="gameState === GAME_STATE.FAIL">挑战失败</div>
      <div class="button" @click="start">
        {{ gameState === GAME_STATE.NOT_START ? "开始游戏" : "再玩一次" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  overflow: hidden;
}
.container {
  position: relative;
  margin: 20vh auto 0;
  width: 87.5vw;
  height: 87.5vw;
}
.item {
  position: absolute;
  width: 10.2vw;
  height: 10.2vw;
  padding: 1vw;
  border: 0.5vw solid black;
  border-radius: 10%;
  background-color: white;
}
.bar-item {
  position: static;
}
.gray {
  filter: grayscale(100%);
}
.item-img {
  width: 10.2vw;
  height: 10.2vw;
}
.bar {
  height: 12.5vw;
  width: 90vw;
  padding: 1vw;
  border: 1vw solid black;
  border-radius: 5vw;
  margin: 10vh auto;
  display: flex;
}
.text {
  padding: 2vw 0 10vw;
  text-align: center;
  font-size: 20px;
}
.game {
  position: fixed;
  width: 50vw;
  top: 30vh;
  left: 20vw;
  background: white;
  z-index: 9999;
  padding: 5vw;
  border: 3px solid black;
  border-radius: 10px;
}
.button {
  width: 50vw;
  height: 15vw;
  font-size: 20px;
  text-align: center;
  line-height: 15vw;
  border: 3px solid black;
  border-radius: 10px;
}
</style>
