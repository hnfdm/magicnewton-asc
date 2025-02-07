console.log(`
█████╗ ██╗██████╗ ██████╗ ██████╗  ██████╗ ██████╗      █████╗ ███████╗ ██████╗
██╔══██╗██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗    ██╔══██╗██╔════╝██╔════╝
███████║██║██████╔╝██║  ██║██████╔╝██║   ██║██████╔╝    ███████║███████╗██║     
██╔══██║██║██╔══██╗██║  ██║██╔══██╗██║   ██║██╔═══╝     ██╔══██║╚════██║██║     
██║  ██║██║██║  ██║██████╔╝██║  ██║╚██████╔╝██║         ██║  ██║███████║╚██████╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝         ╚═╝  ╚═╝╚══════╝ ╚═════╝
`);                                                                           


const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const { HttpsProxyAgent } = require('https-proxy-agent');
const accounts = require('./config.json');

const MAGICNEWTON_URL = "https://www.magicnewton.com/portal/rewards";
const DEFAULT_SLEEP_TIME = 24 * 60 * 60 * 1000; // 24 hours
const RANDOM_ACCOUNT_DELAY = () => Math.floor(Math.random() * (5000 - 2000 + 1) + 2000);

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseTimeString(timeStr) {
  const parts = timeStr.split(':').map(Number);
  if (parts.length !== 3) return null;
  return {
    hours: parts[0],
    minutes: parts[1],
    seconds: parts[2],
    totalMs: (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000
  };
}

async function showLiveCountdown(accountEmail, totalMs) {
  while (totalMs > 0) {
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`⏳ [${accountEmail}] Next roll available in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} `);
    await delay(1000);
    totalMs -= 1000;
  }
  console.log(`\n✅ [${accountEmail}] Time reached! Retrying roll...`);
}

async function handleAccount(account) {
  try {
    console.clear();
    console.log(`🔄 [${account.email}] New cycle started...`);

    let proxyAgent = null;
    if (account.proxy) {
      proxyAgent = new HttpsProxyAgent(account.proxy); 
      console.log(`👁‍🗨 [${account.email}] Via: ${account.proxy}`);
    }

    // Launch Puppeteer and set up proxy via page interceptor
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();

    if (proxyAgent) {
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        request.continue({ ...request, agent: proxyAgent });
      });
    }

    // Load cookies for the account
    if (account.cookies && account.cookies.length > 0) {
      await page.setCookie(...account.cookies);
      console.log(`✅ [${account.email}] Cookies loaded successfully`);
    } else {
      console.log(`❌ [${account.email}] No cookies found. Please run the login step first.`);
      await browser.close();
      return;
    }

    // Open URL
    await page.goto(MAGICNEWTON_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log(`🌐 [${account.email}] Page loaded.`);

    await page.waitForSelector('p.gGRRlH.WrOCw.AEdnq.hGQgmY.jdmPpC', { timeout: 30000 });

    const userEmail = await page.$eval('p.gGRRlH.WrOCw.AEdnq.hGQgmY.jdmPpC', el => el.innerText).catch(() => 'Unknown');
    console.log(`📧 [${account.email}] Logged in as: ${userEmail}`);

    let userCredits = await page.$eval('#creditBalance', el => el.innerText).catch(() => 'Unknown');
    console.log(`💰 [${account.email}] Current Credits: ${userCredits} EC`);

    // Wait for 'Roll now' button and perform action
    const rollNowClicked = await page.$$eval('button', buttons => {
      const target = buttons.find(btn => btn.innerText && btn.innerText.includes("Roll now"));
      if (target) {
        target.click();
        return true;
      }
      return false;
    });

    if (rollNowClicked) {
      console.log(`🎢 [${account.email}] 'Roll now' button clicked!`);
    } else {
      console.log(`⚠️ [${account.email}] 'Roll now' button not found.`);
    }
    await delay(5000);

    // Click 'Let's roll' button
    const letsRollClicked = await page.$$eval('button', buttons => {
      const target = buttons.find(btn => btn.innerText && btn.innerText.includes("Let's roll"));
      if (target) {
        target.click();
        return true;
      }
      return false;
    });

    if (letsRollClicked) {
      console.log(`✅ [${account.email}] 'Let's roll' button clicked!`);
      await delay(5000);

      const throwDiceClicked = await page.$$eval('button', buttons => {
        const target = buttons.find(btn => btn.innerText && btn.innerText.includes("Throw Dice"));
        if (target) {
          target.click();
          return true;
        }
        return false;
      });

      if (throwDiceClicked) {
        console.log(`✅ [${account.email}] 'Throw Dice' button clicked!`);
        console.log(`⏳ [${account.email}] Waiting 20 seconds for dice animation...`);
        await delay(20000);
        userCredits = await page.$eval('#creditBalance', el => el.innerText).catch(() => 'Unknown');
        console.log(`💰 [${account.email}] Updated Credits: ${userCredits}`);
      } else {
        console.log(`⚠️ [${account.email}] 'Throw Dice' button not found.`);
      }
    } else {
      console.log(`👇 [${account.email}] Wait! ROLL not available yet.`);
      const timerText = await page.evaluate(() => {
        const h2Elements = Array.from(document.querySelectorAll('h2'));
        for (let h2 of h2Elements) {
          const text = h2.innerText.trim();
          if (/^\d{2}:\d{2}:\d{2}$/.test(text)) {
            return text;
          }
        }
        return null;
      });

      if (timerText) {
        console.log(`⏱ [${account.email}] Time Left until next ROLL: ${timerText}`);
        const timeData = parseTimeString(timerText);
        if (timeData) {
          await showLiveCountdown(account.email, timeData.totalMs + 5000);
        } else {
          console.log(`⚠️ [${account.email}] Failed to parse timer. Using default sleep time.`);
        }
      } else {
        console.log(`⚠️ [${account.email}] No timer found. Using default sleep time.`);
      }
    }

    await browser.close();

    const extraDelay = RANDOM_ACCOUNT_DELAY();
    console.log(`🔄 [${account.email}] Cycle complete. Sleeping for ${extraDelay / 1000} seconds before starting next account...`);
    await delay(extraDelay);

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

(async () => {
  while (true) {
    for (let account of accounts) {
      await handleAccount(account); // Process each account sequentially
    }
    const nextCycleTime = DEFAULT_SLEEP_TIME + RANDOM_ACCOUNT_DELAY();
    console.log(`\n⏳ Waiting for the next cycle for 24 hours + random delay...`);
    await showNextCycleTimer(nextCycleTime);
  }
})();
