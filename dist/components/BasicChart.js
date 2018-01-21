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

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

var _helper = require('./helper');

var _ChartSkeleton = require('./ChartSkeleton');

var _ChartSkeleton2 = _interopRequireDefault(_ChartSkeleton);

var _ComponentGenerator = require('./ComponentGenerator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *  limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var LEGEND_DISABLED_COLOR = '#d3d3d3';

/**
 * Generate Line, Area or Bar Chart
 */

var BasicChart = function (_React$Component) {
    _inherits(BasicChart, _React$Component);

    function BasicChart(props) {
        _classCallCheck(this, BasicChart);

        var _this = _possibleConstructorReturn(this, (BasicChart.__proto__ || Object.getPrototypeOf(BasicChart)).call(this, props));

        _this.state = {
            dataSets: {},
            chartArray: [],
            initialized: false,
            xScale: 'linear',
            xDomain: [null, null],
            ignoreArray: [],
            seriesMaxXVal: null,
            seriesMinXVal: null,
            incrementor: 0
        };
        _this.xRange = [];
        _this.chartConfig = null;

        _this.visualizeData = _this.visualizeData.bind(_this);
        _this.sortData = _this.sortData.bind(_this);
        _this.generateChartArray = _this.generateChartArray.bind(_this);
        _this.getXDomain = _this.getXDomain.bind(_this);
        _this.getXRange = _this.getXRange.bind(_this);
        _this.getDataSetDomain = _this.getDataSetDomain.bind(_this);
        _this.maintainArrayLength = _this.maintainArrayLength.bind(_this);
        _this._legendInteraction = _this._legendInteraction.bind(_this);
        _this._brushOnChange = _this._brushOnChange.bind(_this);
        _this._brushReset = _this._brushReset.bind(_this);
        _this._handleMouseEvent = _this._handleMouseEvent.bind(_this);
        return _this;
    }

    _createClass(BasicChart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.chartConfig = this.props.config;
            if (this.props.metadata !== null) {
                this.visualizeData(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (JSON.stringify(this.chartConfig) !== JSON.stringify(nextProps.config) || !this.props.append) {
                this.chartConfig = nextProps.config;
                this.state.chartArray = [];
                this.state.dataSets = [];
                this.state.initialized = false;
            }

            if (nextProps.metadata !== null) {
                this.visualizeData(nextProps);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setState({});
        }

        /**
         * Define xDomain to be used when brushing data
         * @param xDomain current xDomain of the chart
         * @param domain array containing maximum and minimum of the current dataset
         */

    }, {
        key: 'getXDomain',
        value: function getXDomain(xDomain, domain) {
            if (xDomain[0] !== null) {
                if (domain[0] > xDomain[0]) {
                    xDomain[0] = domain[0];
                }

                if (domain[1] > xDomain[1]) {
                    xDomain[1] = domain[1];
                }
            } else {
                xDomain = [domain[0], domain[1]];
            }
            return xDomain;
        }

        /**
         * Returns an array containing maximum and minimum of the dataset
         * @param {Array} dataSet the dataSet array
         */

    }, {
        key: 'getDataSetDomain',
        value: function getDataSetDomain(dataSet) {
            var max = Math.max.apply(null, dataSet.map(function (d) {
                return d.x;
            }));
            var min = Math.min.apply(null, dataSet.map(function (d) {
                return d.x;
            }));
            return [min, max];
        }

        /**
         * Sets the range of x values to be shown in the chart.
         * @param domain array containing the range of x values
         * @param seriesMaxXVal current maximum value of the xRange
         * @param seriesMinXVal current minimum value of the xRange
         */

    }, {
        key: 'getXRange',
        value: function getXRange(domain, seriesMaxXVal, seriesMinXVal) {
            if (seriesMaxXVal === null) {
                seriesMaxXVal = domain[1];
                seriesMinXVal = domain[0];
            } else {
                if (seriesMaxXVal < domain[1]) {
                    seriesMaxXVal = domain[1];
                }
                if (seriesMinXVal < domain[0]) {
                    seriesMinXVal = domain[0];
                }
            }

            return { seriesMinXVal: seriesMinXVal, seriesMaxXVal: seriesMaxXVal };
        }

        /**
         * Will trigger the set state that will visualize the data in chart.
         * @param {Object} props Props received by the element.
         */

    }, {
        key: 'visualizeData',
        value: function visualizeData(props) {
            var config = props.config,
                metadata = props.metadata,
                data = props.data;
            var _state = this.state,
                initialized = _state.initialized,
                xScale = _state.xScale,
                chartArray = _state.chartArray,
                dataSets = _state.dataSets,
                xDomain = _state.xDomain,
                seriesMaxXVal = _state.seriesMaxXVal,
                seriesMinXVal = _state.seriesMinXVal;


            if (!config.x) {
                throw new _VizGError2.default('BasicChart', "Independent axis 'x' is not defined in the Configuration JSON.");
            }
            var xIndex = metadata.names.indexOf(config.x);
            if (xIndex === -1) {
                throw new _VizGError2.default('BasicChart', 'Defined independent axis ' + config.x + ' is not found in the provided metadata');
            }

            if (['linear', 'time', 'ordinal'].indexOf(metadata.types[xIndex].toLowerCase()) === -1) {
                throw new _VizGError2.default('BasicChart', 'Unknown metadata type is defined for x axis in the chart configuration');
            }
            xScale = metadata.types[xIndex].toLowerCase();
            if (!initialized) {
                chartArray = this.generateChartArray(config.charts);
                initialized = true;
            }

            var plotData = this.sortData(config.charts, metadata, data, xIndex, config.maxLength, chartArray, dataSets, xScale, xDomain, seriesMinXVal, seriesMaxXVal);

            plotData.initialized = initialized;
            plotData.xScale = metadata.types[xIndex].toLowerCase();

            this.setState(plotData);
        }

        /**
         * Sort data and update the state.
         * @param {Array} charts chart configurations provided
         * @param {Object} metadata metadata object provided by the user
         * @param {Array} data Dataset provided by the user.
         * @param {Number} xIndex index of the x data field in the dataset.
         * @param {maxLength} maxLength maximum length of a dataset should be.
         * @param chartArray
         * @param dataSets
         * @param xScale
         * @param xDomain
         * @param seriesMinXVal
         * @param seriesMaxXVal
         * @private
         */

    }, {
        key: 'sortData',
        value: function sortData(charts, metadata, data, xIndex, maxLength, chartArray, dataSets, xScale, xDomain, seriesMinXVal, seriesMaxXVal) {
            var _this2 = this;

            charts.forEach(function (chart, index) {
                if (!chart.y) {
                    throw new _VizGError2.default('BasicChart', "Dependent axis 'y' is not defined in the chart configuration");
                }
                var yIndex = metadata.names.indexOf(chart.y);
                if (yIndex === -1) {
                    throw new _VizGError2.default('BasicChart', 'Dependent axis \'' + chart.y + '\' is not found in the metadata provided');
                }

                data.forEach(function (datum) {
                    var dataSetName = metadata.names[yIndex];

                    if (chart.color) {
                        var colorIndex = metadata.names.indexOf(chart.color);
                        if (colorIndex > -1) {
                            dataSetName = datum[colorIndex];
                        } else {
                            throw new _VizGError2.default('BasicChart', 'Color category field \'' + chart.color + '\' is not found in the provided metadata');
                        }
                    }

                    dataSets[dataSetName] = dataSets[dataSetName] || [];
                    if (xScale === 'linear' || xScale === 'time') {
                        dataSets[dataSetName].push({ x: datum[xIndex], y: datum[yIndex] });
                        dataSets[dataSetName] = (0, _helper.sortDataSet)(dataSets[dataSetName]);
                    } else {
                        var key = [];
                        dataSets[dataSetName].filter(function (d, i) {
                            if (d.x === datum[xIndex]) {
                                key.push(i);
                                return true;
                            } else {
                                return false;
                            }
                        });
                        if (key.length > 0) {
                            dataSets[dataSetName][key[0]] = { x: datum[xIndex], y: datum[yIndex] };
                        } else {
                            dataSets[dataSetName].push({ x: datum[xIndex], y: datum[yIndex] });
                        }
                    }

                    if (maxLength) dataSets[dataSetName] = _this2.maintainArrayLength(dataSets[dataSetName], maxLength);
                    if (xScale !== 'ordinal') {
                        _this2.xRange = xDomain = _this2.getXDomain(xDomain, _this2.getDataSetDomain(dataSets[dataSetName]));
                        var xRange = _this2.getXRange(_this2.getDataSetDomain(dataSets[dataSetName]), seriesMaxXVal, seriesMinXVal);
                        seriesMinXVal = xRange.seriesMinXVal;
                        seriesMaxXVal = xRange.seriesMaxXVal;
                    }

                    if (!Object.prototype.hasOwnProperty.call(chartArray[index].dataSetNames, dataSetName)) {
                        if (chartArray[index].colorIndex >= chartArray[index].colorScale.length) {
                            chartArray[index].colorIndex = 0;
                        }

                        if (chart.colorDomain) {
                            var colorIn = chart.colorDomain.indexOf(dataSetName);

                            if (colorIn >= 0) {
                                if (colorIn < chartArray[index].colorScale.length) {
                                    chartArray[index].dataSetNames[dataSetName] = chartArray[index].colorScale[colorIn];
                                } else {
                                    chartArray[index].dataSetNames[dataSetName] = chartArray[index].colorScale[chartArray[index].colorIndex++];
                                }
                            } else {
                                chartArray[index].dataSetNames[dataSetName] = chartArray[index].colorScale[chartArray[index].colorIndex++];
                            }
                        } else {
                            chartArray[index].dataSetNames[dataSetName] = chartArray[index].colorScale[chartArray[index].colorIndex++];
                        }

                        chartArray[index].dataSetNames[dataSetName] = chart.fill || chartArray[index].dataSetNames[dataSetName];
                    }
                });
            });

            return { chartArray: chartArray, dataSets: dataSets, xDomain: xDomain, seriesMaxXVal: seriesMaxXVal, seriesMinXVal: seriesMinXVal };
        }

        // TODO : sort and handle ordinal series data.
        /**
         * Reduce the array length to the the given maximum array length
         * @param {Array} dataSet the dataSet that needs to be maintained by the length
         * @param {Number} maxLength maximum length the dataset shoul be
         */

    }, {
        key: 'maintainArrayLength',
        value: function maintainArrayLength(dataSet, maxLength) {
            while (dataSet.length > maxLength) {
                dataSet.shift();
            }
            return dataSet;
        }

        /**
         * Generate the chart array that contains the information on visualization of the charts in config
         * @param charts chart configuration provided
         * @private
         */

    }, {
        key: 'generateChartArray',
        value: function generateChartArray(charts) {
            return charts.map(function (chart, chartIndex) {
                return {
                    type: chart.type,
                    dataSetNames: {},
                    mode: chart.mode,
                    orientation: chart.orientation,
                    colorScale: Array.isArray(chart.colorScale) ? chart.colorScale : (0, _helper.getDefaultColorScale)(),
                    colorIndex: 0,
                    id: chartIndex
                };
            });
        }

        /**
         * function to reset domain of the chart when zoomed in.
         * @param {Array} xDomain domain range of the x Axis.
         */

    }, {
        key: '_brushReset',
        value: function _brushReset(xRange) {
            this.setState({ xDomain: xRange });
        }

        /**
         * Function to handle onChange in brush slider
         * @param {Array} xDomain New Domain of the x-axis
         */

    }, {
        key: '_brushOnChange',
        value: function _brushOnChange(xDomain) {
            this.setState({ xDomain: xDomain });
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
        key: '_handleMouseEvent',
        value: function _handleMouseEvent(evt) {
            var onClick = this.props.onClick;

            return onClick && onClick(evt);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                config = _props.config,
                height = _props.height,
                width = _props.width,
                theme = _props.theme;
            var _state2 = this.state,
                chartArray = _state2.chartArray,
                dataSets = _state2.dataSets,
                xScale = _state2.xScale,
                ignoreArray = _state2.ignoreArray;

            var chartComponents = [];
            var legendItems = [];
            var horizontal = false;
            var lineCharts = [];
            var areaCharts = [];
            var barcharts = [];

            chartArray.map(function (chart, chartIndex) {
                var addChart = false;
                switch (chart.type) {
                    case 'line':
                        Object.keys(chart.dataSetNames).map(function (dataSetName) {
                            legendItems.push({
                                name: dataSetName,
                                symbol: { fill: chart.dataSetNames[dataSetName] },
                                chartIndex: chartIndex
                            });
                            addChart = ignoreArray.filter(function (d) {
                                return d.name === dataSetName;
                            }).length > 0;
                            if (!addChart) {
                                lineCharts.push(_react2.default.createElement(
                                    _victory.VictoryGroup,
                                    {
                                        key: 'chart-' + chart.id + '-' + chart.type + '-' + dataSetName,
                                        data: dataSets[dataSetName],
                                        color: chart.dataSetNames[dataSetName]
                                    },
                                    (0, _ComponentGenerator.getLineOrAreaComponent)(config, chartIndex, _this3._handleMouseEvent, xScale)
                                ));
                            }

                            return null;
                        });
                        break;
                    case 'area':
                        {
                            var areaLocal = [];
                            Object.keys(chart.dataSetNames).map(function (dataSetName) {
                                legendItems.push({
                                    name: dataSetName,
                                    symbol: { fill: chart.dataSetNames[dataSetName] },
                                    chartIndex: chartIndex
                                });

                                addChart = ignoreArray.filter(function (d) {
                                    return d.name === dataSetName;
                                }).length > 0;

                                if (!addChart) {
                                    areaLocal.push(_react2.default.createElement(
                                        _victory.VictoryGroup,
                                        {
                                            key: 'chart-' + chart.id + '-' + chart.type + '-' + dataSetName,
                                            data: dataSets[dataSetName],
                                            color: chart.dataSetNames[dataSetName]

                                        },
                                        (0, _ComponentGenerator.getLineOrAreaComponent)(config, chartIndex, _this3._handleMouseEvent, xScale)
                                    ));
                                }
                                return null;
                            });

                            if (chart.mode === 'stacked') {
                                areaCharts.push(_react2.default.createElement(
                                    _victory.VictoryStack,
                                    null,
                                    areaLocal
                                ));
                            } else {
                                areaCharts = areaCharts.concat(areaLocal);
                            }

                            break;
                        }
                    case 'bar':
                        {
                            var localBar = [];

                            horizontal = horizontal || chart.orientation === 'left';

                            Object.keys(chart.dataSetNames).map(function (dataSetName) {
                                legendItems.push({
                                    name: dataSetName,
                                    symbol: { fill: chart.dataSetNames[dataSetName] },
                                    chartIndex: chartIndex
                                });
                                addChart = ignoreArray.filter(function (d) {
                                    return d.name === dataSetName;
                                }).length > 0;
                                if (!addChart) {
                                    localBar.push((0, _ComponentGenerator.getBarComponent)(config, chartIndex, dataSets[dataSetName], chart.dataSetNames[dataSetName], xScale));
                                }

                                return null;
                            });

                            if (chart.mode === 'stacked') {
                                barcharts.push(_react2.default.createElement(
                                    _victory.VictoryStack,
                                    null,
                                    localBar
                                ));
                            } else {
                                barcharts = barcharts.concat(localBar);
                            }
                            break;
                        }
                    default:
                        throw new _VizGError2.default('BasicChart', 'Error in rendering unknown chart type');
                }

                return null;
            });

            if (areaCharts.length > 0) chartComponents = chartComponents.concat(areaCharts);
            if (lineCharts.length > 0) chartComponents = chartComponents.concat(lineCharts);
            if (barcharts.length > 0) {
                var barWidth = (horizontal ? height : width - 280) / (config.maxLength * (barcharts.length > 1 ? barcharts.length : 2)) - 3;

                chartComponents.push(_react2.default.createElement(
                    _victory.VictoryGroup,
                    {
                        horizontal: horizontal,
                        offset: barWidth,
                        style: { data: { width: barWidth } }
                    },
                    barcharts
                ));
            }

            return _react2.default.createElement(
                'div',
                {
                    style: {
                        overflow: 'hidden',
                        height: '100%',
                        width: '100%',
                        paddingBottom: 10
                    }
                },
                _react2.default.createElement(
                    'div',
                    {
                        style: { width: '100%', height: '100%' }
                    },
                    _react2.default.createElement(
                        _ChartSkeleton2.default,
                        {
                            width: this.props.width || width || 800,
                            height: this.props.height || height || 800,
                            config: config,
                            xScale: xScale,
                            yDomain: this.props.yDomain,
                            xDomain: this.state.xDomain,
                            xRange: this.xRange,
                            dataSets: dataSets,
                            theme: theme
                        },
                        config.legend === true ? (0, _ComponentGenerator.getBasicChartLegend)(config, legendItems, ignoreArray, this._legendInteraction, height, width) : null,
                        chartComponents
                    )
                ),
                config.brush ? (0, _ComponentGenerator.getBrushComponent)(xScale, this.xRange, this.state.xDomain, this._brushReset, this._brushOnChange) : null
            );
        }
    }]);

    return BasicChart;
}(_react2.default.Component);

exports.default = BasicChart;


BasicChart.defaultProps = {
    width: 800,
    height: 400,
    onClick: null,
    yDomain: null,
    append: true
};

BasicChart.propTypes = {
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    onClick: _propTypes2.default.func,
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
    yDomain: _propTypes2.default.arrayOf(_propTypes2.default.number),
    append: _propTypes2.default.bool
};