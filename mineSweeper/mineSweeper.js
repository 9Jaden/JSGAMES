// 渲染游戏区域
// 二维数组
let buttonArr = Array(16)
  .fill("")
  .map(() => Array(16).fill({}));
const renderMineSweeper = () => {
  document.querySelector("div").innerHTML = "";
  buttonArr.forEach((item, index) => {
    let ul = document.createElement("ul");
    // 给ul加上自定义属性 !要用标签的dataset加属性，不能直接加或者用setAttribute否则无效
    ul.dataset.y = index;
    item.forEach((item2, index2) => {
      let button = document.createElement("button");
      // 给button加上自定义属性
      button.dataset.x = index2;
      // 这里取bombNum为9的原因是，最大可能周围8个格子都是地雷
      if (item2.bombNum == 9) {
        // z为地雷(9)或者有标记数字格子(1)的识别
        button.dataset.z = 9;
      } else {
        // 不是地雷
        item2.bombNum = 0;
      }
      ul.appendChild(button);
    });
    document.querySelector("div").appendChild(ul);
  });
};
renderMineSweeper();

// 地雷生成
// 1. 地雷坐标数组生成
const bombIndex = () => {
  let bombArr = [];
  function makeBombs() {
    while (bombArr.length < 40) {
      // 利用Math.random()随机生成
      const x = Math.floor(Math.random() * 16);
      const y = Math.floor(Math.random() * 16);
      bombArr.push([y, x]);
    }
    if (bombArr.length === 40) {
      // 数组去重
      let obj = {};
      bombArr.forEach((item) => (obj[item] = item));
      bombArr = Object.values(obj);
    }
    if (bombArr.length === 40) {
      return bombArr;
    }
    makeBombs();
  }
  makeBombs();
  return bombArr;
};
// 2. 渲染地雷
const renderBombs = (bombArr) => {
  bombArr.forEach((item) => {
    // 把对应的button的属性进行更改，记为地雷
    // 需要深拷贝
    buttonArr = JSON.parse(JSON.stringify(buttonArr));
    buttonArr[item[0]][item[1]].bombNum = 9;
  });
};
const bombArr = bombIndex();
renderBombs(bombArr);
renderMineSweeper();

// 遍历所有格子添加炸弹数字：获取该格子的neighbors--->遍历neighbors累加bombNums--->button内加span展示bombNums
const renderNums = () => {
  // 遍历按钮数组
  buttonArr.forEach((item, index) => {
    item.forEach((item2, index2) => {
      if (item2.bombNum == 0) {
        // 因为炸弹的bombNum为9，所以获取不为炸弹的初始格子
        let ul = document.querySelectorAll("ul")[index];
        let button = ul.querySelectorAll("button")[index2];
        // 获取该格子周围炸弹数目
        getBombNum(item2, ul, button);
        // 如果该格子周围有炸弹
        if (item2.bombNum < 9 && item2.bombNum > 0) {
          // 有标记数字格子的标识
          button.dataset.z = 1;
          const span = document.createElement("span");
          span.innerText = item2.bombNum;
          // 默认看不见
          span.style.display = "none";

          button.appendChild(span);
        }
      }
    });
  });
};
// 获取周围一圈格子地雷数
let neighborArr = [];

const ulList = document.querySelectorAll("ul");
const getBombNum = (item2, ul, button) => {
  neighborArr = [];
  const y = ul.dataset.y;
  const x = button.dataset.x;
  getNeighbors(x, y);
  neighborArr.forEach((item) => {
    // 如果邻居里有炸弹则bombNum++
    if (item.dataset.z == 9) {
      item2.bombNum++;
    }
  });
};

console.log(ulList);
// 获取单个格子周围的邻居
function getNeighbors(x, y) {
  // 分情况讨论
  // 1. 第一排的格子考虑前两排即可
  if (y == 0) {
    for (let i = 0; i < 2; i++) {
      // 利用ulList获得按钮
      const buttons1 = ulList[i].querySelectorAll("button");
      // 利用x差别绝对值是否小于等于1来选出邻居buttons
      let neighbors1 = Array.from(buttons1).filter(
        (item) => Math.abs(item.dataset.x - x) <= 1
      );
      neighborArr.push(...neighbors1);
    }
  }
  // 2. 中间区域的格子，考虑上、自身、下三排的格子
  else if (y >= 1 && y < 15) {
    for (let i = +y - 1; i < +y + 2; i++) {
      // 利用ulList获得按钮
      const buttons2 = ulList[i].querySelectorAll("button");
      // 利用x差别绝对值是否小于等于1来选出邻居buttons
      let neighbors2 = Array.from(buttons2).filter(
        (item) => Math.abs(item.dataset.x - x) <= 1
      );
      neighborArr.push(...neighbors2);
    }
  }
  // 3. 最后一排的格子，考虑倒数两排
  else {
    for (let i = 14; i < 16; i++) {
      // 利用ulList获得按钮
      const buttons3 = ulList[i].querySelectorAll("button");
      // 利用x差别绝对值是否小于等于1来选出邻居buttons
      let neighbors3 = Array.from(buttons3).filter(
        (item) => Math.abs(item.dataset.x - x) <= 1
      );
      neighborArr.push(...neighbors3);
    }
  }
}
renderNums();

