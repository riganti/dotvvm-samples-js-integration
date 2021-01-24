/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ "use strict";
/******/ var __webpack_modules__ = ({

/***/ "./wwwroot/app/dashboard-module.ts":
/*!*****************************************!*\
  !*** ./wwwroot/app/dashboard-module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.commands = exports.init = void 0;\r\nfunction init(context) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var map, connection;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    map = new google.maps.Map(document.getElementById('map'), {\r\n                        center: {\r\n                            lat: 49.872289,\r\n                            lng: 15.428261\r\n                        },\r\n                        zoom: 8\r\n                    });\r\n                    connection = new signalR.HubConnectionBuilder().withUrl(\"/hub\").build();\r\n                    connection.on(\"newPositions\", function (positions) { return onNewPositions(context, positions); });\r\n                    connection.on(\"notification\", function (text) { return onNotification(context, text); });\r\n                    return [4 /*yield*/, connection.start()];\r\n                case 1:\r\n                    _a.sent();\r\n                    context.state['map'] = map;\r\n                    context.state['markers'] = [];\r\n                    context.state['connection'] = connection;\r\n                    // change viewmodel from JS\r\n                    //dotvvm.stateManager.setState({\r\n                    //    Connected: true\r\n                    //});\r\n                    context.viewModel.Connected(true);\r\n                    // init toast notifications\r\n                    $(\".toast\").toast({ delay: 5000 });\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    });\r\n}\r\nexports.init = init;\r\nvar blackIcon = {\r\n    path: google.maps.SymbolPath.CIRCLE,\r\n    scale: 10,\r\n    strokeColor: \"black\"\r\n};\r\nvar redIcon = {\r\n    path: google.maps.SymbolPath.CIRCLE,\r\n    scale: 10,\r\n    strokeColor: \"red\"\r\n};\r\nfunction onNewPositions(context, positions) {\r\n    var _loop_1 = function (i) {\r\n        var marker = context.state['markers'][i];\r\n        if (!marker) {\r\n            // create a new marker\r\n            marker = new google.maps.Marker({\r\n                position: positions[i],\r\n                icon: blackIcon,\r\n                draggable: false,\r\n                map: context.state['map']\r\n            });\r\n            var id_1 = i + 1;\r\n            marker.addListener(\"click\", function () {\r\n                //context.namedCommands[\"SelectCourier\"](id);\r\n                exports.commands.highlightCourier(context, id_1);\r\n            });\r\n            context.state['markers'][i] = marker;\r\n        }\r\n        else {\r\n            // update marker position\r\n            marker.setPosition(positions[i]);\r\n        }\r\n    };\r\n    // move markers on the map\r\n    for (var i = 0; i < positions.length; i++) {\r\n        _loop_1(i);\r\n    }\r\n}\r\nfunction onNotification(context, text) {\r\n    context.viewModel.Notification(text);\r\n    $(\".toast\").toast('show');\r\n}\r\nexports.commands = {\r\n    highlightCourier: function (context, id) {\r\n        var markers = context.state['markers'];\r\n        for (var i = 0; i < markers.length; i++) {\r\n            markers[i].setIcon((i + 1 === id) ? redIcon : blackIcon);\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://jsintegrationdemo/./wwwroot/app/dashboard-module.ts?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	if(__webpack_module_cache__[moduleId]) {
/******/ 		return __webpack_module_cache__[moduleId].exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ // startup
/******/ // Load entry module
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ __webpack_require__("./wwwroot/app/dashboard-module.ts");
