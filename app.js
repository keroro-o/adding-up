// 【要件定義】
// １．ファイルからデータを読み取る
// ２．2010年と2015年のデータを選ぶ
// ３．都道府県ごとの変化率を計算する
// ４．変化率毎に並べる
// ５．並べられたものを表示する

'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({
  'input': rs,
  'output': {}
});
rl.on('line', (lineString) => {
  const columns = lineString.split(',');
  const year = parseInt(columns[0]);
  const prefecture = columns[1];
  const popu = parseInt(columns[3]);
  if (year === 2010 || year === 2015) {
    console.log(year);
    console.log(prefecture);
    console.log(popu);
  }
});