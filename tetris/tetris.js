// 游戏table渲染
const tableArr = Array.from({ length: 13 }, (item) =>
  Array.from({ length: 9 }, (item) => (item = {}))
);

const renderTable = () => {
  document.querySelector("table").innerHTML = "";
  tableArr.forEach((item, index) => {
    let tr = document.createElement("tr");
    tr.dataset.y = index;
    item.forEach((item2, index2) => {
      let td = document.createElement("td");
      td.dataset.x = index2;
      tr.appendChild(td);
    });
    document.querySelector("table").appendChild(tr);
  });
};
renderTable();

// 方块构造：有O I S/Z L/J T七种初始
// 对每个方块有一个存储右、下、左可至范围的数组
function blockO(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 1, 0];
  this.nextRange = [1, 1, 0];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y][this.x + 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y], [this.x + 1]],
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x + 1]],
    ];
  };
  this.next = blockO;
}
function blockI0(x, y) {
  this.x = x;
  this.y = y;
  this.range = [0, 3, 0];
  this.nextRange = [2, 1, 1];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 2][this.x].block = i;
    tableArr[this.y + 3][this.x].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y + 1], [this.x]],
      [[this.y + 2], [this.x]],
      [[this.y + 3], [this.x]],
    ];
  };
  this.next = blockI1;
}
function blockI1(x, y) {
  this.x = x;
  this.y = y;
  this.range = [2, 1, 1];
  this.nextRange = [0, 3, 0];
  this.render = function (i) {
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x - 1].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
    tableArr[this.y + 1][this.x + 2].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x - 1]],
      [[this.y + 1], [this.x + 1]],
      [[this.y + 1], [this.x + 2]],
    ];
  };
  this.next = blockI0;
}
function blockS0(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 1, 1];
  this.nextRange = [0, 2, 1];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y][this.x + 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x - 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y], [this.x + 1]],
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x - 1]],
    ];
  };
  this.next = blockS1;
}
function blockS1(x, y) {
  this.x = x;
  this.y = y;
  this.range = [0, 2, 1];
  this.nextRange = [1, 1, 1];
  this.render = function (i) {
    tableArr[this.y][this.x - 1].block = i;
    tableArr[this.y + 1][this.x - 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 2][this.x].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x - 1]],
      [[this.y + 1], [this.x - 1]],
      [[this.y + 1], [this.x]],
      [[this.y + 2], [this.x]],
    ];
  };
  this.next = blockS0;
}
function blockZ0(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 1, 1];
  this.nextRange = [1, 2, 0];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y][this.x - 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y], [this.x - 1]],
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x + 1]],
    ];
  };
  this.next = blockZ1;
}
function blockZ1(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 2, 0];
  this.nextRange = [1, 1, 1];
  this.render = function (i) {
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
    tableArr[this.y][this.x + 1].block = i;
    tableArr[this.y + 2][this.x].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x + 1]],
      [[this.y], [this.x + 1]],
      [[this.y + 2], [this.x]],
    ];
  };
  this.next = blockZ0;
}
function blockL0(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 2, 0];
  this.nextRange = [1, 2, 1];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 2][this.x].block = i;
    tableArr[this.y + 2][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y + 1], [this.x]],
      [[this.y + 2], [this.x]],
      [[this.y + 2], [this.x + 1]],
    ];
  };
  this.next = blockL1;
}
function blockL1(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 2, 1];
  this.nextRange = [1, 3, 0];
  this.render = function (i) {
    tableArr[this.y + 2][this.x].block = i;
    tableArr[this.y + 2][this.x - 1].block = i;
    tableArr[this.y + 2][this.x + 1].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 2], [this.x]],
      [[this.y + 2], [this.x - 1]],
      [[this.y + 2], [this.x + 1]],
      [[this.y + 1], [this.x + 1]],
    ];
  };
  this.next = blockL2;
}
function blockL2(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 3, 0];
  this.nextRange = [1, 2, 1];
  this.render = function (i) {
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
    tableArr[this.y + 2][this.x + 1].block = i;
    tableArr[this.y + 3][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x + 1]],
      [[this.y + 2], [this.x + 1]],
      [[this.y + 3], [this.x + 1]],
    ];
  };
  this.next = blockL3;
}
function blockL3(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 2, 1];
  this.nextRange = [1, 2, 0];
  this.render = function (i) {
    tableArr[this.y + 1][this.x - 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
    tableArr[this.y + 2][this.x - 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 1], [this.x - 1]],
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x + 1]],
      [[this.y + 2], [this.x - 1]],
    ];
  };
  this.next = blockL0;
}
function blockJ0(x, y) {
  this.x = x;
  this.y = y;
  this.range = [0, 2, 1];
  this.nextRange = [1, 2, 1];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 2][this.x].block = i;
    tableArr[this.y + 2][this.x - 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y + 1], [this.x]],
      [[this.y + 2], [this.x]],
      [[this.y + 2], [this.x - 1]],
    ];
  };
  this.next = blockJ1;
}
function blockJ1(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 2, 1];
  this.nextRange = [1, 3, 0];
  this.render = function (i) {
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
    tableArr[this.y + 1][this.x - 1].block = i;
    tableArr[this.y + 2][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 1], [this.x]],
      [[this.y + 1], [this.x + 1]],
      [[this.y + 1], [this.x - 1]],
      [[this.y + 2], [this.x + 1]],
    ];
  };
  this.next = blockJ2;
}
function blockJ2(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 3, 0];
  this.nextRange = [1, 2, 1];
  this.render = function (i) {
    tableArr[this.y + 1][this.x].block = i;
    tableArr[this.y + 2][this.x].block = i;
    tableArr[this.y + 3][this.x].block = i;
    tableArr[this.y + 1][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 1], [this.x]],
      [[this.y + 2], [this.x]],
      [[this.y + 3], [this.x]],
      [[this.y + 1], [this.x + 1]],
    ];
  };
  this.next = blockJ3;
}
function blockJ3(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 2, 1];
  this.nextRange = [0, 2, 1];
  this.render = function (i) {
    tableArr[this.y + 1][this.x - 1].block = i;
    tableArr[this.y + 2][this.x - 1].block = i;
    tableArr[this.y + 2][this.x].block = i;
    tableArr[this.y + 2][this.x + 1].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y + 1], [this.x - 1]],
      [[this.y + 2], [this.x - 1]],
      [[this.y + 2], [this.x]],
      [[this.y + 2], [this.x + 1]],
    ];
  };
  this.next = blockJ0;
}
function blockT0(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 1, 1];
  this.nextRange = [1, 1, 0];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y][this.x - 1].block = i;
    tableArr[this.y][this.x + 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y], [this.x - 1]],
      [[this.y], [this.x + 1]],
      [[this.y + 1], [this.x]],
    ];
  };
  this.next = blockT1;
}
function blockT1(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 1, 0];
  this.nextRange = [1, 0, 1];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y - 1][this.x].block = i;
    tableArr[this.y][this.x + 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y - 1], [this.x]],
      [[this.y], [this.x + 1]],
      [[this.y + 1], [this.x]],
    ];
  };
  this.next = blockT2;
}
function blockT2(x, y) {
  this.x = x;
  this.y = y;
  this.range = [1, 0, 1];
  this.nextRange = [0, 1, 1];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y][this.x - 1].block = i;
    tableArr[this.y][this.x + 1].block = i;
    tableArr[this.y - 1][this.x].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y], [this.x - 1]],
      [[this.y], [this.x + 1]],
      [[this.y - 1], [this.x]],
    ];
  };
  this.next = blockT3;
}
function blockT3(x, y) {
  this.x = x;
  this.y = y;
  this.range = [0, 1, 1];
  this.nextRange = [1, 1, 1];
  this.render = function (i) {
    tableArr[this.y][this.x].block = i;
    tableArr[this.y - 1][this.x].block = i;
    tableArr[this.y][this.x - 1].block = i;
    tableArr[this.y + 1][this.x].block = i;
  };
  this.getIndex = function () {
    return [
      [[this.y], [this.x]],
      [[this.y - 1], [this.x]],
      [[this.y], [this.x - 1]],
      [[this.y + 1], [this.x]],
    ];
  };
  this.next = blockT0;
}

