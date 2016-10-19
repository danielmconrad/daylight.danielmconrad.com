# Daylight
A soothing way to wake up to the time and weather.

![Daylight Preview](http://i.imgur.com/a7lgpxd.jpg)

### Features
* Responsive vertical orientation (horizontal coming soon!) to allow for any resolution TV.
* **Blue** when it's about to rain, **Grey** on the weekend, **Yellow** otherwise.
* 12-hour chart, including precipitation.
* Current conditions update 10 minutes.
* Hourly forecast updates every hour.
* The site will automatically reload every 24 hours to make sure the latest code is always available.

### Usage
Create a free api account at [Weather Underground](https://www.wunderground.com/weather/api/d/pricing.html) and simply use that key in the url below:
https://danmconrad.github.io/daylight/?key=YOUR_API_KEY

### Development

#### Setup 
To install and run the dev server:
```bash
$ git clone https://github.com/danmconrad/daylight.git
$ cd daylight
$ npm install
$ npm start
```

#### Build & Deploy
After making changes to the repo:
```bash
$ git add . && git commit -am "feat: my cool feature"
$ npm run build
$ git add . && git commit -am "chore: build"
$ git push origin
$ npm run deploy
```

The deploy process will checkout a new branch names `gh-pages` and include only the `dist` folder contents in that branch. It will then push up those changes to a remote version of `gh-pages`. Your site is now accessible at http://USERNAME.github.io/daylight.

### Creating a kiosk w/ a Raspberry Pi
Check out the Daylight Kiosk [installation instructions](https://github.com/danmconrad/daylight-kiosk) to turn a TV+Pi into a monitor that automatically turns on and off.

### Query Params
| Param | Values | Default | Description |
| ----- | ------ | ------- | ----------- |
| key | string | null | Wunderground API Key |
| showLocation | 'true', 'false' | false | Will show the autodetected or forced location |
| token | string | null | Alias for 'key' parameter |
| units | 'metric', 'imperial' | 'imperial' | Will show temperatures as F/C, and change the date format |
| zipCode | string | null | A forced location instead of autodetection |
