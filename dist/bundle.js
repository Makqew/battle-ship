/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/javascript/gameBoard.js":
/*!*************************************!*\
  !*** ./src/javascript/gameBoard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameBoard\": () => (/* binding */ gameBoard)\n/* harmony export */ });\nconst gameBoard = (shipPlayer, position) => {\r\n    let board = [['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o'],['o', 'o', 'o', 'o']];\r\n    let tooBig = false;\r\n\r\n    let history = [];\r\n    \r\n    if(shipPlayer.direction == 'vertical'){\r\n        for(let i = 0; i < shipPlayer.numOfCells; i++){\r\n            // нужно чтобы shipPlayer.numOfCells пршелся от 0 до конца\r\n            // нужно проверять каждый селл на то что он ставится на не нулевое место или не после конца массива\r\n            // проверка начинается с позиции j котрую мы выбираем, тоесть не всегда начинается с 0 \r\n\r\n            let j = i + position[0]; // since it is vertical then only change the first value\r\n            let k = position[1];\r\n\r\n            if(board[j]?.[k] != null){\r\n            // operator \"?.\" checks if \"board[j]\"(row) is not null(if not it will check the \"board[j][k]\" (every cell), the next level of arr)\r\n                board[j][k] = 1; //placing 1\r\n            }\r\n            else{// if it so then it will return undefined or null. OR too big in our case\r\n                tooBig = true;\r\n                i = shipPlayer.numOfCells // goes to the end to stop the loop\r\n            }\r\n        }  \r\n    }else {\r\n        for(let i = 0; i < shipPlayer.numOfCells; i++){\r\n            // нужно чтобы shipPlayer.numOfCells пршелся от 0 до конца\r\n            // нужно проверять каждый селл на то что он ставится не не нулевое место(то есть не после конца массива)\r\n            // проверка начинается с позиции k котрую мы выбираем, тоесть не всегда начинается с 0 \r\n\r\n            let j = position[0]; \r\n            let k = i + position[1]; // since it is horizontal then only change the second value\r\n\r\n            if(board[j]?.[k] != null){\r\n            // the operator \"?.\"\" checks if \"board[j]\"(column) is not null(if not it will check the board[j][k], the next level of arr)\r\n                board[j][k] = 1;\r\n            }\r\n            else{// if it so then it will return undefined or null. OR too big in our case\r\n                tooBig = true;\r\n                i = shipPlayer.numOfCells // goes to the end to stop the loop\r\n            }\r\n        }\r\n    }\r\n\r\n    const getTooBig = () => {return tooBig};\r\n\r\n    const receiveAttack = (x, y) => {\r\n        let hitted = false;\r\n\r\n        // checking if the coordinates was already been the ones that hitted\r\n        for(let i = 0; i < history.length; i++){\r\n            if(history[i][0] == x && history[i][1] == y){ hitted = true; }\r\n        }\r\n\r\n        // checkin if there was not hitted coordinates before or this is the first time\r\n        if(hitted == false || history.length == 0){\r\n            if(board[x][y] == 1){\r\n                shipPlayer.hit();\r\n            } else{\r\n                console.log('Miss')\r\n            }\r\n            // save used coordinates \r\n            history.push(x,y);\r\n            board[x][y] = 'x'\r\n        }\r\n        else{\r\n            console.log('Already hitted here, choose another coordinates');\r\n        } \r\n    }\r\n\r\n    return {get board(){return board}, getTooBig, receiveAttack, get history(){ return history}}\r\n}\n\n//# sourceURL=webpack://battle-ship/./src/javascript/gameBoard.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/javascript/gameBoard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/javascript/ship.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/javascript/player.js\");\n\r\n\r\n\r\n\r\n\r\n//CREATING THE GAMEBOARD DYNAMICALLY\r\n// let cell = document.createElement('div');\r\n// cell.classList.add('cell');\r\n\r\n// let row = document.createElement('div');\r\n// row.classList.add('row');\r\n\r\n// let column = document.createElement('div');\r\n// column.classList.add('column');\r\n\r\n// for(let i = 0; i < 4; i++){\r\n//     for(let j = 0; j < 4; j++){\r\n//         row.appendChild(cell)\r\n//     }\r\n//     column.appendChild(row)\r\n// }\r\n\r\n// let main = document.querySelector('#player1');\r\n// main.appendChild(column)\r\n\r\n// let nameOfPlayer = prompt('give a name');\r\n// alert(nameOfPlayer);\r\nlet ship1 = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.ship)(3,0,false, 'vertical');\r\nlet ship2 = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.ship)(3,0,false, 'vertical');\r\n\r\n// let player1 = player(nameOfPlayer,ship1,1)\r\n\r\nlet playerBoard = document.getElementById('player');\r\nlet boardRow = playerBoard.getElementsByClassName('row');\r\n\r\n//to show the cell placement prototype\r\nconst borderOver = (cellElement, rowElement) => {\r\n    return function (event){\r\n        let positionX = cellElement.indexOf(event.currentTarget);\r\n        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class \"char\"\r\n        if(ship1.direction == 'horizontal'){\r\n            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board BY X\r\n                for(let i = 0; i < ship1.numOfCells; i++){\r\n                    cellElement[positionX].style.border = \"1px solid red\";\r\n                    positionX += 1;\r\n                }\r\n            }\r\n            \r\n        } else {\r\n            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board BY Y\r\n                positionX += 1; // since the count starts from 0 but we need to choose first element\r\n                for(let j = 0; j < ship1.numOfCells; j++){\r\n                    let targetElement = rowElement[positionY].children[positionX]; // First we choose the row then the cell in that row\r\n                    targetElement.style.border = \"1px solid red\";\r\n                    positionY += 1;\r\n                }\r\n            }\r\n            \r\n        }\r\n\r\n\r\n    }   \r\n}\r\n\r\n//to make the cell default after \"borderOver\" function\r\nfunction borderOut(cellElement, rowElement){\r\n    return function (event){\r\n        let positionX = cellElement.indexOf(event.currentTarget);\r\n        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class \"char\"\r\n\r\n        if(ship1.direction == 'horizontal'){\r\n            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board\r\n                for(let i = 0; i < ship1.numOfCells; i++){\r\n                    cellElement[positionX].style.border = \"1px solid white\";\r\n                    positionX += 1;\r\n                }\r\n            }\r\n        } else {\r\n            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board\r\n                positionX += 1; // since the count starts from 0 but we need to choose first element\r\n                for(let j = 0; j < ship1.numOfCells; j++){\r\n                    let targetElement = rowElement[positionY].children[positionX]; // First we choose the row then the cell in that row\r\n                    targetElement.style.border = \"1px solid white\";\r\n                    positionY += 1;\r\n                }\r\n            }\r\n            \r\n        }\r\n    }   \r\n}\r\n\r\n//placing the ship\r\nfunction fillBorder(cellElement, rowElement){\r\n    return function(event){\r\n        console.log(\"cellElement:\")\r\n        let positionX = cellElement.indexOf(event.currentTarget);\r\n        let positionY = this.parentNode.getElementsByClassName('char')[0].innerHTML-1;// getting position by div with class \"char\"\r\n\r\n        // need this 2 vars to not to change the initial positions\r\n        let counterX = positionX;\r\n        let counterY = positionY\r\n\r\n\r\n        // console.log(cellElement.length - positionY >= ship1.numOfCells)\r\n        // console.log(firstPlayerBoard)\r\n        console.log(ship1)\r\n\r\n        if(ship1.direction == 'horizontal'){\r\n            if(cellElement.length - positionX >= ship1.numOfCells){// checking if the ship is fit into the board BY X\r\n                for(let i = 0; i < ship1.numOfCells; i++){\r\n                    cellElement[counterX].style.backgroundColor = \"red\";\r\n                    counterX += 1;\r\n                }\r\n                gameStart();\r\n            }\r\n        } else {\r\n            if(cellElement.length - positionY >= ship1.numOfCells){// checking if the ship is fit into the board BY Y\r\n                counterX += 1; // since the count starts from 0 but we need to choose first element\r\n                for(let j = 0; j < ship1.numOfCells; j++){\r\n                    rowElement[counterY].children[counterX].style.backgroundColor = \"red\";// First we choose the row then the cell in that row\r\n                    counterY += 1;\r\n                }\r\n                gameStart();\r\n            }\r\n            \r\n            \r\n        }\r\n\r\n        function gameStart(){\r\n            \r\n            // removing events from cells\r\n            for(let row of boardRow){\r\n                let divArr = row.getElementsByClassName('cell');\r\n                for(let item of divArr){\r\n                    // item.onclick = oneCellBorder(divArr);\r\n                    item.onmouseover = null;\r\n                    item.onmouseout = null;\r\n                }\r\n            }\r\n            // DONT NEED THAT???\r\n            // function oneCellBorder(cellElement){\r\n            //     return function(event){\r\n            //         console.log(cellElement)\r\n            //         let positionX = cellElement.indexOf(event.currentTarget);\r\n\r\n            //         cellElement[positionX].style.border = \"1px solid red\";//need to attach it to second board\r\n            //     }\r\n            // }\r\n\r\n            let firstPlayerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(ship1, [positionY,positionX]);// placing it in database\r\n            let secondPlayerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)(ship2, [0,0]);// placing it in manually\r\n            console.log(\"X:\"+ positionX + \", \" + \"Y:\" + positionY)\r\n            console.log(firstPlayerBoard.board)\r\n            console.log(secondPlayerBoard.board)\r\n\r\n\r\n            // starting the game\r\n            let i = 0;\r\n            do{\r\n                if(i%2 === 0 ){\r\n                    console.log('First')\r\n                } else{\r\n                    console.log('Second')\r\n                    ship1.hit();\r\n                }\r\n                i++;\r\n            }while(ship1.sunk == false)\r\n        }\r\n\r\n    }\r\n}\r\n\r\n// setting events on each cell\r\nfor(let row of boardRow){\r\n    let cells = row.getElementsByClassName('cell'); //get every cell from every row\r\n    for(let elem of cells){\r\n        let cellsArr = Array.from(cells);\r\n\r\n        elem.onmouseover = borderOver(cellsArr, boardRow);\r\n        elem.onmouseout = borderOut(cellsArr, boardRow);\r\n        elem.onclick = fillBorder(cellsArr, boardRow);\r\n    }\r\n}\r\n\r\n\r\n\r\n// 1. Расставление по очереди\r\n// 2. Выбор ячейки для поподания\r\n// 3. Проверка на поподание\r\n// 4. Изменение вида ячйек\r\n// 5. Конец игры при уничтожении\n\n//# sourceURL=webpack://battle-ship/./src/javascript/index.js?");

/***/ }),

/***/ "./src/javascript/player.js":
/*!**********************************!*\
  !*** ./src/javascript/player.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"player\": () => (/* binding */ player)\n/* harmony export */ });\nconst player = (name, ship, turn) => {\r\n    return {name, ship, turn};\r\n}\n\n//# sourceURL=webpack://battle-ship/./src/javascript/player.js?");

/***/ }),

/***/ "./src/javascript/ship.js":
/*!********************************!*\
  !*** ./src/javascript/ship.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ship\": () => (/* binding */ ship)\n/* harmony export */ });\nconst ship = (numOfCells, numOfHits, sunk, direction) => {\r\n    const hit = () => {\r\n        numOfHits += 1\r\n        isSunk()\r\n    }\r\n    const isSunk = () => {\r\n        if(numOfHits >= numOfCells){\r\n            sunk = true;\r\n        } else {\r\n            sunk = false;\r\n        }\r\n    }\r\n    return {numOfCells, get numOfHits(){return numOfHits}, get sunk(){return sunk}, direction, hit}\r\n}\n\n//# sourceURL=webpack://battle-ship/./src/javascript/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/javascript/index.js");
/******/ 	
/******/ })()
;