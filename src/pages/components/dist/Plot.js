"use strict";
exports.__esModule = true;
exports.Plot = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var react_native_svg_1 = require("react-native-svg");
var getLimitValues = function (points) {
    var limitX = 0;
    var limitY = 0;
    points.map(function (_a) {
        var x = _a.x, y = _a.y;
        var absX = Math.abs(x);
        var absY = Math.abs(y);
        limitX = limitX < absX ? absX : limitX;
        limitY = limitY < absY ? absX : limitY;
    });
    return { limitX: limitX, limitY: limitY };
};
var formatFunctionPointsSVG = function (points, startX, startY, limitX, limitY) {
    return points.reduce(function (acc, _a) {
        var x = _a.x, y = _a.y;
        return (acc += x * limitX + startX + "," + (-y * limitY + startY) + " ");
    }, '');
};
var formatSpecialNodes = function (points, startX, startY, limitX, limitY) {
    return points.map(function (_a) {
        var x = _a.x, y = _a.y;
        return ({ x: -x * limitX + startX, y: y * limitY + startY });
    });
};
var LineChartLocal = function (_a) {
    var nodes = _a.nodes, width = _a.width, height = _a.height;
    var startY = height / 2;
    var startX = width / 2;
    var _b = getLimitValues(nodes), limitX = _b.limitX, limitY = _b.limitY;
    var scaleX = -startX / limitX;
    var scaleY = -startY / limitY;
    var nodesSvg = formatFunctionPointsSVG(nodes, startX, startY, scaleX, scaleY);
    var specialNodesX = [
        { x: 1, y: 0.125 },
        { x: 1, y: -0.125 },
    ];
    var specialNodesY = [
        { x: -0.125, y: 1 },
        { x: 0.125, y: 1 },
    ];
    var specialNodesArrowX = [
        { x: limitX, y: 0 },
        { x: limitX - 0.25, y: -0.125 },
        { x: limitX - 0.25, y: 0.125 },
    ];
    var specialNodesArrowY = [
        { x: 0, y: limitY },
        { x: -0.125, y: limitY - 0.25 },
        { x: 0.125, y: limitY - 0.25 },
    ];
    var specialSvgX = formatSpecialNodes(specialNodesX, startX, startY, scaleX, scaleY);
    var specialSvgY = formatSpecialNodes(specialNodesY, startX, startY, scaleX, scaleY);
    var specialArrowX = formatSpecialNodes(specialNodesArrowX, startX, startY, scaleX, scaleY);
    var specialArrowY = formatSpecialNodes(specialNodesArrowY, startX, startY, scaleX, scaleY);
    return (React.createElement(react_native_svg_1.Svg, { height: height, width: width },
        React.createElement(react_native_svg_1.Line, { x1: startX, y1: 0, x2: startX, y2: height, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Line, { x1: 0, y1: startY, x2: width, y2: startY, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Line, { x1: specialSvgX[0].x, y1: specialSvgX[0].y, x2: specialSvgX[1].x, y2: specialSvgX[1].y, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Line, { x1: specialSvgY[0].x, y1: specialSvgY[0].y, x2: specialSvgY[1].x, y2: specialSvgY[1].y, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Line, { x1: specialArrowX[0].x, y1: specialArrowX[0].y, x2: specialArrowX[1].x, y2: specialArrowX[1].y, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Line, { x1: specialArrowX[0].x, y1: specialArrowX[0].y, x2: specialArrowX[2].x, y2: specialArrowX[2].y, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Line, { x1: specialArrowY[0].x, y1: specialArrowY[0].y, x2: specialArrowY[1].x, y2: specialArrowY[1].y, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Line, { x1: specialArrowY[0].x, y1: specialArrowY[0].y, x2: specialArrowY[2].x, y2: specialArrowY[2].y, stroke: "black", strokeWidth: "2" }),
        React.createElement(react_native_svg_1.Polyline, { points: nodesSvg, fill: "none", stroke: "blue", strokeWidth: "2" })));
};
var getNodes = function (myFunction, min, max, interval) {
    if (interval === void 0) { interval = 0.01; }
    var points = [];
    for (var x = min; x <= max; x += interval) {
        var y = myFunction(x);
        points.push({ x: x, y: y });
    }
    return points;
};
exports.Plot = function (_a) {
    var min = _a.min, max = _a.max, width = _a.width, height = _a.height;
    var myFunction = function (x) { return Math.pow(x, 3); };
    var nodes = getNodes(myFunction, min, max);
    return (React.createElement(react_native_1.View, { style: {
            height: 450,
            width: 450,
            marginTop: 100
        } },
        React.createElement(LineChartLocal, { nodes: nodes, width: width, height: height })));
};