// 方块样式渲染
const trList = document.querySelectorAll("tr");
const renderBlock = () => {
  tableArr.forEach((item, index) => {
    item.forEach((item2, index2) => {
      if (item2.block === 1) {
        trList[index].querySelectorAll("td")[index2].classList.add("active");
      } else if (item2.block === 2) {
        trList[index].querySelectorAll("td")[index2].classList.remove("active");
        trList[index].querySelectorAll("td")[index2].classList.add("block");
      } else {
        trList[index].querySelectorAll("td")[index2].className = "";
      }
    });
  });
};
let curBlock = new blockI0(4, 0);
curBlock.render(1);
renderBlock();

// 控制移动
// 要点：向下用depth判断到底与否；左右用try catch实现移动与否，报错则出界
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") {
    down();
  } else if (e.key === "ArrowRight") {
    right();
  } else if (e.key === "ArrowLeft") {
    left();
  } else if (e.key === "ArrowUp") {
    changeUp();
  }
});
const down = () => {
  curBlock.render(0);
  curBlock.y += 1;
  curBlock.render(1);
  renderBlock();
  // 1. 到底了
  if (curBlock.y + curBlock.range[1] == 12) {
    setTimeout(() => {}, 500);
    curBlock.render(2);
    renderBlock(); // 记得渲染
    clearBlocks();
    endOrNot();
    newBlock(); // 立即随机生成新的
  }
  // 2. 碰到其他block
  // 要点：找到现在active的block;判断其下
  for (var i = curBlock.y; i <= curBlock.y + curBlock.range[1]; i++) {
    tableArr[i].forEach((item, index) => {
      if (item.block == 1) {
        if (tableArr[i + 1][index].block == 2) {
          curBlock.render(2);
          renderBlock(); // 记得渲染
          clearBlocks();
          endOrNot();
          if (!tableArr[0].some((item) => item.block == 2)) {
            newBlock(); // 第一排没有灰色格子才生成新的
          }
        }
      }
    });
  }
};
// 获取当前block所含砖块index的函数
function getIndex(block) {
  let indexArr = [];
  for (var i = block.y; i <= block.y + block.range[1]; i++) {
    tableArr[i].forEach((item, index) => {
      if (item.block == 1) {
        indexArr.push([i, index]);
      }
    });
  }
  return indexArr;
}
const right = () => {
  let flag = true;
  let temp = getIndex(curBlock);
  temp.forEach((item) => {
    if (tableArr[item[0]][item[1] + 1].block == 2) flag = false;
  });
  if (flag && curBlock.x + curBlock.range[0] < 8) {
    curBlock.render(0);
    curBlock.x += 1;
    curBlock.render(1);
    renderBlock();
  }
};
const left = () => {
  let flag = true;
  let temp = getIndex(curBlock);
  temp.forEach((item) => {
    if (tableArr[item[0]][item[1] - 1].block == 2) flag = false;
  });
  if (flag && curBlock.x - curBlock.range[2] > 0) {
    curBlock.render(0);
    curBlock.x -= 1;
    curBlock.render(1);
    renderBlock();
  }
};
// 随机生成：有O I S/Z L/J T七种初始
function newBlock() {
  let blockArr = [blockO, blockI0, blockS0, blockZ0, blockL0, blockJ0, blockT0];
  let rndIndex = Math.floor(Math.random() * 7);
  curBlock = new blockArr[rndIndex](4, 0);
  curBlock.render(1);
  renderBlock();
}
// 上键改变形状
function changeUp() {
  let flag = true;
  curBlock.render(0);
  // 判断更改形状是否有重叠
  let preBlock = new curBlock.next(curBlock.x, curBlock.y);
  let indexArr = preBlock.getIndex();
  indexArr.forEach((item) => {
    if (tableArr[item[0]][item[1]].block == 2) flag = false;
  });
  if (flag) {
    // 预演变形是否碰撞
    if (curBlock.x + curBlock.nextRange[0] > 8) {
      curBlock.x -= curBlock.nextRange[0];
    } else if (curBlock.x - curBlock.nextRange[0] < 0) {
      curBlock.x += curBlock.nextRange[2];
    }
    curBlock = new curBlock.next(curBlock.x, curBlock.y);
  }
  curBlock.render(1);
  renderBlock();
}

