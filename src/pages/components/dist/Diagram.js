"use strict";
exports.__esModule = true;
var React = require("react");
var react_native_svg_charts_1 = require("react-native-svg-charts");
var Diagram = function () {
    var data = [
        {
            key: 1,
            amount: 45,
            svg: { fill: '#818181' },
            arc: { padAngle: 0 }
        },
        {
            key: 2,
            amount: 10,
            svg: { fill: '#ff0000' },
            arc: { padAngle: 0 }
        },
        {
            key: 3,
            amount: 5,
            svg: { fill: '#810081' },
            arc: { padAngle: 0 }
        },
        {
            key: 4,
            amount: 15,
            svg: { fill: '#ffff00' },
            arc: { padAngle: 0 }
        },
        {
            key: 5,
            amount: 25,
            svg: { fill: '#9a6630' },
            arc: { padAngle: 0 }
        },
    ];
    return (React.createElement(react_native_svg_charts_1.PieChart, { data: data, innerRadius: '50%', startAngle: -Math.PI * 1.73, valueAccessor: function (_a) {
            var item = _a.item;
            return item.amount;
        }, style: {
            height: 450,
            width: 450,
            marginTop: 100
        } }));
};
exports["default"] = Diagram;
