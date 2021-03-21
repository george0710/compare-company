export type IScrapedData = {
  keyWord: string,
  income: string, // 年収
  responseNum: string, // 回答数
  evaluation: string, // 総合評価
  overtime: string, // 残業時間
  paid: string, // 有給消化率
  url: string,

  memberNum?: string, // 会社人数
}

export const getNotFountObj = (keyWord: string) => (
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