"use strict";
exports.__esModule = true;
exports.Draw = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var segmented_control_1 = require("@react-native-segmented-control/segmented-control");
var Plot_1 = require("./components/Plot");
var Diagram_1 = require("./components/Diagram");
var styles = react_native_1.StyleSheet.create({
    control: {
        width: 300,
        maxWidth: '90%',
        marginTop: 200,
        height: 50
    },
    container: {
        flex: 1,
        maxHeight: '95%',
        alignItems: 'center',
        padding: 10
    }
});
var Draw = function () {
    var _a = react_1.useState(0), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var onChange = function (event) {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(segmented_control_1["default"], { style: styles.control, fontStyle: {
                fontSize: 20,
                color: 'black'
            }, values: ['Графік', 'Діаграма'], selectedIndex: selectedIndex, onChange: onChange }),
        [
            react_1["default"].createElement(Plot_1.Plot, { max: 3, min: -3, height: 450, width: 450 }),
            react_1["default"].createElement(Diagram_1["default"], null),
        ][selectedIndex]));
};
exports.Draw = Draw;
