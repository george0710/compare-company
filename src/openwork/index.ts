import { getNotFountObj, IScrapedData } from "src/common/crawling";
import { Puppeteer } from "src/puppeteer"
import { url } from "./const/env";

export const getOpenwork = async (puppeteer: Puppeteer, keyWords: string[]):Promise<IScrapedData[]> => {
  const p = await puppeteer.newPage(url);
  await p.page.waitFor('#contents');
  const dataList:IScrapedData[] = [];
  
  for(const keyWord of keyWords) {
    await p.inputText(keyWord, 'input[name="src_str"]');
    await p.page.waitFor(2000);
    await p.click('.keywordSearch_button');
    await p.page.waitFor(2000);
    await p.click('.testCompanyList > li a');
    await p.page.waitFor(2000);
  
    await p.page.waitFor('#contentsBody');
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
  const income = document.querySelector('#mainColumn > article:nth-child(3) > div.borderGray.p-20 > dl.mt-n5 > dd > span.fs-22.fw-b')?.textContent || '';
  const paid = document.querySelector('#mainColumn > article:nth-child(1) > div.averageScore > div.averageScore_right > div.jq_horizontalChart.w-200.mt-25.gray > dl.mt-15 > dd > span').textContent;
  const evaluation = document.querySelector('p.totalEvaluation_item:last-child > span').textContent;
  const responseNum = document.querySelector('#mainColumn > article:nth-child(1) > div.averageScore > div.averageScore_right > p > span > span').textContent;
  const overtime = document.querySelector('#mainColumn > article:nth-child(1) > div.averageScore > div.averageScore_right > div.jq_horizontalChart.w-200.mt-25.gray > dl:nth-child(1) > dd > span').textContent;
  return {
    income,
    responseNum,
    evaluation,
    overtime,
    paid,
    url: location.href,
  }
};