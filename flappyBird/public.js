// 放置公共方法
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

// 不断移动背景图片
let timer = setInterval(() => {
  moveBackground();
  movePipe();
}, 30);
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
function movePipe(){
    // 1. 创建管道
    createPipe();
    // 2. 移动管道
}
function createPipe(){
    let pipeHeight = randomHeight(100,300);
    let ul = document.querySelector('ul');
    
}