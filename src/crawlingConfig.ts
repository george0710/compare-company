export const getCrawlingSetting = () => {
  switch (process.env.NODE_ENV) {
    case 'develop':
      return {
        headless: false,
        slowMo: 100,
        args: ['--window-size=1920,1080', '--lang=ja,en-US,en'],
      };
    default:
      return {
        headless: true,
        slowMo: 100,
        args: ['--lang=ja,en-US,en'],
      };
  }
};

export const timeout = 1000 * 10;
