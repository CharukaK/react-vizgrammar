'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BasicChart = require('./components/BasicChart');

var _BasicChart2 = _interopRequireDefault(_BasicChart);

var _ScatterChart = require('./components/ScatterChart');

var _ScatterChart2 = _interopRequireDefault(_ScatterChart);

var _PieChart = require('./components/PieChart');

var _PieChart2 = _interopRequireDefault(_PieChart);

var _MapChart = require('./components/MapChart');

var _MapChart2 = _interopRequireDefault(_MapChart);

var _TableChart = require('./components/TableChart');

var _TableChart2 = _interopRequireDefault(_TableChart);

var _NumberChart = require('./components/NumberChart');

var _NumberChart2 = _interopRequireDefault(_NumberChart);

var _InlineChart = require('./components/InlineChart');

var _InlineChart2 = _interopRequireDefault(_InlineChart);

var _VizGError = require('./VizGError');

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
// TODO:Fix dynamically changing config for other charts


var VizG = function (_Component) {
    _inherits(VizG, _Component);

    function VizG() {
        _classCallCheck(this, VizG);

        return _possibleConstructorReturn(this, (VizG.__proto__ || Object.getPrototypeOf(VizG)).apply(this, arguments));
    }

    _createClass(VizG, [{
        key: '_selectAndRenderChart',

        /**
         * Function will render a chart based on the given chart.
         * @param {String} chartType Chart type of the chart.
         * @param {Object} config Chart configuration provided by the user
         * @param {Array} data Data provided by the user
         * @param {Object} metadata Metadata related to the data provided
         * @param {Function} onClick OnClick function provided by the user
         * @private
         */
        value: function _selectAndRenderChart(chartType, config, data, metadata, onClick) {
            if (config.append === undefined) {
                config.append = true;
            }
            switch (chartType) {
                case 'line':
                case 'area':
                case 'bar':
                    return _react2.default.createElement(_BasicChart2.default, {
                        config: config,
                        metadata: metadata,
                        data: data,
                        onClick: onClick,
                        yDomain: this.props.yDomain,
                        append: this.props.append && config.append,
                        theme: this.props.theme,
                        width: this.props.width,
                        height: this.props.height
                    });
                case 'arc':
                    return _react2.default.createElement(_PieChart2.default, {
                        config: config,
                        metadata: metadata,
                        data: data,
                        onClick: onClick,
                        append: this.props.append && config.append,
                        width: this.props.width,
                        height: this.props.height
                    });
                case 'scatter':
                    return _react2.default.createElement(_ScatterChart2.default, {
                        config: config,
                        metadata: metadata,
                        data: data,
                        onClick: onClick,
                        append: this.props.append && config.append,
                        width: this.props.width,
                        height: this.props.height
                    });
                case 'map':
                    return _react2.default.createElement(_MapChart2.default, { config: config, metadata: metadata, data: data, onClick: onClick });
                case 'table':
                    return _react2.default.createElement(_TableChart2.default, {
                        metadata: metadata,
                        config: config,
                        data: data,
                        onClick: onClick
                    });
                case 'number':
                    return _react2.default.createElement(_NumberChart2.default, {
                        metadata: metadata,
                        config: config,
                        data: data,
                        onClick: onClick,
                        width: this.props.width,
                        height: this.props.height
                    });
                case 'spark-line':
                case 'spark-bar':
                case 'spark-area':
                    return _react2.default.createElement(_InlineChart2.default, {
                        metadata: metadata,
                        config: config,
                        data: data,
                        yDomain: this.props.yDomain,
                        append: this.props.append,
                        width: this.props.width,
                        height: this.props.height
                    });
                default:
                    throw new _VizGError2.default('VizG', 'Unknown chart ' + chartType + ' defined in the chart config.');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                config = _props.config,
                data = _props.data,
                metadata = _props.metadata,
                onClick = _props.onClick;

            return _react2.default.createElement(
                'div',
                { style: { height: '100%', width: '100%' } },
                !config || !metadata ? null : this._selectAndRenderChart(config.charts[0].type, config, data, metadata, onClick)
            );
        }
    }]);

    return VizG;
}(_react.Component);

VizG.defaultProps = {
    append: true,
    theme: 'materialLight',
    width: 800,
    height: 450
};

VizG.propTypes = {
    config: _propTypes2.default.object.isRequired,
    data: _propTypes2.default.array,
    metadata: _propTypes2.default.object.isRequired,
    onClick: _propTypes2.default.func,
    append: _propTypes2.default.bool,
    theme: _propTypes2.default.string,
    height: _propTypes2.default.number,
    width: _propTypes2.default.number
};

exports.default = VizG;