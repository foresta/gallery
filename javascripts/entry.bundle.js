/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _gesture = __webpack_require__(5);

	var _gesture2 = _interopRequireDefault(_gesture);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var galleryNodes = document.querySelectorAll(".gallery"); //import { Gesture, GestureHandler } from "./js/gesture"

	Array.from(galleryNodes).forEach(function (node) {
	    new _gesture2.default(node);
	});

	var handler = new _gesture.GestureHandler();
	handler.test();

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 * handle touch gesture
	 */

	var Gesture = function () {
	    function Gesture(baseNode) {
	        _classCallCheck(this, Gesture);

	        this.baseNode = baseNode;
	        this.initialize();
	    }

	    _createClass(Gesture, [{
	        key: 'initialize',
	        value: function initialize() {
	            this.baseNode.addEventListener('touchstart', function (event) {
	                console.log('touchstart');
	            });

	            this.baseNode.addEventListener('touchmove', function (event) {
	                console.log('touchmove');
	            });

	            this.baseNode.addEventListener('touchend', function (event) {
	                console.log('touchend');
	            });
	        }
	    }]);

	    return Gesture;
	}();

	exports.default = Gesture;

	var GestureHandler = exports.GestureHandler = function () {
	    function GestureHandler() {
	        _classCallCheck(this, GestureHandler);
	    }

	    _createClass(GestureHandler, [{
	        key: 'test',
	        value: function test() {
	            console.log("handler test");
	        }
	    }]);

	    return GestureHandler;
	}();

/***/ })

/******/ });