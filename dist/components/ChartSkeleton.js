'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _victory = require('victory');

var _d = require('d3');

var _victoryLightTheme = require('./resources/themes/victoryLightTheme');

var _victoryLightTheme2 = _interopRequireDefault(_victoryLightTheme);

var _victoryDarkTheme = require('./resources/themes/victoryDarkTheme');

var _victoryDarkTheme2 = _interopRequireDefault(_victoryDarkTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WSO2 Inc. licenses this file to you under the Apache License,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Version 2.0 (the "License"); you may not use this file except
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * software distributed under the License is distributed on an
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * KIND, either express or implied.  See the License for the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * specific language governing permissions and limitations
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * This class will render a skeleton that's required for a Line, Area or Bar Chart
 */
var ChartSkeleton = function (_React$Component) {
    _inherits(ChartSkeleton, _React$Component);

    function ChartSkeleton() {
        _classCallCheck(this, ChartSkeleton);

        return _possibleConstructorReturn(this, (ChartSkeleton.__proto__ || Object.getPrototypeOf(ChartSkeleton)).apply(this, arguments));
    }

    _createClass(ChartSkeleton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                width = _props.width,
                height = _props.height,
                xScale = _props.xScale,
                config = _props.config,
                yDomain = _props.yDomain,
                xDomain = _props.xDomain,
                dataSets = _props.dataSets,
                theme = _props.theme;

            var currentTheme = theme === 'materialLight' ? _victoryLightTheme2.default : _victoryDarkTheme2.default;
            var arr = null;
            if (xScale === 'ordinal' && config.charts[0].type === 'bar') {
                arr = dataSets[Object.keys(dataSets)[0]];
            }
            return _react2.default.createElement(
                _victory.VictoryChart,
                {
                    width: width,
                    height: height,
                    padding: function () {
                        if (config.legend === true) {
                            if (!config.legendOrientation) return { left: 100, top: 30, bottom: 50, right: 180 };else if (config.legendOrientation === 'left') {
                                return { left: 300, top: 30, bottom: 50, right: 30 };
                            } else if (config.legendOrientation === 'right') {
                                return { left: 100, top: 30, bottom: 50, right: 180 };
                            } else if (config.legendOrientation === 'top') {
                                return { left: 100, top: 100, bottom: 50, right: 30 };
                            } else if (config.legendOrientation === 'bottom') {
                                return { left: 100, top: 30, bottom: 150, right: 30 };
                            } else return { left: 100, top: 30, bottom: 50, right: 180 };
                        } else {
                            return { left: 100, top: 30, bottom: 50, right: 30 };
                        }
                    }(),
                    scale: { x: xScale === 'ordinal' ? null : xScale, y: 'linear' },
                    domain: {
                        x: config.brush && xDomain[0] ? xDomain : null,
                        y: yDomain || null
                    },
                    theme: currentTheme
                },
                this.props.children,
                _react2.default.createElement(_victory.VictoryAxis, {
                    crossAxis: true,
                    theme: currentTheme,
                    style: {
                        axis: {
                            stroke: config.style ? config.style.axisColor : currentTheme.axis.style.axis.stroke
                        },
                        axisLabel: {
                            fill: config.style ? config.style.axisLabelColor : currentTheme.axis.style.axisLabel.fill
                        }
                    },
                    gridComponent: config.disableVerticalGrid ? _react2.default.createElement('g', null) : _react2.default.createElement('line', {
                        style: {
                            stroke: config.gridColor || currentTheme.line.style.data.stroke,
                            strokeOpacity: 0.1,
                            fill: 'transparent'
                        }
                    }),
                    label: config.xAxisLabel || config.x,
                    tickFormat: function () {
                        if (xScale === 'time' && config.timeFormat) {
                            return function (date) {
                                return (0, _d.timeFormat)(config.timeFormat)(new Date(date));
                            };
                        } else if (xScale === 'ordinal' && config.charts[0].type === 'bar') {
                            return function (data) {
                                if (data - Math.floor(data) !== 0) {
                                    return '';
                                } else {
                                    return arr[Number(data) - 1].x;
                                }
                            };
                        } else {
                            return null;
                        }
                    }(),
                    standalone: false,
                    tickLabelComponent: _react2.default.createElement(_victory.VictoryLabel, {
                        angle: config.style ? config.style.xAxisTickAngle || 0 : 0,
                        theme: currentTheme,
                        style: {
                            fill: config.style ? config.style.tickLabelColor : currentTheme.axis.style.tickLabels.fill
                        }
                    }),
                    tickCount: xScale === 'ordinal' && config.charts[0].type === 'bar' ? arr.length : config.xAxisTickCount
                }),
                _react2.default.createElement(_victory.VictoryAxis, {
                    dependentAxis: true,
                    crossAxis: true,
                    theme: currentTheme,
                    style: {
                        axis: {
                            stroke: config.style ? config.style.axisColor : currentTheme.axis.style.axis.stroke
                        },
                        axisLabel: {
                            fill: config.style ? config.style.axisLabelColor : currentTheme.axis.style.axisLabel.fill
                        }
                    },
                    gridComponent: config.disableHorizontalGrid ? _react2.default.createElement('g', null) : _react2.default.createElement('line', {
                        style: {
                            stroke: config.gridColor || currentTheme.line.style.data.stroke,
                            strokeOpacity: 0.1,
                            fill: 'transparent'
                        }
                    }),
                    label: config.yAxisLabel || config.charts.length > 1 ? '' : config.charts[0].y,
                    standalone: false,
                    tickLabelComponent: _react2.default.createElement(_victory.VictoryLabel, {
                        angle: config.style ? config.style.yAxisTickAngle || 0 : 0,
                        theme: currentTheme,
                        style: {
                            fill: config.style ? config.style.tickLabelColor : currentTheme.axis.style.tickLabels.fill
                        }
                    }),
                    tickCount: config.yAxisTickCount
                })
            );
        }
    }]);

    return ChartSkeleton;
}(_react2.default.Component);

exports.default = ChartSkeleton;


ChartSkeleton.defaultProps = {
    yDomain: null
};

ChartSkeleton.propTypes = {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    xScale: _propTypes2.default.string.isRequired,
    config: _propTypes2.default.shape({
        x: _propTypes2.default.string,
        charts: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            type: _propTypes2.default.string.isRequired,
            y: _propTypes2.default.string.isRequired,
            fill: _propTypes2.default.string,
            color: _propTypes2.default.string,
            colorScale: _propTypes2.default.arrayOf(_propTypes2.default.string),
            colorDomain: _propTypes2.default.arrayOf(_propTypes2.default.string),
            mode: _propTypes2.default.string
        })),
        tickLabelColor: _propTypes2.default.string,
        legendTitleColor: _propTypes2.default.string,
        legendTextColor: _propTypes2.default.string,
        axisColor: _propTypes2.default.string,
        height: _propTypes2.default.number,
        width: _propTypes2.default.number,
        maxLength: _propTypes2.default.number
    }).isRequired,
    yDomain: _propTypes2.default.number,
    children: _propTypes2.default.arrayOf(_propTypes2.default.element).isRequired
};