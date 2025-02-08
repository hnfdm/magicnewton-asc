### 🎲 MagicNewton Spin Bot

A simple bot to automate rolling dice on [MagicNewton](https://magicnewton.com/portal?referral=1wquyb5g2j948294). The bot logs in using session cookies and proxy also attempts to roll the dice whenever it's available.

### 🚀 Features
- *Automated Dice Rolling* 
- *Credit & Email Display* 
- *Smart Timer* 
- *Multi Account*
- *Proxy Support*
- *Runs in a Loop every 24 hours*

### ✨ DONT FORGET TO FOLLOW AND SHOW YOUR SUPPORT WITH A STAR

### 🛠️ Installation

#### 1️⃣ Clone repository
```sh
git clone https://github.com/hnfdm/magicnewton-asc.git 
```

#### 2️⃣ Enter & install dependencies
```sh
cd magicnewton-asc && npm i fs https-proxy-agent puppeteer readline
```

#### 3️⃣ Edit **Config.json** file

```sh
nano config.json
```

- Set email address as alias.
- Set proxy in http/https format
- Add more account if neeeded

#### 4️⃣ Get Your Session Cookies
You need session cookies to stay logged in. Here's how to get them:

- Open **MagicNewton** in Chrome.
- Press `F12` or `Ctrl + Shift + I` to open DevTools.
- Go to the **Application** tab → **Storage** → **Cookies**.
- Look for the cookie named __Secure-next-auth.session-token.
- Copy its value.

#### 5️⃣ Run the bot
- For Linux GUI
```sh
node mainL.js
```
- For VPS
```sh
node mainV.js
```

### 🛒 Prerequisite
- Chromium (App not docker)
- Read Chromium.md for install
- Proxy

### ⚠️ Warning
**Use at your own risk. Automating websites might go against their terms of service.**

### 📝 License
MIT License - feel free to use and modify for your own purposes.
