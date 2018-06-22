require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = readFileAsync;
/* harmony export (immutable) */ __webpack_exports__["b"] = writeFileAsync;
/* unused harmony export readDirAsync */
/* unused harmony export existsSyncAsync */
/* unused harmony export createDirectorys */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mkdirp__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mkdirp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mkdirp__);



/**
 * Native async / await for reading file in node
 * @param {String} path - fs.readFile path
 * @param {String} opts - fs.readFile options
 */
function readFileAsync(path, opts = 'utf8') {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFile(path, opts, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

/**
 * Native async / await for writing file in node
 * @param {String} path - fs.readFile path
 * @param {String} data - file content
 * @param {String} opts - fs.readFile options
 */
function writeFileAsync(path, data, opts = 'utf8') {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_fs___default.a.writeFile(path, data, opts, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

/**
 * Native async / await for reading directorys in node
 * @param {String} path - fs.readFile path
 */
function readDirAsync(path) {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_fs___default.a.readdir(path, (err, filenames) => {
      if (err) {
        return reject(err);
      }

      return resolve(filenames);
    });
  });
}

/**
 * Native async / await for checking if file exists in node
 * @param {String} path - fs.readFile path
 */
function existsSyncAsync(path) {
  return new Promise((resolve, reject) => {
    const exists = __WEBPACK_IMPORTED_MODULE_0_fs___default.a.existsSync(path);
    return exists ? resolve(true) : reject(false);
  });
}

/**
 * Native async / await for creating directorys in node
 * @param {String} dir - directorys path
 */
function createDirectorys(dir) {
  return new Promise((resolve, reject) => {
    try {
      __WEBPACK_IMPORTED_MODULE_0_fs___default.a.exists(dir, async exists => {
        if (!exists) {
          await __WEBPACK_IMPORTED_MODULE_1_mkdirp___default()(dir);
        }

        return resolve(dir);
      });
    } catch (error) {
      return reject(`Failed to create directory ${dir}`);
    }
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_fetch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_node_fetch__);


/**
 * Fetches HTML string from desired page
 *
 * @param {String} url - Website url
 * @returns {String} HTML string
 */
/* harmony default export */ __webpack_exports__["a"] = (async function fetchHTML(url) {
  try {
    const res = await __WEBPACK_IMPORTED_MODULE_0_node_fetch___default()(url, { timeout: 3000 });
    const html = await res.text();
    return html;
  } catch (error) {
    return error;
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cron__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_nameScraper__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__database__ = __webpack_require__(16);






// https://github.com/facebook/react/issues/812#issuecomment-172929366
process.env = JSON.parse(JSON.stringify(process.env));

const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const CronJob = __WEBPACK_IMPORTED_MODULE_1_cron___default.a.CronJob;
// Tasks runs every day at 12:00 AM
// new CronJob(
//   '0 0 0 * * *',
//   async () => {
//     await initScraper();
//     console.log('Icelandic name scraper finished scaping data at: ', new Date().toDateString());
//   },
//   null,
//   true,
//   'Atlantic/Reykjavik'
// );

//initScraper();

// Connect to Postgresql database
Object(__WEBPACK_IMPORTED_MODULE_4__database__["a" /* dbQuery */])('SELECT * from bin limit 10');

/**
 * Gets all names
 */
app.get('/names', async (req, res) => {
  try {
    const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names.json');

    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names_backup.json');

      return res.status(200).json(JSON.parse(data));
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

/**
 * Gets all boys names
 */
app.get('/names/boys', async (req, res) => {
  try {
    const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names.json');
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.boys);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names_backup.json');
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData.boys);
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

/**
 * Gets all girls names
 */
app.get('/names/girls', async (req, res) => {
  try {
    const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names.json');
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.girls);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names_backup.json');
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData.girls);
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

/**
 * Gets all middle names
 */
app.get('/names/middle', async (req, res) => {
  try {
    const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names.json');
    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData.middle);
  } catch (error) {
    // If names.json dosen't exist
    if (error.code === 'ENOENT') {
      const data = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__["a" /* readFileAsync */])('./data/names_backup.json');
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData.middle);
    }

    return res.status(500).json('Ups.. something went wrong');
  }
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cron");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__declensionScraper__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_fetchHtml__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_createUUID__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_fileHelpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_delayPromiseBatches__ = __webpack_require__(14);







const CHEERIO_OPTIONS = { normalizeWhitespace: true };

/**
 * Creates letter indexes and alhpabet array
 * @param {Array} list - list of names object { id: '4n5pxq24kpiob12og9', name: 'Jon', subtitle: 'More info' }
 * @returns {Object}
 */
function getLetterIndexesAndAlhpabet(list) {
  const alphabet = [];
  let i = 0;

  const letterIndexes = list.reduce((acc, curr) => {
    if (acc[curr.name[0]] === undefined) {
      acc[curr.name[0]] = i;
      alphabet.push(curr.name[0]);
    }

    i += 1;
    return acc;
  }, {});

  return {
    alphabet,
    letterIndexes,
    list
  };
}

/**
 * Gets names data from Cheerio parsed html object
 *
 * @param {Function} $ - Cheerio function reference
 * @param {Object} arr - Cheerio parsed html object
 * @returns {Array}
 */
function getDataFromList($, arr) {
  return arr.map((i, el) => {
    if (el.children.length === 0) return;

    const name = $(el.children[0]).text().trim();
    const obj = {
      id: Object(__WEBPACK_IMPORTED_MODULE_3__utils_createUUID__["a" /* default */])(name),
      name,
      verdict: null,
      declesions: null
    };

    if (el.children.length > 1) {
      const subtitle = $(el.children[1]).text().trim();

      if (subtitle) {
        obj.subtitle = subtitle;
      }
    }

    return obj;
  }).toArray();
}

/**
 * Parses html for Icelandic names
 *
 * @param {String} html - Html text string
 * @returns {Promise<Object>}
 */
function parseNamesHtml(html) {
  return new Promise(async (resolve, reject) => {
    try {
      const $ = __WEBPACK_IMPORTED_MODULE_0_cheerio___default.a.load(html, CHEERIO_OPTIONS);
      const nameTypeList = $('.nafnalisti .nametype');
      const boysNamesObj = $(nameTypeList[0]).find('ul.dir li');
      const girlsNamesObj = $(nameTypeList[1]).find('ul.dir li');
      const middleNamesObj = $(nameTypeList[2]).find('ul.dir li');
      let boysNamesList = getDataFromList($, boysNamesObj);
      let girlsNamesList = getDataFromList($, girlsNamesObj);
      let middleNamesList = getDataFromList($, middleNamesObj);
      const boysLen = boysNamesList.length;
      const girlsLen = girlsNamesList.length;
      const middleLen = middleNamesList.length;
      const mergedList = [...boysNamesList, ...girlsNamesList, ...middleNamesList];
      // Add declesions to items in list
      console.log('TempList before');
      const tempList = await getNameDeclesionsForList(mergedList);
      console.log('TempList after');

      // Split list up again. Now with declesions
      boysNamesList = tempList.splice(0, boysLen);
      girlsNamesList = tempList.splice(boysLen, boysLen + girlsLen);
      middleNamesList = tempList.splice(boysLen + girlsLen, boysLen + girlsLen + middleLen);

      return resolve({
        boys: getLetterIndexesAndAlhpabet(boysNamesList),
        girls: getLetterIndexesAndAlhpabet(girlsNamesList),
        middle: getLetterIndexesAndAlhpabet(middleNamesList)
      });
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
}

/**
 * Gets name declesions for every name in list and
 * returns list with new gotten name declesions property
 *
 * @param {Array<Object>} list - Array of objects
 * @returns {Array<Object>}
 */
async function getNameDeclesionsForList(list) {
  try {
    const chunkSize = 10;
    const promises = [];

    // Iterate list and create multiple promises
    for (let i = 0; i < list.length; i += 1) {
      const name = list[i].name;
      promises.push(Object(__WEBPACK_IMPORTED_MODULE_1__declensionScraper__["a" /* default */])(name));
    }

    const declesionsList = await Object(__WEBPACK_IMPORTED_MODULE_5__utils_delayPromiseBatches__["a" /* default */])(promises, chunkSize, 1000);

    for (let i = 0; i < declesionsList.length; i += 1) {
      if (Array.isArray(declesionsList[i]) && declesionsList[i].length > 0) {
        list[i].declesions = declesionsList[i];
      }
    }

    return list;
  } catch (error) {
    return new Error(error);
  }
}

/**
 * Initializes Icelandic names scraper
 */
/* unused harmony default export */ var _unused_webpack_default_export = (async function initScraper() {
  // const test = await getNameDeclension('marteinn');
  // console.log('test', test);
  // return;
  try {
    const url = 'https://www.island.is/mannanofn/leit-ad-nafni/?Nafn=&Stulkur=on&Drengir=on&Millinofn=on';
    const html = await Object(__WEBPACK_IMPORTED_MODULE_2__utils_fetchHtml__["a" /* default */])(url);
    const data = await parseNamesHtml(html);
    await Object(__WEBPACK_IMPORTED_MODULE_4__utils_fileHelpers__["b" /* writeFileAsync */])('./data/names.json', JSON.stringify(data));
    return true;
  } catch (error) {
    throw new Error(error);
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_fetchHtml__ = __webpack_require__(2);



const CHEERIO_OPTIONS = { normalizeWhitespace: true };

/**
 * Parses first response from Árnastofnun.
 * It Gets ID for the current name to make the next request
 *
 * @param {Function} $ - Cheerio function reference
 * @param {Object<Cheerio>} ul - Cherrio object
 * @returns {Number|null} responseVal
 */
function parseNameDeclensionFirstResponse($, ul) {
  let responseVal = null;

  ul.each((i, li) => {
    const arr = $(li).text().trim().toLowerCase().split(' ');

    if (arr.includes('karlmannsnafn') || arr.includes('kvenmannsnafn')) {
      const onClickAttrVal = $(li).find('a').attr('onclick');

      responseVal = onClickAttrVal.match(/\d+/g)[0];
    }
  });

  return responseVal;
}

/**
 * Gets declesions html table row
 * @param {String|Number} trChild - HTML table row number
 * @returns {String}
 */
function getTableRowHtml(trChild) {
  return `.row-fluid div:first-child tr:nth-child(${trChild}) td:nth-child(2) .VO_beygingarmynd`;
}

/**
 * Checks if there are two values in row
 * and parses value from object
 *
 * @param {Function} $ - Cheerio function reference
 * @param {Object} el - Cheerio object instance
 * @returns {String}
 */
function getValuesFromRow($, el) {
  let rowValue = [];

  if (el.length > 1) {
    $(el).each((i, e) => {
      rowValue.push($(e).text());
    });

    rowValue = rowValue.length > 1 ? rowValue.join(' / ') : rowValue;
  } else {
    rowValue = el.text();
  }
  return rowValue;
}

/**
 * Parses name declesions (Beygingar) from html
 *
 * @param {String} html - HTML string
 * @returns {Array<String>} declesionArr
 */
function parseNameDeclensions(html) {
  const declesionArr = [];
  const $ = __WEBPACK_IMPORTED_MODULE_0_cheerio___default.a.load(html, CHEERIO_OPTIONS);
  // Get declesions table row objects
  const nfEl = $(getTableRowHtml(4));
  const þfEl = $(getTableRowHtml(5));
  const þgfEl = $(getTableRowHtml(6));
  const efEl = $(getTableRowHtml(7));
  // Parse text from
  const nf = getValuesFromRow($, nfEl);
  const þf = getValuesFromRow($, þfEl);
  const þgf = getValuesFromRow($, þgfEl);
  const ef = getValuesFromRow($, efEl);
  //console.log(nf, þf, þgf, ef);
  if (nf && þf && þgf && ef) {
    declesionArr.push(nf, þf, þgf, ef);
  }

  return declesionArr;
}

/**
 * Parses, prepares and request name declension data
 *
 * @param {String} html - HTML string
 * @returns {Array<String>|null|Error}
 */
async function prepareNameDeclension(html) {
  let responseVal = null;

  try {
    const $ = __WEBPACK_IMPORTED_MODULE_0_cheerio___default.a.load(html, CHEERIO_OPTIONS);
    const ul = $('ul li');

    if (ul.length > 0) {
      const id = parseNameDeclensionFirstResponse($, ul);
      let nextHtml = null;

      if (id) {
        const url = `http://dev.phpbin.ja.is/ajax_leit.php?q=&id=${id}`;
        nextHtml = await Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetchHtml__["a" /* default */])(url);
      }

      responseVal = nextHtml ? parseNameDeclensions(nextHtml) : null;
    } else {
      responseVal = parseNameDeclensions(html);
    }

    return responseVal;
  } catch (error) {
    return error;
  }
}

/**
 * Fetches HTML for Icelandic name declesion (fallbeygingar)
 *
 * @param {String} name - Name string
 * @returns {Array<String>}
 * @example getNameDeclension('Snær') => [´Snær´, ´Snæ´, ´Snæ´, ´Snæs´]
 */
/* harmony default export */ __webpack_exports__["a"] = (async function getNameDeclension(name) {
  try {
    const url = `http://dev.phpbin.ja.is/ajax_leit.php?q=${encodeURIComponent(name)}`;
    const html = await Object(__WEBPACK_IMPORTED_MODULE_1__utils_fetchHtml__["a" /* default */])(url);
    const parsedHTML = await prepareNameDeclension(html);
    return parsedHTML;
  } catch (error) {
    return null;
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createUUID;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v3__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uuid_v3__);


// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE_UUID = '1b671a64-40d5-491e-99b0-da01ff1f3341';

/**
 * Creates unique ID from string
 * @param {String} str
 * @returns {String} UUID
 * @example createUUID('Name') => 'aca84bc6-021c-3169-a634-52a2761f2ad6'
 */
function createUUID(str) {
  return __WEBPACK_IMPORTED_MODULE_0_uuid_v3___default()(str, MY_NAMESPACE_UUID);
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("uuid/v3");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_splitToChunks__ = __webpack_require__(15);


/* harmony default export */ __webpack_exports__["a"] = (async function delayPromiseBatches(promises, chunkSize, delayMs) {
  try {
    const promisesInChunks = Object(__WEBPACK_IMPORTED_MODULE_0__utils_splitToChunks__["a" /* default */])(promises, chunkSize);
    const resolvedPromiseChunks = [];

    for (let i = 0; i < promisesInChunks.length; i += 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      const tempChunkValues = await Promise.all(promisesInChunks[i]);
      resolvedPromiseChunks.push(tempChunkValues);
      console.log(i, promisesInChunks[i].length);
    }

    const mergedList = [].concat.apply([], resolvedPromiseChunks);
    return mergedList;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = splitToChunks;
/**
 * Splits array into chunks
 * For example splitToChunks([1,2,3,4,5,6,7,8,9], 3)
 *
 * @param {Array} array - Array of anything
 * @param {Number} chunk - Size of chunk
 * @returns {Array<Array>}
 * @example splitToChunks([1,2,3,4,5,6,7,8,9], 3) => [[1,2,3],[4,5,6],[7,8,9]]
 */
function splitToChunks(arr, chunk) {
  const chunkArr = [];

  for (var i = 0; i < arr.length; i = i + chunk) {
    chunkArr.push(arr.slice(i, i + chunk));
  }

  return chunkArr;
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dbQuery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pg__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(18);



const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */];

// Set connection options for Postgresql
const pool = new __WEBPACK_IMPORTED_MODULE_0_pg__["Pool"]({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
});

/**
 * Postgresql pool query for executing queries
 * 
 * @param {String} text - Query text
 * @param {Array} params - Query values
 * @returns {Object}
 */
async function dbQuery(text, params) {
  const start = Date.now();

  try {
    const { rows } = await pool.query(text, params);
    await pool.end();
    const duration = Date.now() - start;

    return { query: text, duration, rows };
  } catch (error) {
    return new Error(error);
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dotenv__);
// Eviromental variables


__WEBPACK_IMPORTED_MODULE_0_dotenv___default.a.config();

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = process.env;

const config = {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
};

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map