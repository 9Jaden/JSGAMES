let levels = {
  初级: 15,
  中级: 30,
  高级: 45,
};

let sudo; // 完成数独表对应二维数组
let curSudo; // 当前游戏中数独表对应数组
let status = 0;
let time;

// 生成不同难度等级对应的空白格组成的数组，其中每一个blank为一个对象，有row和col两个属性
const randomBlank = (level) => {
  let blankNum = levels[level];
  let blankArr = [];
  for (var i = 0; i < blankNum; i++) {
    let blank = {
      row: Math.floor(Math.random() * 9),
      col: Math.floor(Math.random() * 9),
    };
    let repeat = false;
    // forEach中不能用break
    for (var j = 0; j < blankArr.length; j++) {
      if (blank.row === blankArr[j].row && blank.col === blankArr[j].col) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      blankArr.push(blank);
    } else {
      i--;
    }
  }
  return blankArr;
};

//
const renderSudo = () => {
  let level = document.querySelector(".select").value;
  let blankArr = randomBlank(level);
  try {
    sudo = Sudoku.newSudo();
    status = 1;
    // 复制一份现有数组
    curSudo = new Array(9);
    for (var i = 0; i < sudo.length; i++) {
      curSudo[i] = [];
      for (var j = 0; j < sudo[i].length; j++) {
        curSudo[i].push(sudo[i][j]);
      }
    }
    let gameTable = document.querySelector(".sudoku");
    let inputList = gameTable.children; // children直接获取
    // 先填好空白
    for (var i = 0; i < blankArr.length; i++) {
      let row = blankArr[i].row;
      let col = blankArr[i].col;
      curSudo[row][col] = 0;
    }
    // 填数字
    for (var i = 0; i < curSudo.length; i++) {
      for (var j = 0; j < curSudo[i].length; j++) {
        // 给每一个input添加id
        inputList[j * 9 + i].id = i + "&" + j;
        // 如果是不是空白，把已有数字渲染上去，且设置属性为仅读
        if (curSudo[i][j] != 0) {
          inputList[j * 9 + i].value = curSudo[i][j];
          inputList[j * 9 + i].readOnly = true;
          inputList[j * 9 + i].style.backgroundColor = "";
        } else {
          // blank对应没有value需要填入
          inputList[j * 9 + i].value = "";
          inputList[j * 9 + i].readOnly = false;
          inputList[j * 9 + i].style.backgroundColor = "rgb(177, 202, 242)";
          inputList[j * 9 + i].addEventListener("change", handleChange);
        }
      }
    }
    time = new Date().getTime();
  } catch (e) {
    console.log(e);
  }
};

// blank处输入值后监测、提示
const handleChange = (e) => {
  let element = e.currentTarget;
  let index = element.id.split("&");
  // 将dom节点value值与内置curSudo数组值对应
  // 要用number转型，否则是字符串
  curSudo[index[0]][index[1]] = element.value == "" ? 0 : Number(element.value);
  let reminder = document.querySelector(".reminder").children[0];
  let str = "";
  if (!Sudoku.checkRow(element.value, curSudo, index[0], index[1])) {
    str += `第${Number(index[0]) + 1}行出现冲突`;
  }
  if (!Sudoku.checkCol(element.value, curSudo, index[0], index[1])) {
    str += `<br>第${Number(index[1]) + 1}列出现冲突`;
  }
  if (!Sudoku.checkLocalNine(element.value, curSudo, index[0], index[1])) {
    str += `<br>九宫格内存在冲突`;
  }
  if (str != "") element.style.backgroundColor = "rgb(251,88,77)";
  else element.style.backgroundColor = "rgb(29,185,84)";
  str = str == "" ? "未出现冲突" : str;
  console.log(reminder);
  reminder.innerHTML = str;
};

// 提交答案
const submit = () => {
  if (status != 1) {
    alert("请先进行游戏");
  } else if (!isAnswerFilled()) {
    alert("请先完成游戏");
  } else if (!isAnswerRight()) {
    alert("未正确完成游戏");
  } else if (isAnswerRight() && status == 1) {
    // 计算所用游戏时间
    time = ((new Date().getTime() - time) / 1000 / 60).toFixed(2);
    let reminder = document.querySelector(".reminder").children[0];
    reminder.innerHTML = "恭喜成功完成游戏！";
    status = 0;
    showElement("username-box");
    let timeSpan = document.querySelector(".time");
    timeSpan.innerHTML = time;
    let inputList = document.querySelector(".sudoku").children;
    // 类数组转为数组
    Array.from(inputList).forEach((item) => {
      item.value = "";
      item.style.backgroundColor = "#5a629e";
      item.readOnly = true;
    });
  }
};
const isAnswerRight = () => {
  for (var i = 0; i < curSudo.length; i++) {
    for (var j = 0; j < curSudo[0].length; j++) {
      if (curSudo[i][j] != sudo[i][j]) return false;
    }
  }
  return true;
};
const isAnswerFilled = () => {
  for (var i = 0; i < curSudo.length; i++) {
    for (var j = 0; j < curSudo[0].length; j++) {
      if (curSudo[i][j] == 0) return false;
    }
  }
  return true;
};

