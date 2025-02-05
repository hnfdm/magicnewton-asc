# 🎲 MagicNewton Dice Bot (Puppeteer)

A simple Puppeteer bot to automate rolling dice on [MagicNewton](https://www.magicnewton.com/portal/rewards). The bot logs in using session cookies and attempts to roll the dice whenever it's available.

## 🚀 Features
- **Automated Dice Rolling:** 
- **Credit & Email Display:** 
- **Smart Timer:** 
- **Runs in a Loop every 24 hours** 

## 🛠️ Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/hardeeps647/magicnewton-bot.git
cd magicnewton-dice-bot
```

### 2️⃣ Install dependencies
```sh
npm install

```

### 3️⃣ Get Your Session Cookies
You need session cookies to stay logged in. Here's how to get them:

1. Open **MagicNewton** in Chrome.
2. Press `F12` or `Ctrl + Shift + I` to open DevTools.
3. Go to the **Application** tab → **Storage** → **Cookies**.
4. Copy all cookies and save them in a file named `cookies.json` inside the bot folder.

### 4️⃣ Run the bot
```sh
node bot.js
```

## 📌 Notes
- The bot runs **headless** (in the background). Change `headless: true` to `headless: false` if you want to see the browser.
- If the "Roll" button isn't available, the bot will wait and display the countdown timer.
- **Use at your own risk.** Automating websites might go against their terms of service.

## 📝 License
This project is for educational purposes only. Use responsibly.
