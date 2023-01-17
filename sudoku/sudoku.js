const Sudoku = (function () {
  const newArr = () => {
    let arr = new Array(9);
    // arr.forEach((item) => {
    //   item = new Array(9);
    //   item.fill(0, 0, 9);// fill(value, start, end) 且不包含end 所以为9
    // });
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(9);
      arr[i].fill(0, 0, 9); // fill(value, start, end) 且不包含end 所以为9
    }
    return arr;
  };

  const initRow = (firstRow) => {
    for (var i = 0; i < firstRow.length; i++) {
      while (true) {
        let num = Math.floor(Math.random() * 9 + 1);
        if (firstRow.indexOf(num) === -1) {
          firstRow[i] = num;
          break;
        }
      }
    }
  };

  // 此检查方法都只检查sudo中index在自己之前的数有无重复，用于生成sudo
  const checkNum = (num, sudo, row, col) => {
    //  1. row
    for (var i = 0; i < col; i++) {
      if (sudo[row][i] === num) return false;
    }
    // 2. col
    for (var i = 0; i < row; i++) {
      if (sudo[i][col] === num) return false;
    }
    // 3. localSudo
    let index = (col % 3) + (row % 3) * 3; // index计算出该num在local九宫格所处位置[0-8]
    // 遍历local九宫格小于自己index的数查看有无重复
    while (index--) {
      // 先减去row%3/col%3为减去九宫格中相对位置，再加index/3或者index%3为加上新index遍历到的位置
      if (
        sudo[row - (row % 3) + Math.floor(index / 3)][
          col - (col % 3) + (index % 3)
        ] === num
      )
        return false;
    }
    return true;
  };

  const newSudo = () => {
    // sudo为array
    let sudo = newArr();
    initRow(sudo[0]);
    console.log(sudo);
    let count = 0;
    for (var i = 1; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        count = 0;
        while (count < 10) {
          let num = Math.floor(Math.random() * 9 + 1);
          if (checkNum(num, sudo, i, j)) {
            sudo[i][j] = num;
            break;
          } else {
            count++;
          }
        }
        if (count >= 10) {
          if (j === 0) {
            i--;
            j = 8;
          } else {
            j--;
            j--;
          }
        }
      }
    }
    return sudo;
  };

  const checkRow = (num, curSudo, row, col) => {
    for (var i = 0; i < 9; i++) {
      if (curSudo[row][i] == 0) {
        continue;
      }
      // 同row中有重复，且不为自己(i!=col)
      if (curSudo[row][i] == num && i != col) {
        return false;
      }
    }
    return true;
  };

  const checkCol = (num, curSudo, row, col) => {
    for (var i = 0; i < 9; i++) {
      if (curSudo[i][col] == 0) {
        continue;
      }
      if (curSudo[i][col] == num && i != row) {
        return false;
      }
    }
    return true;
  };

  const checkLocalNine = (num, curSudo, row, col) => {
    let i = Math.floor(row / 3) * 3;
    let j = Math.floor(col / 3) * 3;
    for (var k = 0; k < 8; k++) {
      if (curSudo[i + Math.floor(k / 3)][j + (k % 3)] == 0) continue;
      if (
        curSudo[i + Math.floor(k / 3)][j + (k % 3)] == num &&
        row != i + Math.floor(k / 3) &&
        col != j + (k % 3)
      )
        return false;
    }
    return true;
  };

  return {
    newSudo: newSudo,
    checkNum: checkNum,
    checkRow: checkRow,
    checkCol: checkCol,
    checkLocalNine: checkLocalNine,
  };
})();
