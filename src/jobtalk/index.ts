import { getNotFountObj } from "src/common/crawling";
import { setParams } from "src/common/str";
import { IScrapedData } from "src/common/crawling";
import { Puppeteer } from "src/puppeteer"
import { url } from "./const/env";

export const getJobTalk = async (puppeteer: Puppeteer, keyWords: string[]):Promise<IScrapedData[]> => {
  const dataList:IScrapedData[] = [];
  const p = await puppeteer.newPage(url);
  
  for(const keyWord of keyWords) {
    const targetUrl = setParams(url, keyWord); 
    await p.page.goto(targetUrl);
    await p.page.waitFor('.PcTemplate_mainColumn__19miA');

    if (!await p.click('.CompanySearchResultCard_searchResultCard__3snX6 a')) {
      dataList.push(getNotFountObj(keyWord));
      continue
    };
    await p.page.waitFor(2000);
  
    await p.page.waitFor('.PcTemplate_containerMainLeft__18SKy');
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
  const income = document.querySelector('#__next > div > div.PcTemplate_container__Yv6GG.PcTemplate_containerMain__3q6_r > div.PcTemplate_containerMainLeft__18SKy > div:nth-child(6) > div.PcTemplate_salaryScoreSectionMargin__26m0K > div > div.SalaryStatPcSection_title__3FbeM > div > div > p.SalaryScoreHead_emphasize__lcZmv > span')?.textContent || '';
  const paid = document.querySelector('#__next > div > div.CompanyDataPcSection_container__3is9V > div > div.CompanyHeadPC_data__19Sfq > div.CompanyHeadPC_textBox__Pjf-Z > div.CompanyDataBarPC_wrap__3QaXk > ul > li:nth-child(2) > p.CompanyDataBarPC_unit__13C_K > span').textContent;
  const evaluation = document.querySelector('#__next > div > div.CompanyDataPcSection_container__3is9V > div > div.CompanyHeadPC_data__19Sfq > div.CompanyHeadPC_textBox__Pjf-Z > div.CompanyHeadPC_rating__2w8K9 > div > div.RatingStarText_text__34MxF.RatingStarText_large__17Q2F').textContent;
  const responseNum = document.querySelector('#__next > div > div.TabSection_wrap__JyGoR > div > div > ul > li:nth-child(3) > div > a > span').textContent;
  const overtime = document.querySelector('#__next > div > div.CompanyDataPcSection_container__3is9V > div > div.CompanyHeadPC_data__19Sfq > div.CompanyHeadPC_textBox__Pjf-Z > div.CompanyDataBarPC_wrap__3QaXk > ul > li:nth-child(1) > p.CompanyDataBarPC_unit__13C_K > span').textContent;
  return {
    income: income.trim(),
    responseNum: responseNum.trim(),
    evaluation: evaluation.trim(),
    overtime: overtime.trim(),
    paid: paid.trim(),
    url: location.href,
  }
};