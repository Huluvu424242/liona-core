![Github CI](https://github.com/Huluvu424242/liona-feeds/workflows/Github%20CI/badge.svg)
[![npm](https://img.shields.io/npm/v/@huluvu424242/liona-feeds.svg)](https://www.npmjs.com/package/@huluvu424242/liona-feeds)
[![npm](https://img.shields.io/npm/dm/@huluvu424242/liona-feeds.svg)](https://www.npmjs.com/package/@huluvu424242/liona-feeds)
[![Donate with paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/huluvu424242)
![Keybase BTC](https://img.shields.io/keybase/btc/huluvu424242)

# liona-feeds
A Node.js module that provided an REST endpoint to receive news feeds.
## Installation 
```sh
npm install @huluvu424242/liona-feeds --save
yarn add @huluvu424242/liona-feeds
bower install @huluvu424242/liona-feeds --save
```
## Usage
### Javascript
```javascript
var feeds = require('@huluvu424242/liona-feeds');
var feedContentJSON = feeds.getFeedData('https://www.tagesschau.de/xml/atom/');
```
```sh
Output should be an response
```
### TypeScript
```typescript
import { getFeedData } from '@huluvu424242/liona-feeds';
console.log(getFeedData('https://www.zdf.de/rss/zdf/nachrichten'))
```
```sh
Output should be an response
```
### AMD
```javascript
define(function(require,exports,module){
  var feedsReader = require('@huluvu424242/liona-feeds');
});
```
## Test 
```sh
npm run test
```
## Demo 
```sh
npm run start
or
node demo/server.js
```
