import { getCrawlingSetting } from './crawlingConfig';
import puppeteer, { LoadEvent } from 'puppeteer';

// TODO:: インスタンス化を禁止する。
export class Puppeteer {
  private browser: puppeteer.Browser;
  private page: Page[] = [];

  public static init = async () => {
    const p =  new Puppeteer();
    p.browser = await puppeteer.launch(getCrawlingSetting());
    return p;
  }

  async newPage(url: string):Promise<Page> {
    const page = await Page.init(this.browser, url);
    this.page.push(page);
    return page;
  }

  async close():Promise<void> {
    await this.browser.close();
  }
}

export class Page {
  public page: puppeteer.Page;

  static async init(browser:puppeteer.Browser, url:string):Promise<Page> {
    const p =  new Page();
    p.page = await browser.newPage();
    await p.page.goto(url);
    return p;
  }

  async screenshot(): Promise<void> {
    await this.page.screenshot({path: `${(new Date()).toLocaleString().replace(/[ \/]/g,'-')}.png`});
  }

  async isExistDom(path: string): Promise<boolean> {
    return !!await this.page.$(path);
  }

  async inputText(text: string, selector: string): Promise<void> {
    this.page.type(selector, text);
  }

  async click(selector: string, loadEvent?: LoadEvent[]): Promise<boolean> {
    if (await this.isExistDom(selector)) {
      await Promise.all([
        this.page.waitForNavigation({waitUntil: loadEvent ?? ['load', 'networkidle2']}),
        this.page.click(selector),
      ]);
      return true;
    }
    return false;
  }

  // async getFrameBySelector(selector: string): Promise<puppeteer.Frame> {
  //   const frames = await this.page.frames();
  //   const frame = frames.find(async f => !!await f.$(selector));
  //   return frame;
  // }
}