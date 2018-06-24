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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mkdirp__ = __webpack_require__(6);
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

    if (exists) {
      return resolve(true);
    }

    return reject(new Error(false));
  });
}

/**
 * Native async / await for creating directorys in node
 * @param {String} dir - directorys path
 */
function createDirectorys(dir) {
  return new Promise((resolve, reject) => {
    try {
      return __WEBPACK_IMPORTED_MODULE_0_fs___default.a.exists(dir, async exists => {
        if (!exists) {
          await __WEBPACK_IMPORTED_MODULE_1_mkdirp___default()(dir);
        }

        return resolve(dir);
      });
    } catch (error) {
      return reject(error);
    }
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cron__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_fileHelpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_nameScraper__ = __webpack_require__(7);





process.env = JSON.parse(JSON.stringify(process.env));

const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const { CronJob } = __WEBPACK_IMPORTED_MODULE_1_cron___default.a;
const finishedScrapingMessage = 'Icelandic name scraper finished scaping data at: ';

// Tasks runs job as soon as it ticks over to the new month at 00:00 hours
CronJob('0 0 1 * *', async () => {
  await Object(__WEBPACK_IMPORTED_MODULE_3__services_nameScraper__["a" /* default */])();
  /* eslint-disable-next-line no-console */
  console.log(finishedScrapingMessage, new Date().toDateString());
}, null, true, 'Atlantic/Reykjavik');

// IFEE to execute scaper
(async () => {
  await Object(__WEBPACK_IMPORTED_MODULE_3__services_nameScraper__["a" /* default */])();
  /* eslint-disable-next-line no-console */
  console.log(finishedScrapingMessage, new Date().toDateString());
})();

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

// eslint-disable-next-line
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("cron");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__database_icelandic__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_fetchHtml__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_createUUID__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_fileHelpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_splitToChunks__ = __webpack_require__(20);







const CHEERIO_OPTIONS = { normalizeWhitespace: true };

/**
 * Creates letter indexes and alhpabet array
 * @param {Array} list - list of names object
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
    let returnValue;

    if (el.children.length > 0) {
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

      returnValue = obj;
    }

    return returnValue;
  }).toArray();
}

/**
 * Gets name declesions for every name in list and
 * returns list with new property declesions
 *
 * @param {Array<Object>} list - Array of objects
 * @returns {Array<Object>}
 */
async function getNameDeclesionsForList(list) {
  const arr = list;
  const promisesArr = [];
  const valuesArr = [];

  try {
    // Create all promises
    for (let i = 0; i < arr.length; i += 1) {
      promisesArr.push(Object(__WEBPACK_IMPORTED_MODULE_1__database_icelandic__["a" /* default */])(arr[i].name));
    }

    // Split promises into array chunks with 10 items in each chunk
    const promisesChunks = Object(__WEBPACK_IMPORTED_MODULE_5__utils_splitToChunks__["a" /* default */])(promisesArr, 10);

    // Execute parallel 10 promises at a time and
    // wait for each chunk to finish.
    // By doing this we minimize load on the server
    for (let i = 0; i < promisesChunks.length; i += 1) {
      const tempValues = await Promise.all(promisesChunks[i]); // eslint-disable-line no-await-in-loop

      for (let j = 0; j < tempValues.length; j += 1) {
        valuesArr.push(tempValues[j]);
      }
    }

    // Add values from promises to arr
    for (let i = 0; i < valuesArr.length; i += 1) {
      arr[i].declesions = valuesArr[i];
    }

    return arr;
  } catch (error) {
    return new Error(error);
  }
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
      const tempList = await getNameDeclesionsForList(mergedList);

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
      return reject(error);
    }
  });
}

/**
 * Initializes Icelandic names scraper
 */
/* harmony default export */ __webpack_exports__["a"] = (async function initScraper(cb) {
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
/* 8 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_parseDeclesionNameRes__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_capitalizeFirstLetter__ = __webpack_require__(15);




/**
 * Fetches data from database for Icelandic name declesion (fallbeygingar)
 *
 * @param {String} name - Name string
 * @returns {Array<String>}
 */
/* harmony default export */ __webpack_exports__["a"] = (async function getDeclensionByName(str) {
  try {
    // Get declesion by name
    const { rows } = await Object(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */])('SELECT * FROM bin WHERE uppflettiord = $1', [Object(__WEBPACK_IMPORTED_MODULE_2__utils_capitalizeFirstLetter__["a" /* default */])(str)]);

    // Parse response
    const parsedData = Object(__WEBPACK_IMPORTED_MODULE_1__utils_parseDeclesionNameRes__["a" /* default */])(rows);

    return parsedData;
  } catch (error) {
    return new Error(error);
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pg__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(12);



const {
  DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT
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
/* harmony default export */ __webpack_exports__["a"] = (async function dbQuery(text, params) {
  const start = Date.now();

  try {
    const { rows } = await pool.query(text, params);
    const duration = Date.now() - start;

    return { query: text, duration, rows };
  } catch (error) {
    return new Error(error);
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dotenv__);
// Eviromental variables


__WEBPACK_IMPORTED_MODULE_0_dotenv___default.a.config();

const {
  DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT
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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseDeclesionNameRes;
/**
 * Parses Database query response from table bin
 *
 * @param {Array} row
 * @returns {Array} only containing declesions
 * @example parseDeclesionNameRes(rows) => ['Snær','Snæ', 'Snæ', 'Snæs']
 */
function parseDeclesionNameRes(row) {
  const arr = [];

  for (let i = 0; i < row.length; i += 1) {
    const { greiningarstrengur, beygingarmynd } = row[i];

    if (/^NFET$/.test(greiningarstrengur)) {
      arr[0] = beygingarmynd;
    } else if (/^ÞFET$/.test(greiningarstrengur)) {
      arr[1] = beygingarmynd;
    } else if (/^ÞGFET$/.test(greiningarstrengur)) {
      arr[2] = beygingarmynd;
    } else if (/^EFET$/.test(greiningarstrengur)) {
      arr[3] = beygingarmynd;
    }
  }

  return arr;
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = capitalizeFirstLetter;
/**
 * Capitalizes first letter in string
 *
 * @param {String} string
 * @returns {String} with first letter capatalized
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_fetch__ = __webpack_require__(17);
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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createUUID;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v3__ = __webpack_require__(19);
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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("uuid/v3");

/***/ }),
/* 20 */
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

  for (let i = 0; i < arr.length; i += chunk) {
    chunkArr.push(arr.slice(i, i + chunk));
  }

  return chunkArr;
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.map