'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBrushComponent = exports.getBarComponent = exports.getLineOrAreaComponent = undefined;
exports.getPieChartLegendComponent = getPieChartLegendComponent;
exports.getBasicChartLegend = getBasicChartLegend;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _victory = require('victory');

var _rcSlider = require('rc-slider');

require('rc-slider/assets/index.css');

var _d = require('d3');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MARK_RADIUS = 4; /*
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

var DEFAULT_AREA_FILL_OPACITY = 0.1;

function getLineOrAreaComponent(config, chartIndex, _onClick, xScale) {
    var chartElement = config.charts[chartIndex].type === 'line' ? _react2.default.createElement(_victory.VictoryLine, {
        style: {
            data: {
                strokeWidth: config.charts[chartIndex].style ? config.charts[chartIndex].style.strokeWidth || null : null
            }
        },
        animate: config.animate ? { onEnter: { duration: 100 } } : null
    }) : _react2.default.createElement(_victory.VictoryArea, {
        style: {
            data: {
                fillOpacity: config.charts[chartIndex].style ? config.charts[chartIndex].style.fillOpacity || DEFAULT_AREA_FILL_OPACITY : DEFAULT_AREA_FILL_OPACITY
            }
        },
        animate: config.animate ? { onEnter: { duration: 100 } } : null
    });

    return [chartElement, _react2.default.createElement(_victory.VictoryScatter, {
        labels: function () {
            if (xScale === 'time' && config.tipTimeFormat) {
                return function (data) {
                    return config.x + ':' + (0, _d.timeFormat)(config.tipTimeFormat)(new Date(data.x)) + '\n' + (config.charts[chartIndex].y + ':' + Number(data.y).toFixed(2));
                };
            } else {
                return function (d) {
                    if (isNaN(d.x)) {
                        return config.x + ':' + d.x + '\n' + config.charts[chartIndex].y + ':' + Number(d.y).toFixed(2);
                    } else {
                        return config.x + ':' + Number(d.x).toFixed(2) + '\n' + (config.charts[chartIndex].y + ':' + Number(d.y).toFixed(2));
                    }
                };
            }
        }(),
        labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
            orientation: 'right',
            pointerLength: 4,
            cornerRadius: 2,
            flyoutStyle: { fill: '#000', fillOpacity: '0.8', strokeWidth: 0 },
            style: { fill: '#b0b0b0' }
        }),
        padding: { left: 100, top: 30, bottom: 50, right: 30 },
        size: config.charts[chartIndex].style ? config.charts[chartIndex].style.markRadius || DEFAULT_MARK_RADIUS : DEFAULT_MARK_RADIUS,
        events: [{
            target: 'data',
            eventHandlers: {
                onClick: function onClick() {
                    return [{
                        target: 'data',
                        mutation: _onClick
                    }];
                }
            }
        }],
        animate: config.animate ? { onEnter: { duration: 100 } } : null

    })];
}

exports.getLineOrAreaComponent = getLineOrAreaComponent;
function getBarComponent(config, chartIndex, data, color, _onClick2, xScale) {
    return _react2.default.createElement(_victory.VictoryBar, {
        labels: function () {
            if (xScale === 'time' && config.tipTimeFormat) {
                return function (d) {
                    return config.x + ':' + (0, _d.timeFormat)(config.tipTimeFormat)(new Date(d.x)) + '\n' + (config.charts[chartIndex].y + ':' + Number(d.y).toFixed(2));
                };
            } else {
                return function (d) {
                    if (isNaN(d.x)) {
                        return config.x + ':' + d.x + '\n' + config.charts[chartIndex].y + ':' + Number(d.y).toFixed(2);
                    } else {
                        return config.x + ':' + Number(d.x).toFixed(2) + '\n\n                                ' + config.charts[chartIndex].y + ':' + Number(d.y).toFixed(2);
                    }
                };
            }
        }(),
        labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
            orientation: 'top',
            pointerLength: 4,
            cornerRadius: 2,
            flyoutStyle: { fill: '#000', fillOpacity: '0.8', strokeWidth: 0 },
            style: { fill: '#b0b0b0' }
        }),
        data: data,
        color: color,
        events: [{
            target: 'data',
            eventHandlers: {
                onClick: function onClick() {
                    return [{
                        target: 'data',
                        mutation: _onClick2
                    }];
                }
            }
        }],
        animate: config.animate ? { onEnter: { duration: 100 } } : null
    });
}

/**
 * Returns a Victory legend component for the given config.
 * @param {Object} config Chart configuration
 * @param {Array} legendItems Items to be included in the legend
 * @param {Array} ignoreArray Items to be ignored in the legend
 * @param {Function} interaction Function to handle interactions
 * @param {Number} height height of the chart
 * @param {Number} width width of the chart
 * @returns Victory Legend component to be included in the graph.
 */
