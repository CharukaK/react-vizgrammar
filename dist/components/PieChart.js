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

var _helper = require('./helper');

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

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
// TODO: Implement interactive legend
// TODO: Implement onClick events


var LEGEND_DISABLED_COLOR = '#d3d3d3';

var PieCharts = function (_React$Component) {
    _inherits(PieCharts, _React$Component);

    function PieCharts(props) {
        _classCallCheck(this, PieCharts);

        var _this = _possibleConstructorReturn(this, (PieCharts.__proto__ || Object.getPrototypeOf(PieCharts)).call(this, props));

        _this.state = {
            dataSets: {},
            chartArray: [],
            initialized: false,
            xScale: 'linear',
            orientation: 'bottom',
            legend: true,
            scatterPlotRange: [],
            randomUpdater: 0
        };
        _this.config = props.config;
        _this._handleAndSortData = _this._handleAndSortData.bind(_this);
        _this._handleMouseEvent = _this._handleMouseEvent.bind(_this);
        _this._legendInteraction = _this._legendInteraction.bind(_this);
        return _this;
    }

    _createClass(PieCharts, [{
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

        /**
         * Handles the sorting of data and populating the dataset
         * @param props
         * @private
         */

    }, {
        key: '_handleAndSortData',
        value: function _handleAndSortData(props) {
            var _this2 = this;

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
                scatterPlotRange = _state.scatterPlotRange,
                randomUpdater = _state.randomUpdater;

            config.charts.forEach(function () {
                var arcConfig = config.charts[0];
                var xIndex = metadata.names.indexOf(arcConfig.x);
                var colorIndex = metadata.names.indexOf(arcConfig.color);

                if (xIndex === -1) {
                    throw new _VizGError2.default('PieChart', "Unknown 'x' field defined in the Pie Chart config.");
                }

                if (colorIndex === -1) {
                    throw new _VizGError2.default('PieChart', "Unknown 'x' field defined in the Pie Chart config.");
                }

                if (!config.percentage) {
                    if (!initialized) {
                        chartArray.push({
                            type: arcConfig.type,
                            dataSetNames: {},
                            mode: arcConfig.mode,
                            colorScale: Array.isArray(arcConfig.colorScale) ? arcConfig.colorScale : (0, _helper.getDefaultColorScale)(),
                            colorIndex: 0

                        });
                    }
                    data.forEach(function (datum) {
                        randomUpdater++;
                        var dataSetName = datum[colorIndex];

                        if (dataSets[dataSetName]) {
                            dataSets[dataSetName].y += datum[xIndex];
                        } else {
                            chartArray[0].colorIndex = chartArray[0].colorIndex >= chartArray[0].colorScale.length ? 0 : chartArray[0].colorIndex;
                            if (arcConfig.colorDomain) {
                                var colorDomIndex = arcConfig.colorDomain.indexOf(dataSetName);

                                if (colorDomIndex > -1 && colorDomIndex < chartArray[0].colorScale.length) {
                                    dataSets[dataSetName] = {
                                        x: dataSetName,
                                        y: datum[xIndex],
                                        fill: chartArray[0].colorScale[colorDomIndex]
                                    };
                                    chartArray[0].dataSetNames[dataSetName] = chartArray[0].colorIndex++;
                                } else {
                                    dataSets[dataSetName] = {
                                        x: dataSetName,
                                        y: datum[xIndex],
                                        fill: chartArray[0].colorScale[chartArray[0].colorIndex]
                                    };
                                }
                            } else {
                                dataSets[dataSetName] = {
                                    x: dataSetName,
                                    y: datum[xIndex],
                                    fill: chartArray[0].colorScale[chartArray[0].colorIndex]
                                };
                            }

                            if (!chartArray[0].dataSetNames[dataSetName]) {
                                chartArray[0].dataSetNames[dataSetName] = chartArray[0].colorScale[chartArray[0].colorIndex++];
                            }
                        }
                    });
                } else {
                    legend = false;
                    if (!initialized) {
                        chartArray.push({
                            type: arcConfig.type,
                            colorScale: Array.isArray(arcConfig.colorScale) ? arcConfig.colorScale : (0, _helper.getDefaultColorScale)()
                        });
                    }
                    data.map(function (datum) {
                        dataSets = _this2._getPercentDataForPieChart(datum[xIndex]);
                    });
                }
            });

            initialized = true;

            this.setState({
                dataSets: dataSets,
                chartArray: chartArray,
                initialized: initialized,
                xScale: xScale,
                orientation: orientation,
                legend: legend,
                scatterPlotRange: scatterPlotRange,
                randomUpdater: randomUpdater
            });
        }

        /**
         * generates a data set for the given value
         * @param value for data set should be generated
         * @private
         */

    }, {
        key: '_getPercentDataForPieChart',
        value: function _getPercentDataForPieChart(value) {
            return [{ x: 'primary', y: value }, { x: 'secondary', y: 100 - value }];
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                config = _props.config,
                height = _props.height,
                width = _props.width;
            var _state2 = this.state,
                chartArray = _state2.chartArray,
                dataSets = _state2.dataSets,
                xScale = _state2.xScale,
                legend = _state2.legend,
                randomUpdater = _state2.randomUpdater;

            var chartComponents = [];
            var legendItems = [];

            chartArray.map(function (chart) {
                var pieChartData = [];
                var total = 0;
                if (!config.percentage) {
                    Object.keys(chart.dataSetNames).map(function (dataSetName) {
                        legendItems.push({ name: dataSetName, symbol: { fill: chart.dataSetNames[dataSetName] } });
                        total += dataSets[dataSetName].y;
                        pieChartData.push(dataSets[dataSetName]);
                    });
                }

                chartComponents.push(_react2.default.createElement(
                    'svg',
                    {
                        height: '100%',
                        width: '100%',
                        viewBox: '0 0 ' + (height > width ? width : height) + ' ' + (height > width ? width : height)
                    },
                    _react2.default.createElement(_victory.VictoryPie, {
                        height: height > width ? width : height,
                        width: height > width ? width : height,
                        colorScale: chart.colorScale,
                        data: config.percentage ? dataSets : pieChartData,
                        labelComponent: config.percentage ? _react2.default.createElement(_victory.VictoryLabel, { text: '' }) : _react2.default.createElement(_victory.VictoryTooltip, {
                            orientation: 'top',
                            pointerLength: 4,
                            cornerRadius: 2,
                            flyoutStyle: { fill: '#000', fillOpacity: '0.8', strokeWidth: 0 },
                            style: { fill: '#b0b0b0' }
                        }),
                        labels: config.percentage === 'percentage' ? '' : function (d) {
                            return d.x + ' : ' + (d.y / total * 100).toFixed(2) + '%';
                        },
                        style: { labels: { fontSize: 6 } },
                        labelRadius: height / 4,
                        innerRadius: chart.mode === 'donut' || config.percentage ? (height > width ? width : height / 4) + (config.innerRadius || 0) : 0,
                        events: [{
                            target: 'data',
                            eventHandlers: {
                                onClick: function onClick() {
                                    return [{
                                        target: 'data',
                                        mutation: _this3._handleMouseEvent
                                    }];
                                }
                            }
                        }],
                        randomUpdater: randomUpdater,
                        animate: config.animate ? { onEnter: { duration: 100 } } : null
                    }),
                    config.percentage ? _react2.default.createElement(_victory.VictoryLabel, {
                        textAnchor: 'middle',
                        verticalAnchor: 'middle',
                        x: '50%',
                        y: '50%',
                        text: Math.round(dataSets[0].y) + '%',
                        style: { fontSize: config.labelFontSize || 45, fill: config.labelColor || 'black' }
                    }) : null
                ));
            });
            return _react2.default.createElement(
                'div',
                { style: { overflow: 'hidden', height: '100%', width: '100%' } },
                (config.legend || legend) && config.legendOrientation && config.legendOrientation === 'top' ? (0, _ComponentGenerator.getPieChartLegendComponent)(config, legendItems, [], null, height, width) : null,
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            width: !(config.legend || legend) ? '100%' : function () {
                                if (!config.legendOrientation) return '80%';else if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                                    return '80%';
                                } else return '100%';
                            }(),
                            height: !(config.legend || legend) ? '100%' : function () {
                                if (!config.legendOrientation) return '100%';else if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                                    return '100%%';
                                } else return '80%';
                            }(),
                            display: !config.legendOrientation ? 'inline' : function () {
                                if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                                    return 'inline';
                                } else return null;
                            }(),
                            float: !config.legendOrientation ? 'left' : function () {
                                if (config.legendOrientation === 'left') return 'right';else if (config.legendOrientation === 'right') return 'left';else return null;
                            }()
                        }
                    },
                    chartComponents
                ),
                (config.legend || legend) && (!config.legendOrientation || config.legendOrientation !== 'top') ? (0, _ComponentGenerator.getPieChartLegendComponent)(config, legendItems, [], null, height, width) : null
            );
        }
    }]);

    return PieCharts;
}(_react2.default.Component);

exports.default = PieCharts;


PieCharts.defaultProps = {
    height: 450,
    width: 800
};

PieCharts.propTypes = {
    data: _propTypes2.default.array,
    config: _propTypes2.default.object.isRequired,
    metadata: _propTypes2.default.object.isRequired,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    onClick: _propTypes2.default.func
};