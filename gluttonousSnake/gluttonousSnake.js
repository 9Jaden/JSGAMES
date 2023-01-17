// 1. 游戏区域渲染
let tableArr = Array.from({ length: 16 }, (item) =>
  Array.from({ length: 16 }, (item) => (item = {}))
);
const renderTable = () => {
  document.querySelector("table").innerHTML = "";
  // 依靠array遍历两次依次生成tr和td
  tableArr.forEach((item) => {
    let tr = document.createElement("tr");
    item.forEach((item2) => {
      let td = document.createElement("td");
      tr.appendChild(td);
    });
    document.querySelector("table").appendChild(tr);
  });
};
renderTable();

// 2. 渲染样式构造函数
// 三要素：头部head、身体body以及食物food
const trLsit = document.querySelectorAll("tr");
const renderStyle = () => {
  tableArr.forEach((item, index) => {
    item.forEach((item2, index2) => {
      // head渲染
      if (item2.head === 1) {
        trLsit[index].querySelectorAll("td")[index2].classList.add("head");
      }
      // body渲染
      else if (item2.body === 1) {
        trLsit[index].querySelectorAll("td")[index2].classList.remove("head");
        trLsit[index].querySelectorAll("td")[index2].classList.remove("food");
        trLsit[index].querySelectorAll("td")[index2].classList.add("body");
      }
      // food渲染
      else if (item2.food === 1) {
        trLsit[index].querySelectorAll("td")[index2].classList.add("food");
      }
      // 空白则无样式
      else trLsit[index].querySelectorAll("td")[index2].className = "";
    });
  });
};
// Head头部构造函数
function Head(x, y) {
  this.x = x;
  this.y = y;
  this.render = function (x) {
    tableArr[this.y][this.x].head = x;
  };
}
// Body身体构造函数
function Body(x, y) {
  this.x = x;
  this.y = y;
  this.render = function (x) {
    tableArr[this.y][this.x].body = x;
  };
}
// Food食物构造函数
function Food(x, y) {
  this.x = x;
  this.y = y;
  this.render = function (x) {
    tableArr[this.y][this.x].food = x;
  };
}
// 渲染默认head、body、food
let head0 = new Head(9, 9);
head0.render(1);
let body0 = new Body(9, 10);
body0.render(1);
let food0 = new Food(3, 3);
food0.render(1);
renderStyle();
let bodyArr = [];
bodyArr.push(body0);

// 3. 添加移动功能
// 要点：try和catch判别出界
// 难点：身体移动---精髓：身体中间部分不动，把身体最末端的格子移动到最前端
const up = () => {
  try {
    // 原来的头不要了
    head0.render(0);
    head0.y -= 1;
    // 更改y后重新渲染新格子
    head0.render(1);
  } catch {
    // 出界，游戏失败
    clearInterval(timer);
    alert("oops!你输啦！");
    location.reload();
  }
  // 调用吃食物函数
  eat();
  // 尾部换到头部
  bodyArr[bodyArr.length - 1].render(0);
  bodyArr[bodyArr.length - 1].x = head0.x;
  bodyArr[bodyArr.length - 1].y = head0.y + 1; // 因为原head已经更改
  bodyArr[bodyArr.length - 1].render(1);
  // 数组顺序也要更改
  bodyArr.unshift(bodyArr.pop());
  renderStyle();
  // 调用碰到身体与否的函数
  hitBody();
};
const down = () => {
  try {
    // 原来的头不要了
    head0.render(0);
    head0.y += 1;
    // 更改y后重新渲染新格子
    head0.render(1);
  } catch {
    // 出界，游戏失败
    clearInterval(timer);
    alert("oops!你输啦！");
    location.reload();
  }
  // 调用吃食物函数
  eat();
  // 尾部换到头部
  bodyArr[bodyArr.length - 1].render(0);
  bodyArr[bodyArr.length - 1].x = head0.x;
  bodyArr[bodyArr.length - 1].y = head0.y - 1; // 因为原head已经更改
  bodyArr[bodyArr.length - 1].render(1);
  // 数组顺序也要更改
  bodyArr.unshift(bodyArr.pop());
  renderStyle();
  // 调用碰到身体与否的函数
  hitBody();
};
const left = () => {
  try {
    // 原来的头不要了
    head0.render(0);
    head0.x -= 1;
    // 更改y后重新渲染新格子
    head0.render(1);
  } catch {
    // 出界，游戏失败
    clearInterval(timer);
    alert("oops!你输啦！");
    location.reload();
  }
  // 调用吃食物函数
  eat();
  // 尾部换到头部
  bodyArr[bodyArr.length - 1].render(0);
  bodyArr[bodyArr.length - 1].x = head0.x + 1;
  bodyArr[bodyArr.length - 1].y = head0.y; // 因为原head已经更改
  bodyArr[bodyArr.length - 1].render(1);
  // 数组顺序也要更改
  bodyArr.unshift(bodyArr.pop());
  renderStyle();
  // 调用碰到身体与否的函数
  hitBody();
};
const right = () => {
  try {
    // 原来的头不要了
    head0.render(0);
    head0.x += 1;
    // 更改y后重新渲染新格子
    head0.render(1);
  } catch {
    // 出界，游戏失败
    clearInterval(timer);
    alert("oops!你输啦！");
    location.reload();
  }
  // 调用吃食物函数
  eat();
  // 尾部换到头部
  bodyArr[bodyArr.length - 1].render(0);
  bodyArr[bodyArr.length - 1].x = head0.x - 1;
  bodyArr[bodyArr.length - 1].y = head0.y; // 因为原head已经更改
  bodyArr[bodyArr.length - 1].render(1);
  // 数组顺序也要更改
  bodyArr.unshift(bodyArr.pop());
  renderStyle();
  // 调用碰到身体与否的函数
  hitBody();
};

