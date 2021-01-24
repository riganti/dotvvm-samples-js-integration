"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = exports.init = void 0;
function init(context) {
    return __awaiter(this, void 0, void 0, function () {
        var map, connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: {
                            lat: 49.872289,
                            lng: 15.428261
                        },
                        zoom: 8
                    });
                    connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
                    connection.on("newPositions", function (positions) { return onNewPositions(context, positions); });
                    connection.on("notification", function (text) { return onNotification(context, text); });
                    return [4 /*yield*/, connection.start()];
                case 1:
                    _a.sent();
                    context.state['map'] = map;
                    context.state['markers'] = [];
                    context.state['connection'] = connection;
                    // change viewmodel from JS
                    //dotvvm.stateManager.setState({
                    //    Connected: true
                    //});
                    context.viewModel.Connected(true);
                    // init toast notifications
                    $(".toast").toast({ delay: 5000 });
                    return [2 /*return*/];
            }
        });
    });
}
exports.init = init;
var blackIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    strokeColor: "black"
};
var redIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    strokeColor: "red"
};
function onNewPositions(context, positions) {
    var _loop_1 = function (i) {
        var marker = context.state['markers'][i];
        if (!marker) {
            // create a new marker
            marker = new google.maps.Marker({
                position: positions[i],
                icon: blackIcon,
                draggable: false,
                map: context.state['map']
            });
            var id_1 = i + 1;
            marker.addListener("click", function () {
                //context.namedCommands["SelectCourier"](id);
                exports.commands.highlightCourier(context, id_1);
            });
            context.state['markers'][i] = marker;
        }
        else {
            // update marker position
            marker.setPosition(positions[i]);
        }
    };
    // move markers on the map
    for (var i = 0; i < positions.length; i++) {
        _loop_1(i);
    }
}
function onNotification(context, text) {
    context.viewModel.Notification(text);
    $(".toast").toast('show');
}
exports.commands = {
    highlightCourier: function (context, id) {
        var markers = context.state['markers'];
        for (var i = 0; i < markers.length; i++) {
            markers[i].setIcon((i + 1 === id) ? redIcon : blackIcon);
        }
    }
};
