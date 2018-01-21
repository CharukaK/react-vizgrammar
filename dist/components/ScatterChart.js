'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _victory = require('victory');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d3');

var _helper = require('./helper');

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

var _ChartSkeleton = require('./ChartSkeleton');

var _ChartSkeleton2 = _interopRequireDefault(_ChartSkeleton);

var _ComponentGenerator = require('./ComponentGenerator');

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

var LEGEND_DISABLED_COLOR = '#d3d3d3';

var ScatterCharts = function (_React$Component) {
    _inherits(ScatterCharts, _React$Component);

    function ScatterCharts(props) {
        _classCallCheck(this, ScatterCharts);

        var _this = _possibleConstructorReturn(this, (ScatterCharts.__proto__ || Object.getPrototypeOf(ScatterCharts)).call(this, props));

        _this.state = {
            dataSets: {},
            chartArray: [],
            initialized: false,
            xScale: 'linear',
            orientation: 'bottom',
            legend: false,
            scatterPlotRange: [],
            ignoreArray: []
        };

        _this._handleAndSortData = _this._handleAndSortData.bind(_this);
        _this._handleMouseEvent = _this._handleMouseEvent.bind(_this);
        _this._legendInteraction = _this._legendInteraction.bind(_this);
        return _this;
    }

    _createClass(ScatterCharts, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.metadata !== null) {
                this._handleAndSortData(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!this.props.append) {
                this.state.dataSets = {};
                this.state.chartArray = [];
                this.state.initialized = false;
            }
            if (this.props.metadata !== null) {
                this._handleAndSortData(nextProps);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setState({});
        }
    }, {
        key: '_handleMouseEvent',
        value: function _handleMouseEvent(evt) {
            var onClick = this.props.onClick;

            return onClick && onClick(evt);
        }

        /**
         * Handles the sorting of data and populating the dataset
         * @param props
         */

    }, {
        key: '_handleAndSortData',
        value: function _handleAndSortData(props) {
            var config = props.config,
                metadata = props.metadata,
                data = props.data;
            var _state = this.state,
                dataSets = _state.dataSets,
                chartArray = _state.chartArray,
                initialized = _state.initialized,
                xScale = _state.xScale,
                orientation = _state.orientation,
                legend = _state.legend,
                scatterPlotRange = _state.scatterPlotRange;


            config.charts.forEach(function (chart, chartIndex) {
                if (!chart.x) throw new _VizGError2.default('ScatterChart', "Field 'x' is not defined in the Scatter Plot config");
                if (!chart.y) throw new _VizGError2.default('ScatterChart', "Field 'y' is not defined in the Scatter Plot config");
                var xIndex = metadata.names.indexOf(chart.x);
                var yIndex = metadata.names.indexOf(chart.y);
                var colorIndex = metadata.names.indexOf(chart.color);
                var sizeIndex = metadata.names.indexOf(chart.size);
                xScale = metadata.types[xIndex].toLowerCase() === 'time' ? 'time' : xScale;

                if (xIndex === -1) {
                    throw new _VizGError2.default('ScatterChart', "Unknown 'x' field defined in the Scatter Plot config.");
                }

                if (yIndex === -1) {
                    throw new _VizGError2.default('ScatterChart', "Unknown 'y' field defined in the Scatter Plot config.");
                }

                if (!initialized) {
                    chartArray.push({
                        type: chart.type,
                        dataSetNames: {},
                        colorType: metadata.types[colorIndex],
                        colorScale: Array.isArray(chart.colorScale) ? chart.colorScale : (0, _helper.getDefaultColorScale)(),
                        colorIndex: 0
                    });
                }

                if (metadata.types[colorIndex] === 'linear') {
                    legend = false;
                    data.forEach(function (datum) {
                        dataSets['scatterChart' + chartIndex] = dataSets['scatterChart' + chartIndex] || [];
                        dataSets['scatterChart' + chartIndex].push({
                            x: datum[xIndex],
                            y: datum[yIndex],
                            color: datum[colorIndex],
                            amount: datum[sizeIndex]
                        });

                        if (dataSets['scatterChart' + chartIndex].length > chart.maxLength) {
                            dataSets['scatterChart' + chartIndex].shift();
                        }

                        if (scatterPlotRange.length === 0) {
                            scatterPlotRange = [datum[colorIndex], datum[colorIndex]];
                        } else {
                            scatterPlotRange[0] = scatterPlotRange[0] > datum[colorIndex] ? datum[colorIndex] : scatterPlotRange[0];
                            scatterPlotRange[1] = scatterPlotRange[1] < datum[colorIndex] ? datum[colorIndex] : scatterPlotRange[1];
                        }
                        chartArray[chartIndex].dataSetNames['scatterChart' + chartIndex] = chartArray[chartIndex].dataSetNames['scatterChart' + chartIndex] || null;
                    });
                } else {
                    data.forEach(function (datum) {
                        var dataSetName = 'scatterChart' + chartIndex;
                        if (chart.color) {
                            colorIndex = metadata.names.indexOf(chart.color);
                            dataSetName = colorIndex > -1 ? datum[colorIndex] : dataSetName;
                        }

                        dataSets[dataSetName] = dataSets[dataSetName] || [];
                        dataSets[dataSetName].push({ x: datum[xIndex], y: datum[yIndex], amount: datum[sizeIndex] });
                        if (dataSets[dataSetName].length > config.maxLength) {
                            dataSets[dataSetName].shift();
                        }

                        if (!chartArray[chartIndex].dataSetNames.hasOwnProperty(dataSetName)) {
                            if (chartArray[chartIndex].colorIndex >= chartArray[chartIndex].colorScale.length) {
                                chartArray[chartIndex].colorIndex = 0;
                            }

                            if (chart.colorDomain) {
                                var colorIn = chart.colorDomain.indexOf(dataSetName);
                                chartArray[chartIndex].dataSetNames[dataSetName] = colorIn >= 0 ? colorIn < chartArray[chartIndex].colorScale.length ? chartArray[chartIndex].colorScale[colorIn] : chartArray[chartIndex].colorScale[chartArray[chartIndex].colorIndex++] : chartArray[chartIndex].colorScale[chartArray[chartIndex].colorIndex++];
                            } else {
                                chartArray[chartIndex].dataSetNames[dataSetName] = chartArray[chartIndex].colorScale[chartArray[chartIndex].colorIndex++];
                            }
                        }
                    });
                }
            });
            initialized = true;
            this.setState({ dataSets: dataSets, chartArray: chartArray, initialized: initialized, xScale: xScale, orientation: orientation, legend: legend, scatterPlotRange: scatterPlotRange });
        }

        /**
         * Function used to disable a chart component when clicked on it's name in the legend.
         * @param {Object} props parameters recieved from the legend component
         */

    }, {
        key: '_legendInteraction',
        value: function _legendInteraction(props) {
            var ignoreArray = this.state.ignoreArray;

            var ignoreIndex = ignoreArray.map(function (d) {
                return d.name;
            }).indexOf(props.datum.name);
            if (ignoreIndex > -1) {
                ignoreArray.splice(ignoreIndex, 1);
            } else {
                ignoreArray.push({ name: props.datum.name });
            }
            this.setState({
                ignoreArray: ignoreArray
            });
            var fill = props.style ? props.style.fill : null;
            return fill === LEGEND_DISABLED_COLOR ? null : { style: { fill: LEGEND_DISABLED_COLOR } };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                config = _props.config,
                height = _props.height,
                width = _props.width;
            var _state2 = this.state,
                chartArray = _state2.chartArray,
                dataSets = _state2.dataSets,
                xScale = _state2.xScale,
                legend = _state2.legend,
                ignoreArray = _state2.ignoreArray;

            var chartComponents = [];
            var legendItems = [];

            chartArray.forEach(function (chart, chartIndex) {
                if (chart.colorType === 'linear') {
                    Object.keys(chart.dataSetNames).forEach(function (dataSetName) {
                        chartComponents.push(_react2.default.createElement(_victory.VictoryScatter, {
                            bubbleProperty: 'amount',
                            maxBubbleSize: 15,
                            minBubbleSize: 5,
                            style: {
                                data: {
                                    fill: function fill(d) {
                                        return (0, _d.scaleLinear)().range([chart.colorScale[0], chart.colorScale[1]]).domain(_this2.state.scatterPlotRange)(d.color);
                                    }
                                }
                            },
                            data: dataSets[dataSetName],
                            labels: function labels(d) {
                                var text = config.charts[chartIndex].x + ' : ' + d.x + '\n' + (config.charts[chartIndex].y + ' : ' + d.y + '\n');
                                if (config.charts[chartIndex].size) {
                                    text += config.charts[chartIndex].size + ' : ' + d.amount + '\n';
                                }

                                if (config.charts[chartIndex].color) {
                                    text += config.charts[chartIndex].color + ' : ' + d.color;
                                }

                                return text;
                            },
                            labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
                                orientation: 'top',
                                pointerLength: 4,
                                cornerRadius: 2,
                                flyoutStyle: { fill: '#000', fillOpacity: '0.8', strokeWidth: 0 },
                                style: { fill: '#b0b0b0', textAlign: 'left' }
                            }),
                            events: [{
                                target: 'data',
                                eventHandlers: {
                                    onClick: function onClick() {
                                        return [{
                                            target: 'data',
                                            mutation: _this2._handleMouseEvent
                                        }];
                                    }
                                }
                            }],
                            animate: config.animate ? { onEnter: { duration: 100 } } : null
                        }));
                    });
                } else {
                    Object.keys(chart.dataSetNames).forEach(function (dataSetName) {
                        chartComponents.push(_react2.default.createElement(_victory.VictoryScatter, {
                            bubbleProperty: 'amount',
                            maxBubbleSize: 20,
                            minBubbleSize: 5,
                            style: { data: { fill: chart.dataSetNames[dataSetName] } },
                            data: dataSets[dataSetName],
                            labels: function labels(d) {
                                var text = config.charts[chartIndex].x + ' : ' + d.x + '\n' + (config.charts[chartIndex].y + ' : ' + d.y + '\n');
                                if (config.charts[chartIndex].size) {
                                    text += config.charts[chartIndex].size + ' : ' + d.amount + '\n';
                                }

                                if (config.charts[chartIndex].color) {
                                    text += config.charts[chartIndex].color + ' : ' + dataSetName;
                                }

                                return text;
                            },
                            labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
                                orientation: 'top',
                                pointerLength: 4,
                                cornerRadius: 2,
                                flyoutStyle: { fill: '#000', fillOpacity: '0.8', strokeWidth: 0 },
                                style: { fill: '#b0b0b0' }
                            }),
                            events: [{
                                target: 'data',
                                eventHandlers: {
                                    onClick: function onClick() {
                                        return [{
                                            target: 'data',
                                            mutation: _this2._handleMouseEvent
                                        }];
                                    }
                                }
                            }]
                        }));
                    });
                }
            });

            return _react2.default.createElement(
                'div',
                { style: { overflow: 'hidden', height: '100%', width: '100%' } },
                _react2.default.createElement(
                    'div',
                    {
                        style: { width: '100%', height: '100%' }
                    },
                    _react2.default.createElement(
                        _ChartSkeleton2.default,
                        { width: width, height: height, xScale: xScale, config: config },
                        config.legend === true ? (0, _ComponentGenerator.getBasicChartLegend)(config, legendItems, ignoreArray, this._legendInteraction, height, width) : null,
                        chartComponents
                    )
                )
            );
        }
    }]);

    return ScatterCharts;
}(_react2.default.Component);

exports.default = ScatterCharts;


ScatterCharts.defaultProps = {
    height: 450,
    width: 800
};

ScatterCharts.propTypes = {
    data: _propTypes2.default.array,
    config: _propTypes2.default.object.isRequired,
    metadata: _propTypes2.default.object.isRequired,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    onClick: _propTypes2.default.func
};