// 4. 键盘事件绑定,addEventListener与keydown事件
// 要点：声明一个控制下一步操作的变量，比如只能left和right后才能down，不能回头
let formerStep = 0; // 上1下2左3右4
document.addEventListener("keydown", function (e) {
  console.log(e.keyCode);
  // flag控制游戏暂停与否
  if (flag) {
    if (e.key === "ArrowUp") {
      if (formerStep == 0 || formerStep == 3 || formerStep == 4) {
        up();
        formerStep = 1;
      }
    }
    if (e.key === "ArrowDown") {
      if (formerStep == 0 || formerStep == 3 || formerStep == 4) {
        down();
        formerStep = 2;
      }
    }
    if (e.key === "ArrowLeft") {
      if (formerStep == 0 || formerStep == 1 || formerStep == 2) {
        left();
        formerStep = 3;
      }
    }
    if (e.key === "ArrowRight") {
      if (formerStep == 0 || formerStep == 1 || formerStep == 2) {
        right();
        formerStep = 4;
      }
    }
  }
});

// 5. 吃食物相关
// 要点：a. food与head重合后food消失，分数+1；b. 随机生成food且不能与身体重合；c. 生成新body加入bodyArr
let score = 0;
const eat = () => {
  // a. food与head重合后food消失，分数+1
  if (tableArr[head0.y][head0.x].food == 1) {
    tableArr[head0.y][head0.x].food = 0;
    score++;
    // 判断胜利与否，且渲染分数
    winOrNot();
    document.querySelector(".score span").innerHTML = score;
    // b. 吃完后立即生成,随机生成food且不能与身体重合
    while (true) {
      const x = Math.floor(Math.random() * 16);
      const y = Math.floor(Math.random() * 16);
      if (tableArr[y][x].body != 1 && tableArr[y][x].head != 1) {
        tableArr[y][x].food = 1;
        break;
      }
    }
    // 生成新body加入bodyArr
    let newBody = new Body(
      // 直接生成放在最后一个原有的位置即可，因为移动和吃同时进行
      bodyArr[bodyArr.length - 1].x,
      bodyArr[bodyArr.length - 1].y
    );
    newBody.render(1);
    bodyArr.push(newBody);
  }
};

// 5. 碰到身体游戏失败
const hitBody = () => {
  if (tableArr[head0.y][head0.x].body == 1) {
    clearInterval(timer);
    alert("oh!No!吃到自己了！");
    location.reload();
  }
};

// 6. 按键后自动移动&&分数越高速度越快
// 要点：setInterval间歇函数声明timer控制自动移动，clearInterval(timer)就会停止自动移动
let timer;
function autoMove() {
  if (formerStep == 1) {
    up();
  }
  if (formerStep == 2) {
    down();
  }
  if (formerStep == 3) {
    left();
  }
  if (formerStep == 4) {
    right();
  }
}
moveFaster();
function moveFaster() {
  if (score <= 20) {
    timer = setInterval(function () {
      autoMove();
    }, 150);
  } else if (score > 20 && score <= 40) {
    clearInterval(timer); // 先清掉前面的
    timer = setInterval(function () {
      autoMove();
    }, 125);
  } else {
    clearInterval(timer);
    timer = setInterval(function () {
      autoMove();
    }, 100);
  }
}

// 7. 判定游戏胜利
// 要点：通过bodyArr即身体长度判定，256个格子，255个身子即为胜利
const winOrNot = () => {
  if (bodyArr.length == 255) {
    clearInterval(timer);
    alert("OMG!you win!!!!!");
    location.reload();
  }
};

// 8. 空格键暂停
let flag = true;
document.addEventListener("keydown", function (e) {
  event.preventDefault(); // 阻止方向键移动浏览器
  if (flag) {
    if (e.keyCode == 32) {
      clearInterval(timer);
      flag = false;
    }
  } else {
    if (e.keyCode === 32) {
      moveFaster();
      flag = true;
    }
  }
});
