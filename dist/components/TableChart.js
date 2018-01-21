'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d3');

require('react-table/react-table.css');

require('./resources/css/tableChart.css');

var _helper = require('./helper');

var _VizGError = require('../VizGError');

var _VizGError2 = _interopRequireDefault(_VizGError);

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


var ReactTableTest = function (_Component) {
    _inherits(ReactTableTest, _Component);

    function ReactTableTest(props) {
        _classCallCheck(this, ReactTableTest);

        var _this = _possibleConstructorReturn(this, (ReactTableTest.__proto__ || Object.getPrototypeOf(ReactTableTest)).call(this, props));

        _this.state = {
            columnArray: [],
            dataSet: [],
            initialized: false,
            columnColorIndex: 0,
            colorScale: []
        };
        return _this;
    }

    _createClass(ReactTableTest, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.metadata !== null) {
                this._handleData(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.metadata !== null) {
                this._handleData(nextProps);
            }
        }

        /**
         * handles data received by the props and populate the table
         * @param props
         * @private
         */

    }, {
        key: '_handleData',
        value: function _handleData(props) {
            var config = props.config,
                metadata = props.metadata,
                data = props.data;

            var tableConfig = config.charts[0];
            var _state = this.state,
                dataSet = _state.dataSet,
                columnArray = _state.columnArray,
                initialized = _state.initialized,
                columnColorIndex = _state.columnColorIndex,
                colorScale = _state.colorScale;

            colorScale = Array.isArray(tableConfig.colorScale) ? tableConfig.colorScale : (0, _helper.getDefaultColorScale)();

            if (columnColorIndex >= colorScale.length) {
                columnColorIndex = 0;
            }

            tableConfig.columns.map(function (column, i) {
                var colIndex = metadata.names.indexOf(column);

                if (colIndex === -1) {
                    throw new _VizGError2.default('TableChart', 'Unknown data column defined in the table chart configuration');
                }

                if (!initialized) {
                    columnArray.push({
                        datIndex: colIndex,
                        title: tableConfig.columnTitles[i] || column,
                        accessor: column
                    });
                }

                data.map(function (datum) {
                    if (metadata.types[colIndex].toLowerCase() === 'linear') {
                        if (!columnArray[i].hasOwnProperty('range')) {
                            columnArray[i].range = [datum[colIndex], datum[colIndex]];
                            columnArray[i].color = colorScale[columnColorIndex++];
                        }

                        if (datum[colIndex] > columnArray[i].range[1]) {
                            columnArray[i].range[1] = datum[colIndex];
                        }

                        if (datum[colIndex] < columnArray[i].range[0]) {
                            columnArray[i].range[0] = datum[colIndex];
                        }
                    } else {
                        if (!columnArray[i].hasOwnProperty('colorMap')) {
                            columnArray[i].colorIndex = 0;
                            columnArray[i].colorMap = {};
                        }

                        if (columnArray[i].colorIndex >= colorScale.length) {
                            columnArray[i].colorIndex = 0;
                        }

                        if (!columnArray[i].colorMap.hasOwnProperty(datum[colIndex])) {
                            columnArray[i].colorMap[datum[colIndex]] = colorScale[columnArray[i].colorIndex++];
                        }
                    }
                });
            });

            data = data.map(function (d) {
                var tmp = {};
                for (var i = 0; i < metadata.names.length; i++) {
                    tmp[metadata.names[i]] = d[i];
                }

                return tmp;
            });

            initialized = true;
            dataSet = dataSet.concat(data);

            while (dataSet.length > config.maxLength) {
                dataSet.shift();
            }

            this.setState({
                dataSet: dataSet,
                columnColorIndex: columnColorIndex,
                columnArray: columnArray,
                initialized: initialized,
                colorScale: colorScale
            });
        }
    }, {
        key: '_getLinearColor',
        value: function _getLinearColor(color, range, value) {
            return (0, _d.scaleLinear)().range(['#fff', color]).domain(range)(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                config = _props.config,
                metadata = _props.metadata;
            var _state2 = this.state,
                dataSet = _state2.dataSet,
                columnArray = _state2.columnArray;

            var chartConfig = [];

            columnArray.map(function (column, i) {
                var columnConfig = {
                    Header: column.title,
                    accessor: column.accessor
                };
                if (config.colorBasedStyle) {
                    columnConfig.Cell = function (props) {
                        return _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: column.range ? _this2._getLinearColor(column.color, column.range, props.value) : column.colorMap[props.value],
                                    margin: 0,
                                    textAlign: 'center'
                                }
                            },
                            _react2.default.createElement(
                                'span',
                                null,
                                props.value
                            )
                        );
                    };
                } else {
                    columnConfig.Cell = function (props) {
                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                props.value
                            )
                        );
                    };
                }

                chartConfig.push(columnConfig);
            });

            return _react2.default.createElement(_reactTable2.default, {
                data: dataSet,
                columns: chartConfig,
                showPagination: false,
                minRows: config.maxLength
            });
        }
    }]);

    return ReactTableTest;
}(_react.Component);

ReactTableTest.propTypes = {
    config: _propTypes2.default.object.isRequired,
    metadata: _propTypes2.default.object.isRequired,
    data: _propTypes2.default.array
};

exports.default = ReactTableTest;