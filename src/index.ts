import { getCareerConnection } from './careerconnection';
import { getOpenwork } from './openwork';
import {Puppeteer} from './puppeteer';

(async () => {
  const keyWords = [
    'エムスリー株式会社',
    '楽天株式会社',
    '株式会社mediba',
    '株式会社ココナラ',
    '楽天株式会社',
    '株式会社ストライプデパートメント',
    '株式会社インターファクトリー',
    'la belle vie 株式会社',
    'パーソルキャリア株式会社',
    '株式会社ファーストリテイリング',
    '株式会社ユニラボ',
    'ヤフー株式会社',
    'freee株式会社',
    '株式会社ギフティ',
    '株式会社リクルートテクノロジーズ',
    '株式会社インテグリティ',
    '寺田倉庫株式会社',
    'LINE株式会社',
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
  ];
  const p = await Puppeteer.init();

  const googleData = await getCareerConnection(p, keyWords);
  googleData.forEach(data => {
    console.log(`${data.keyWord},${data.income},${data.responseNum},${data.evaluation},${data.overtime},${data.paid},${data.url}`)
  })


  await p.close();
})();