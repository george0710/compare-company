import { setParams } from "src/common/str";
import { Puppeteer } from "src/puppeteer"
import { url } from "./const/env";

type IScrapedData = {
  // memberNum: string, // 人数
  keyWord: string,
  income: string, // 年収
  responseNum: string, // 回答数
  evaluation: string, // 総合評価
  overtime: string, // 残業時間
  paid: string, // 有給消化率
  url: string,
}

const getNotFountObj = (keyWord: string) => (
  {
    keyWord,
    income: '',
    responseNum: '',
    evaluation: '',
    overtime: '',
    paid: '',
    url: ''
  }
)

export const getCareerConnection = async (puppeteer: Puppeteer, keyWords: string[]):Promise<IScrapedData[]> => {
  const dataList:IScrapedData[] = [];
  const p = await puppeteer.newPage(url);
  
  for(const keyWord of keyWords) {
    const targetUrl = setParams(url, keyWord); 
    await p.page.goto(targetUrl);
    await p.page.waitFor('#search_y');

    if (!await p.click('.result_y > li a')) {
      dataList.push(getNotFountObj(keyWord));
      continue
    };
    await p.page.waitFor(2000);
    if (await p.page.evaluate(() => location.href.includes('google_vignette'))) {
      await p.page.goto(targetUrl);
      await p.page.waitFor('#search_y');
      await p.click('.result_y > li a')
    }
  
    await p.page.waitFor('.pc-contents-main');
    try {
      const data = await p.page.evaluate(getData);
      data.keyWord = keyWord;
      dataList.push(data as IScrapedData);
    } catch (error) {
      dataList.push(getNotFountObj(keyWord));
    }
  }
  return dataList;
}

const getData = ():Partial<IScrapedData> => {
  const income = document.querySelector('.value-main')?.textContent || '';
  const paid = document.querySelector('#main > article > div > section.pc-review-corpseq-overview > div > div:nth-child(2) > div.overview-area__time.i--font-cc-theme_overtime > dl.overview-area__time-list.overview-area__time-list3 > dd > strong').textContent;
  const evaluation = document.querySelector('.pc-rating__average').textContent;
  const responseNum = document.querySelector('.pc-report-header-review-aggregate__report-count > span').textContent;
  const overtime = document.querySelector('#main > article > div > section.pc-review-corpseq-overview > div > div:nth-child(2) > div.overview-area__time.i--font-cc-theme_overtime > dl.overview-area__time-list.overview-area__time-list1 > dd > strong').textContent;
  return {
    income: income.trim(),
    responseNum: responseNum.trim(),
    evaluation: evaluation.trim(),
    overtime: overtime.trim(),
    paid: paid.trim(),
    url: location.href,
  }
};