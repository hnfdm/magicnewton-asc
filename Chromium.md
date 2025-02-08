#### 1️⃣ Install chromium
```sh
sudo apt-get update && sudo apt-get install -y chromium-browser
```

#### 2️⃣ Install dependencies
```sh
sudo apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  libu2f-udev \
  libv4l-0 \
  libv4l-dev \
  libappindicator1 \
  libxtst6 \
  libpci3 \
  libgdk-pixbuf2.0-dev \
  libnspr4-dev \
  libnss3-dev \
  libatk1.0-dev \
  libatk-bridge2.0-dev
```

#### 3️⃣ Check version

```sh
chromium-browser --version
```