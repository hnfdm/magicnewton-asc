### 🎲 MagicNewton Spin Bot

A simple bot to automate rolling dice on [MagicNewton](https://magicnewton.com/portal?referral=1wquyb5g2j948294). The bot logs in using session cookies and proxy also attempts to roll the dice whenever it's available.

### 🚀 Features
- **Automated Dice Rolling** 
- **Credit & Email Display** 
- **Smart Timer** 
- **Multi Account**
- **Proxy Support**
- **Runs in a Loop every 24 hours**

### ✨ DONT FORGET TO FOLLOW AND SHOW YOUR SUPPORT WITH A STAR

### 🛠️ Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/hnfdm/magicnewton-asc.git 
cd magicnewton-asc
```

### 2️⃣ Install dependencies
```sh
npm i
```

### 3️⃣ Edit **Config.json** file

```sh
nano config.json
```

1. Set email address as alias.
2. Set proxy in http/https format
3. Add more account if neeeded

### 4️⃣ Get Your Session Cookies
You need session cookies to stay logged in. Here's how to get them:

1. Open **MagicNewton** in Chrome.
2. Press `F12` or `Ctrl + Shift + I` to open DevTools.
3. Go to the **Application** tab → **Storage** → **Cookies**.
4. Look for the cookie named __Secure-next-auth.session-token.
5. Copy its value.

### 5️⃣ Run the bot
```sh
node main.js
```

### ⚠️ Warning
**Use at your own risk. Automating websites might go against their terms of service.**

### 📝 License
MIT License - feel free to use and modify for your own purposes.
