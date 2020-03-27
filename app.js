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
const prefectureDataMap = new Map();  // key: 都道府県 value: 集計データのオブジェクト
rl.on('line', (lineString) => {
  const columns = lineString.split(',');
  const year = parseInt(columns[0]);
  const prefecture = columns[1];
  const popu = parseInt(columns[3]);
  if (year === 2010 || year === 2015) {
    let value = prefectureDataMap.get(prefecture);  // 連想配列からデータを取得
    if (!value) {
      value = { 
        popu10: 0,    // 2010年の人口
        popu15: 0,    // 2015年の人口
        change: null  // 人口の変化率
      };
    }
    if (year === 2010) {
      value.popu10 = popu;
    }
    if (year === 2015) {
      value.popu15 = popu;
    }
    prefectureDataMap.set(prefecture, value);
  }
});
// close イベント：すべての行が読み終わった際に呼び出される。
rl.on('close', () => {
  for (let [key, value] of prefectureDataMap) {
    value.change = value.popu15 / value.popu10;
  }
  const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
    return pair2[1].change - pair1[1].change;
  });
  console.log(rankingArray);
});