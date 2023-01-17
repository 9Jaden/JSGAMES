let distance = 0; //bg的移动距离
let sw = 320;
let sh = 568;
let inbetween = 100; //创建管道的间隔
let count = 0; //管道的计数
let isDown = true; //判断是否向下飞
let speed = 0; //控制小鸟的速度
let score = 0;

// 判断是否为手机打开,navigator.userAgent为HTTP请求中用户标识
function isPhone() {
  let arr = ["iPhone", "iPad", "Android"];
  let flag = false;
  arr.forEach((item) => {
    if (navigator.userAgent.indexOf(item) != -1) flag = true;
  });
  return flag;
}
// 如果是移动端打开，背景占满屏幕
if (isPhone()) {
  let backGround = document.querySelector(".contain");
  // 重新赋值sw和sh
  sw = document.documentElement.clientWidth + "px";
  sh = document.documentElement.clientHeight + "px";
  backGround.style.width = sw;
  backGround.style.height = sh;
}

// 游戏开始
function startGame() {
  // 全局变量timer
  timer = setInterval(() => {
    moveBackground(); // 不断移动背景图片
    movePipe();
    moveBird();
    checkCrush();
  }, 30);
}

function moveBackground() {
  let backGround = document.querySelector(".contain");
  distance -= 5;
  backGround.style.backgroundPosition = `${distance}px 0`; // 第一个值是水平，第二个值是垂直
}

// 随机函数（用于管道高度）
function randomHeight(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
// 管道移动
function movePipe() {
  // 1. 创建管道
  createPipe();
  // 2. 移动管道
  let ul = document.querySelector("ul");
  let pipes = document.querySelectorAll("li");
  pipes.forEach((pipe) => {
    pipe.style.left = pipe.offsetLeft - 2 + "px"; //不断向左移动
    if (pipe.offsetLeft <= -62) {
      ul.removeChild(pipe); // 移出去后移除
    } // 移动管道同时判定
    if (pipe.offsetLeft + pipe.offsetWidth < 20) {
      // 20为小鸟的left值，说明已经过去了
      if (pipe.getAttribute("notScore") === null) {
        score++; // 添加notScore属性是为了保证一个pipe只加一分
        pipe.setAttribute("notScore", "1");
      }
      setScore();
    }
  });
}
// 设定分数
function setScore() {
  let scoreArr = (score + "").split("");
  let str = "";
  scoreArr.forEach((x) => (str += `<img src="./img/${x}.png">`));
  let scorePart = document.querySelector("#score");
  scorePart.innerHTML = str;
}

function createPipe() {
  count++;
  if (count != inbetween) return; // 控制pipe生成速度
  count = 0;
  let pipeHeight = randomHeight(100, 300);
  let ul = document.querySelector("ul");
  var str = `<li class="top" style="height:${pipeHeight + "px"};left:${
    sw + "px"
  }"><div></div></li><li class="bottom" style="height:${
    sh - pipeHeight - 120 + "px"
  };left:${sw + "px"}"><div></div></li>`;
  ul.insertAdjacentHTML("beforeend", str);
}

// 小鸟移动
function moveBird() {
  let bird = document.querySelector("#bird");
  // 小鸟速度非匀速
  if (isDown) {
    speed += 0.4;
    speed = speed > 8 ? 8 : speed;
  } else {
    speed += 0.7;
    // 形成跳跃效果：点击后速度-8，isDown为false所以speed一直加
    // 当speed加到正后，isDown重回true，且更改小鸟样式为down
    if (speed >= 0) {
      speed = 0;
      isDown = true;
      bird.className = "birdDown";
    }
  }
  bird.style.top = bird.offsetTop + speed + "px"; //小鸟一直下降
  // 判断是否失败
  if (bird.offsetTop < 0 || bird.offsetTop > sh - 30) {
    clearInterval(timer);
    gameOver();
    return;
  }
}
// 给背景添加点击事件，使小鸟可以向上飞
let backGround = document.querySelector(".contain");
backGround.addEventListener("click", function () {
  isDown = false;
  speed = -8; // 上移动8
  let bird = document.querySelector("#bird");
  bird.className = "birdUp"; // 改为向上飞的样式
});
// 附加：移动端触屏事件
backGround.touchstart = function (e) {
  e.preventDefault(); // 阻止默认的双击放大屏幕
  isDown = false;
  speed = -8;
  let bird = document.querySelector("#bird");
  bird.className = "birdUp"; // 改为向上飞的样式
};

// 重新开始游戏
function startAgain() {
  distance = 0;
  count = 0;
  idDown = true;
  speed = 0;
  score = 0;
  setScore(); //初始化分数
  let ul = document.querySelector("ul");
  ul.innerHTML = ""; // 清空管道
  let bird = document.querySelector("#bird");
  bird.style.top = 100 + "px";
  // 重回开始界面
  let start1 = document.querySelector("#start");
  let end = document.querySelector("#end");
  start1.style.display = "block";
  bird.style.display = "none";
  end.style.display = "none";
}

// 碰撞检测
function crushPipe(pipe, bird) {
  let pLeft = pipe.offsetLeft; // 管道到屏幕左侧的距离
  let pTop = pipe.offsetTop;
  let pRight = pLeft + pipe.offsetWidth;
  let pBottom = pTop + pipe.offsetHeight;

  let bLeft = bird.offsetLeft; // 小鸟到屏幕左侧的距离
  let bTop = bird.offsetTop;
  let bRight = bLeft + bird.offsetWidth;
  let bBottom = bTop + bird.offsetHeight;

  if (bRight < pLeft || bLeft > pRight || bTop > pBottom || bBottom < pTop) {
    // 说明未碰撞
    return false;
  } else return true;
}
// 封装检测碰撞函数
function checkCrush() {
  let bird = document.querySelector("#bird");
  let pipes = document.querySelectorAll("li");
  pipes.forEach((pipe) => {
    if (crushPipe(pipe, bird)) {
      clearInterval(timer);
      gameOver();
      return;
    }
  });
}

// 开始界面与结束界面的okButton
let okButton = document.querySelectorAll(".okBtn");
// 开始的：
okButton[0].addEventListener("click", function () {
  let start1 = document.querySelector("#start");
  let bird = document.querySelector("#bird");
  start1.style.display = "none";
  bird.style.display = "block";
  startGame();
});
// 结束的
okButton[1].addEventListener("click", function () {
  startAgain();
});

// 封装游戏结束函数
function gameOver() {
  let end = document.querySelector("#end");
  end.style.display = "block";
  // 把最高分记录保存到本地，利用本地存储
  let scorePart = document.querySelector(".score");
  scorePart.innerHTML = score;
  if (!localStorage.getItem("best")) localStorage.setItem("best", `${score}`);
  else if (localStorage.getItem("best") / 1 < score) {
    localStorage.setItem("best", `${score}`);
  }
  let best = document.querySelector(".best");
  best.innerHTML = localStorage.getItem("best");
}
