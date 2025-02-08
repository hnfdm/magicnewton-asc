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
```sh
node main.js
```