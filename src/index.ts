import { getCareerConnection } from './careerconnection';
import { getJobTalk } from './jobtalk';
import { getOpenwork } from './openwork';
import {Puppeteer} from './puppeteer';

(async () => {
  const keyWords = [
    '株式会社ネクストビート',
    'ヤフー株式会社',
    'シンプレクス株式会社',
    'アクセンチュア株式会社',
    '株式会社ギフティ',
    'ソフトバンク株式会社',
    '株式会社サマリー',
    '株式会社マネーフォワード',
    'Sansan株式会社',
    '株式会社朝日新聞社',
    '合同会社ＤＭＭ．ｃｏｍ',
    'Quipper Limited',
    '弁護士ドットコム株式会社',
    '株式会社ベガコーポレーション',
    '株式会社サイバーエージェント',
    'GMOペイメントゲートウェイ株式会社',
    '株式会社Cygames',
    '株式会社運動通信社',
    '株式会社キャピタル・アセット・プランニング',
    '株式会社エアークローゼット',
    '株式会社インフキュリオン',
    '株式会社日本M&Aセンター',
    '株式会社f4samurai',
    '株式会社ビットエー',
    '株式会社オプティム',
    '株式会社ラクス',
    '株式会社ゆこゆこ',
    'キラメックス株式会社',
    'グルーヴ・ギア株式会社',
    '株式会社Dirbato',
    'Latona株式会社',
    'みんなのマーケット株式会社',
    '株式会社PLAY',
    'オイシックス・ラ・大地株式会社',
    'マンパワーグループ株式会社',
    '株式会社マイナビ',
    '株式会社ドワンゴ',
    '株式会社Roseau Pensant',
  ];
  const p = await Puppeteer.init();

  // const googleData = await getOpenwork(p, keyWords);
  // const googleData = await getCareerConnection(p, keyWords);
  const googleData = await getJobTalk(p, keyWords);
  googleData.forEach(data => {
    console.log(`${data.keyWord},${data.income},${data.responseNum},${data.evaluation},${data.overtime},${data.paid},${data.url}`)
  })


  await p.close();
})();