// 消除与得分
// 两面包夹，从上往下清除，从下往上平移格子
let score = 0;
function clearBlocks() {
  let scoreArr = [];
  tableArr.forEach((item, index) => {
    const clearArr = item.filter((x) => x.block == 2);
    if (clearArr.length == 9) {
      scoreArr.push(clearArr);
      item.forEach((x) => (x.block = 0));
      for (let i = index - 1; i > 0; i--) {
        // 从下往上遍历平移格子
        tableArr[i].forEach((item2, index2) => {
          if (item2.block == 2) {
            item2.block = 0;
            tableArr[i + 1][index2].block = 2;
          }
        });
      }
      renderBlock();
    }
  });
  // 计算得分
  if (scoreArr.length == 1) {
    score += 1;
  } else if (scoreArr.length == 2) {
    score += 4;
  } else if (scoreArr.length == 3) {
    score += 10;
  } else if (scoreArr.length == 4) {
    score += 20;
  }
  document.querySelector(".score").innerHTML = `得分${score}`;
}

// 自动下降以及暂停
let timer = setInterval(() => {
  down();
}, 500);
let timerFlag = true;
document.addEventListener("keydown", function (e) {
  if (timerFlag) {
    if (e.keyCode === 32) {
      clearInterval(timer);
      timerFlag = !timerFlag;
    }
  } else {
    if (e.keyCode === 32) {
      timer = setInterval(() => {
        down();
      }, 500);
      timerFlag = !timerFlag;
    }
  }
});

// 游戏结束
// 第一排的格子里有无灰色
function endOrNot() {
  if (tableArr[0].some((item) => item.block == 2)) {
    clearInterval(timer);
    alert("!!游戏结束!!");
    location.reload();
  }
}