console.log(buttonArr[9][9].bombNum, neighborArr);

// 鼠标点击事件---左键扫雷&右键标记
let totalArr = []; // 判断是否获胜
ulList.forEach((item) => {
  // 选出每一个按钮都添加点击事件
  item.querySelectorAll("button").forEach((item2) => {
    // 一、左键点击
    item2.addEventListener("click", function () {
      // 点击效果
      this.classList.add("clicked");
      // 1. 如果含有span即含有数字，显示
      if (this.querySelector("span")) {
        this.querySelector("span").style.display = "block";
      }
      totalArr.push(this); // 这里this是触发点击事件的button
      // 2. 如果是地雷
      // 注意不能用全等号，因为是string对比number
      if (item2.dataset.z == 9) {
        item2.classList.add("bomb");
        setTimeout(function () {
          alert("BOMB!游戏失败!");
          location.reload();
        }, 200);
      }
      // 3. 如果是空白格子（通过z判别，数字的z为1，炸弹为9，而空白没有赋予z，只赋予了bombNum为0）
      if (!item2.dataset.z) {
        let blankArr = [];
        clickBlank(item2);
        function clickBlank(item) {
          // 获取当前点击的坐标
          const y = item.parentNode.dataset.y;
          const x = item.dataset.x;
          // 调用获取格子周围邻居的函数
          neighborArr = [];
          getNeighbors(x, y);
          neighborArr.forEach((neighbor) => {
            // 不是炸弹的都显示已点击
            if (neighbor.dataset.z != 9) {
              neighbor.classList.add("clicked");
            }
            // 数字格子显示
            if (neighbor.querySelector("span")) {
              neighbor.querySelector("span").style.display = "block";
            }
            // 全部加入已点击数组
            totalArr.push(neighbor);
            // 如果neighbor里有空白格，则加入blank数组
            if (
              !neighbor.dataset.z &&
              neighbor != item &&
              !neighbor.dataset.check
            ) {
              blankArr.push(neighbor);
              neighbor.dataset.check = true;
            }
          });
          //   if (blankArr) {
          //     let blankArr2 = blankArr.filter((x) => x != item);
          //     while (blankArr2) {
          //       let blank = blankArr2.shift();
          //       clickBlank(blank, blankArr2);
          //     }
          //   }
        }
        // 空白arr除掉自己后递归调用点击空白事件
        // function filterMe() {
        //   const blankArr2 = blankArr.filter((item) => item != item2);
        //   blankArr2.forEach((item) => {
        //     clickBlank(item);
        //   });
        // }
        while (blankArr) {
          let blank = blankArr.shift();
          clickBlank(blank);
        }
      }
      // 4. 判断是否胜利
      const totalArr2 = [...new Set(totalArr)];
      // filter掉地雷格子
      const totalArr3 = totalArr2.filter((item) => item.dataset.z != 9);
      // 一共有256-40=216个格子即可
      if (totalArr3.length == 216) {
        alert("Congrats!你赢啦！");
        location.reload();
      }
    });
    // 二、右键点击(contextmenu事件)
    item2.addEventListener("contextmenu", function () {
      // 未点击且没有插旗子
      if (
        !this.classList.contains("flag") &&
        !this.classList.contains("clicked")
      ) {
        this.classList.add("flag");
      } else {
        this.classList.remove("flag");
      }
    });
  });
});

// EXTRA---屏蔽浏览器默认右键弹出菜单
document.oncontextmenu = function (e) {
  if (window.event) {
    e = window.event;
  }
  try {
    var one = e.srcElement;
    if (
      !(
        (one.tagName == "INPUT" && one.type.toLowerCase() == "text") ||
        one.tagName == "TEXTAREA"
      )
    ) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
