/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import _ from 'lodash';

/**
 * Returns an array of default color set to be used in the visualizations.
 * @returns {Array} Array of colors in hex format.
 */
export function getDefaultColorScale() {
    return ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
        '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11',
        '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];
}

export function getXScale(type) {
    if (type.toLowerCase() === 'linear' || type.toLowerCase() === 'ordinal') return 'linear';
    else return 'time';
}

/**
 * Generate the chart array that contains the information on visualization of the charts in config.
 * @param {Array} charts chart configuration provided.
 * @return {Array} array containing objects of chart info.
 * @private
 */
export function generateChartArray(charts) {
    return charts.map((chart, chartIndex) => {
        return {
            type: chart.type,
            dataSetNames: {},
            mode: chart.mode,
            orientation: chart.orientation,
            color: Object.prototype.hasOwnProperty.call(chart, 'color'),
            colorScale: Array.isArray(chart.colorScale) ? chart.colorScale : getDefaultColorScale(),
            colorIndex: 0,
            id: chartIndex,
            y: chart.y,
        };
    });
}

export function trimDataSet(dataSets, maxLength) {
    _.keys(_.pickBy(dataSets, obj => obj.length > maxLength)).forEach((key) => {
        const lengthDiff = dataSets[key].length - maxLength;

        dataSets[key].splice(0, lengthDiff);
    });

    return dataSets;
}