//在浏览器界面中展示某个Dom元素
let showElement = function (className) {
  document.getElementsByClassName(className)[0].style.display = "block";
  document.getElementsByClassName("sudoku")[0].style.opacity = 0.5;
  document.getElementsByClassName("info")[0].style.opacity = 0.5;
};
//在浏览器界面中隐藏某个Dom元素
let hideElement = function (className) {
  document.getElementsByClassName(className)[0].style.display = "none";
  document.getElementsByClassName("sudoku")[0].style.opacity = 1;
  document.getElementsByClassName("info")[0].style.opacity = 1;
};

//提交成绩
let submitScore = function () {
  storeGrade();
  hideElement("username-box");
};

//关闭成绩榜单
let closeChart = function (e) {
  hideElement("rank-chart");
};

//打开成绩榜单
let openChart = function () {
  showElement("rank-chart");
  let rankLis = document.getElementsByClassName("rank-li")[0].children;
  let ranks = getRank();
  for (let i = 0; i < ranks.length; i++) {
    rankLis[i].getElementsByClassName("username")[0].innerHTML =
      ranks[i].username;
    rankLis[i].getElementsByClassName("user-time")[0].innerHTML = ranks[i].time;
  }
  // ranks小于10的话不显示
  for (let i = ranks.length; i < 10; i++) {
    rankLis[i].getElementsByClassName("username")[0].innerHTML = "";
    rankLis[i].getElementsByClassName("user-time")[0].innerHTML = "";
  }
  let bestScore = getBestScore();
  document.getElementsByClassName("b-username")[0].innerHTML =
    bestScore.username;
  document.getElementsByClassName("b-time")[0].innerHTML = bestScore.time;
};

//得到最近的十次成绩
// ranks数组里装的都是对象，包含username和time所用时间属性
let getRank = function () {
  let rankStr = "";
  let ranks = [];
  if (localStorage.getItem("rank")) {
    rankStr = localStorage.getItem("rank");
    let rankArr = rankStr.split("||");
    for (let i = 0; i < rankArr.length; i++) {
      let tmp = rankArr[i].split("&");
      ranks.push({
        username: tmp[0].split("=")[1],
        time: tmp[1].split("=")[1],
      });
    }
  }
  return ranks;
};

//得到最好的一次成绩
let getBestScore = function () {
  let bestScoreStr = "";
  if (localStorage.getItem("bestScore")) {
    bestScoreStr = localStorage.getItem("bestScore");
  }
  let bestScore = {
    username: "",
    time: "",
  };
  if (bestScoreStr) {
    let arr = bestScoreStr.split("&");
    let user = arr[0].split("=");
    let time = arr[1].split("=");
    bestScore.username = user[1];
    bestScore.time = time[1];
  }
  return bestScore; // 调用后返回一个对象
};

//保存刚刚提交的成绩，得到最好的一次成绩并保存
let storeRank = function (rank) {
  let ranks = getRank();
  ranks.unshift(rank);
  // 只保留10个，最后的pop出去
  for (let i = 0; i < ranks.length - 10; i++) {
    ranks.pop();
  }
  let rankStr = "";
  for (let i = 0; i < ranks.length; i++) {
    if (rankStr) {
      rankStr += `||username=${ranks[i].username}&time=${ranks[i].time}`;
    } else {
      rankStr = `username=${ranks[i].username}&time=${ranks[i].time}`;
    }
  }
  let bestScore = getBestScore();
  // 更新最好成绩
  for (let i = 0; i < ranks.length; i++) {
    if (ranks[i].time < bestScore.time) {
      bestScore = ranks[i];
    }
  }
  let bestScoreStr = `username=${bestScore.username}&time=${bestScore.time}`;
  localStorage.setItem("bestScore", bestScoreStr);
  localStorage.setItem("rank", rankStr);
};

//处理得到最终成绩并保存
let storeGrade = function () {
  let username = document.getElementsByClassName("username")[0].value;
  let user = {
    username: username,
    time: time,
  };
  storeRank(user);
};