exports.getBarComponent = getBarComponent;
function getPieChartLegendComponent(config, legendItems, ignoreArray, interaction, height, width) {
    return _react2.default.createElement(
        'div',
        {
            style: {
                width: !config.legendOrientation ? '20%' : function () {
                    if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                        return '20%';
                    } else return '100%';
                }(),
                height: !config.legendOrientation ? '100%' : function () {
                    if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                        return '100%';
                    } else return '20%';
                }(),
                display: !config.legendOrientation ? 'inline' : function () {
                    if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                        return 'inline';
                    } else return null;
                }(),
                float: !config.legendOrientation ? 'right' : function () {
                    if (config.legendOrientation === 'left') return 'right';else if (config.legendOrientation === 'right') return 'right';else return null;
                }()
            }
        },
        _react2.default.createElement(_victory.VictoryLegend, {
            containerComponent: _react2.default.createElement(_victory.VictoryContainer, { responsive: true }),
            centerTitle: true,
            height: function () {
                if (!config.legendOrientation) return height;else if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                    return height;
                } else return 100;
            }(),
            width: function () {
                if (!config.legendOrientation) return 200;else if (config.legendOrientation === 'left' || config.legendOrientation === 'right') return 200;else return width;
            }(),
            orientation: !config.legendOrientation ? 'vertical' : function () {
                if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                    return 'vertical';
                } else {
                    return 'horizontal';
                }
            }(),
            style: {
                title: {
                    fontSize: config.style ? config.style.legendTitleSize || 25 : 25,
                    fill: config.style ? config.style.legendTitleColor : null
                },
                labels: {
                    fontSize: config.style ? config.style.legendTextSize || 18 : 18,
                    fill: config.style ? config.style.legendTextColor : null
                }
            },
            data: legendItems.length > 0 ? legendItems : [{
                name: 'undefined',
                symbol: { fill: '#333' }
            }],
            itemsPerRow: config.legendOrientation === 'top' || config.legendOrientation === 'bottom' ? 10 : null,
            events: [{
                target: 'data',
                eventHandlers: {
                    onClick: config.interactiveLegend ? function () {
                        // TODO: update doc with the attribute
                        return [{
                            target: 'data',
                            mutation: interaction
                        }];
                    } : null
                }
            }]
        })
    );
}

function getBasicChartLegend(config, legendItems, ignoreArray, interaction, height, width) {
    return _react2.default.createElement(
        _victory.VictoryPortal,
        null,
        _react2.default.createElement(_victory.VictoryLegend, {
            x: function () {
                if (!config.legendOrientation) return width - 150;else if (config.legendOrientation === 'right') {
                    return width - 100;
                } else if (config.legendOrientation === 'left') {
                    return 0;
                } else return 100;
            }(),
            y: function () {
                if (!config.legendOrientation) return 0;else if (config.legendOrientation === 'top') {
                    return 0;
                } else if (config.legendOrientation === 'bottom') {
                    return height - 100;
                } else return 0;
            }(),
            standalone: true,
            containerComponent: _react2.default.createElement(_victory.VictoryContainer, { responsive: true }),
            centerTitle: true,
            height: height,
            width: width,
            orientation: !config.legendOrientation ? 'vertical' : function () {
                if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                    return 'vertical';
                } else {
                    return 'horizontal';
                }
            }(),
            style: {
                title: {
                    fontSize: config.style ? config.style.legendTitleSize || 25 : 25,
                    fill: config.style ? config.style.legendTitleColor : null
                },
                labels: {
                    fontSize: config.style ? config.style.legendTextSize || 18 : 18,
                    fill: config.style ? config.style.legendTextColor : null
                }
            },
            data: legendItems.length > 0 ? legendItems : [{
                name: 'undefined',
                symbol: { fill: '#333' }
            }],
            itemsPerRow: config.legendOrientation === 'top' || config.legendOrientation === 'bottom' ? 10 : null,
            events: [{
                target: 'data',
                eventHandlers: {
                    onClick: config.interactiveLegend ? function () {
                        // TODO: update doc with the attribute
                        return [{
                            target: 'data',
                            mutation: interaction
                        }];
                    } : null
                }
            }]
        })
    );
}

function getBrushComponent(xScale, xRange, xDomain, reset, _onChange) {
    return _react2.default.createElement(
        'div',
        { style: { width: '80%', height: 40, display: 'inline', float: 'left', right: 10 } },
        _react2.default.createElement(
            'div',
            { style: { width: '10%', display: 'inline', float: 'left', left: 20 } },
            _react2.default.createElement(
                'button',
                {
                    onClick: function onClick() {
                        reset(xRange);
                    }
                },
                'Reset'
            )
        ),
        _react2.default.createElement(
            'div',
            { style: { width: '90%', display: 'inline', float: 'right' } },
            _react2.default.createElement(_rcSlider.Range, {
                max: xScale === 'time' ? xRange[1].getDate() : xRange[1],
                min: xScale === 'time' ? xRange[0].getDate() : xRange[0],
                defaultValue: xScale === 'time' ? [xRange[0].getDate(), xRange[1].getDate()] : [xRange[0], xRange[1]],
                value: xScale === 'time' ? [xDomain[0].getDate(), xDomain[1].getDate()] : xDomain,
                onChange: function onChange(d) {
                    _onChange(d);
                }
            })
        )
    );
}
exports.getBrushComponent = getBrushComponent;