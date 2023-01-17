// 找到<canvas>元素
const canvas = document.getElementById("canvas");
// 创建context对象,拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
const ctx = canvas.getContext("2d");
// 获取当前视口宽度和高度并赋值给canvas
let cw = document.documentElement.clientWidth || document.body.clientWidth;
let ch = document.documentElement.clientHeight || document.body.clientHeight;
canvas.width = cw - 30;
canvas.height = ch - 30;

// 屏幕变动时实时监听宽高 onresize事件
window.onresize = function () {
  cw = document.documentElement.clientWidth || document.body.clientWidth;
  ch = document.documentElement.clientHeight || document.body.clientHeight;
  canvas.width = cw;
  canvas.height = ch;
};

// fillStyle设置或返回用于填充绘画的颜色、渐变或模式
// strokeStyle设置或返回用于笔触的颜色、渐变或模式
ctx.fillStyle = "rgb(251,238,204)";
ctx.strokeStyle = "rgb(250,249,221)";

// 星星构造函数,xy为坐标，r为半径
function Star(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  // 速度-3~3
  this.speedX = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
  this.speedY = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
}

// 给Star对象添加画星星方法
Star.prototype.draw = function () {
  ctx.beginPath(); // 起始一条路径
  // arc创建一个弧/圆【起始角0，结束角2PI】
  // arc(x,y,r,sAngle,eAngle)
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.fill(); // 填充当前绘图（路径）
  ctx.closePath(); // 创建从当前点回到起点的路径
};

// 给Star对象添加移动方法--即改变坐标
Star.prototype.move = function () {
  this.x -= this.speedX;
  this.y -= this.speedY;
  // 碰到边界时反弹（速度取反）
  if (this.x < 0 || this.x > cw) this.speedX *= -1;
  if (this.y < 0 || this.y > ch) this.speedY *= -1;
};

// 创建若干个星星，存储在数组里
const starsArr = [];
for (var i = 0; i < 99; i++) {
  starsArr.push(new Star(cw * Math.random(), ch * Math.random(), 3));
}

// 星星靠近的时候连线，利用moveTo和lineTo
function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY); // 把路径移到画布中的指定点，不创建线条
  ctx.lineTo(endX, endY); // 添加一个新点，然后在画布中创建从该点到最后指定点的线条
  ctx.stroke(); // 绘制已定义的路径
  ctx.closePath();
}

// 鼠标移动带着星星 onmousemove事件
// 画布中隐藏鼠标，给canvas添加cursor为none属性
const mouseStar = new Star(0, 0, 3);
canvas.onmousemove = function (e) {
  mouseStar.x = e.clientX;
  mouseStar.y = e.clientY;
};

// 遍历移动渲染 用setInterval设置星星自己移动
setInterval(() => {
  ctx.clearRect(0, 0, cw, ch); // 清空指定矩形内的指定像素 clearRect(x,y,width,height)
  // 画鼠标星星，因为它不会自动移动所以不用move()
  mouseStar.draw();
  starsArr.forEach((star) => {
    star.move(); // 先移动坐标后画出来
    star.draw();
  });
  // 星星靠近的时候连线
  starsArr.forEach((star, index) => {
    // 确保星星两两之间都可以比较到
    for (let i = index + 1; i < starsArr.length; i++) {
      if (
        Math.abs(star.x - starsArr[i].x) < 50 &&
        Math.abs(star.y - starsArr[i].y) < 50
      ) {
        drawLine(star.x, star.y, starsArr[i].x, starsArr[i].y);
      }
      // 判断和鼠标星星是否需要连线
      if (
        Math.abs(star.x - mouseStar.x) < 50 &&
        Math.abs(star.y - mouseStar.y) < 50
      ) {
        drawLine(star.x, star.y, mouseStar.x, mouseStar.y);
      }
    }
  });
}, 50);

// 鼠标点击生成星星
window.onclick = function (e) {
  for (let i = 0; i < 5; i++) {
    starsArr.push(new Star(e.clientX, e.clientY, 3));
  }
};
