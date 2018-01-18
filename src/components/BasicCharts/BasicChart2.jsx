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
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryVoronoiContainer, VictoryLine, VictoryTooltip, VictoryStack, VictoryGroup } from 'victory';
import { getDefaultColorScale, getXScale } from '../chart-helper';
import VizGError from '../../VizGError';
import generateLineComponent from './LineChartComponent';
import generateAreaComponent from './AreaChartComponent';

export default class BasicChart2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartArray: [],
            dataSets: {},
            xScale: 'linear',
        };

        this.chartConfig = undefined;

        this.visualizeData = this.visualizeData.bind(this);
        this.generateChartArray = this.generateChartArray.bind(this);
    }

    componentDidMount() {
        this.visualizeData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { config } = nextProps;
        if (this.chartConfig === undefined || !(_.isEqual(config, this.chartConfig))) {
            this.state.chartArray = [];
            this.state.dataSets = {};
            this.chartConfig = config;
        }

        this.visualizeData(nextProps);
    }

    visualizeData(props) {
        const { config, metadata, data } = props;
        let { chartArray, dataSets, xScale } = this.state;

        if (chartArray.length === 0) chartArray = this.generateChartArray(config.charts); // generate chart array from the config.
        const xIndex = metadata.names.indexOf(config.x);

        if (_.keys(dataSets).length === 0) {
            xScale = getXScale(metadata.types[xIndex]);
        }

        if (xScale !== getXScale(metadata.types[xIndex])) {
            throw VizGError('BasicChart', "Provided metadata doesn't match the previous metadata.");
        }

        chartArray.forEach((chart) => {
            const yIndex = metadata.names.indexOf(chart.y);
            const colorIndex = metadata.names.indexOf(chart.colorCategoryName);

            if (xIndex < 0 || yIndex < 0) {
                throw new VizGError('BasicChart', 'Axis name not found in metadata');
            }

            let dataSet = {};
            if (chart.color) {
                if (colorIndex < 0) {
                    throw new VizGError('BasicChart', 'Color category not found in metadata.');
                }
                dataSet = _.groupBy(data.map(
                    datum => ({ x: datum[xIndex], y: datum[yIndex], color: datum[colorIndex] })), d => d.color);

                _.difference(_.keys(dataSet), _.keys(chart.dataSetNames)).forEach((key) => {
                    const colorDomIn = _.indexOf(chart.colorDomain, key);
                    if (chart.colorIndex >= chart.colorScale.length) {
                        chart.colorIndex = 0;
                    }
                    if (colorDomIn < 0) {
                        chart.dataSetNames[key] = chart.colorScale[chart.colorIndex++];
                    } else if (colorDomIn > chart.colorScale.length) {
                        chart.dataSetNames[key] = chart.colorScale[0];
                    } else {
                        chart.dataSetNames[key] = chart.colorScale[colorDomIn];
                    }
                });
            } else {
                dataSet[chart.y] = data.map(datum => ({ x: datum[xIndex], y: datum[yIndex] }));
                chart.dataSetNames[chart.y] = chart.colorScale[chart.colorIndex];
            }

            _.mergeWith(dataSets, dataSet, (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                    return objValue.concat(srcValue);
                }
            });
        });
        this.setState({ chartArray, dataSets });
    }

    generateChartArray(charts) {
        return charts.map((chart, chartIndex) => {
            return {
                type: chart.type,
                dataSetNames: {},
                mode: chart.mode,
                orientation: chart.orientation || 'bottom',
                color: Object.prototype.hasOwnProperty.call(chart, 'color'),
                colorCategoryName: chart.color || '',
                colorScale: Array.isArray(chart.colorScale) ? chart.colorScale : getDefaultColorScale(),
                colorDomain: chart.colorDomain || [],
                colorIndex: chartIndex,
                id: chartIndex,
                y: chart.y,
            };
        });
    }

    render() {
        let legendComponents = [];
        let ignoredComponents = [];
        const { config, height, width } = this.props;
        const { chartArray, dataSets, xScale } = this.state;
        const chartComponents = [];


        chartArray.forEach((chart, chartIndex) => {
            const localChartSet = [];
            let dataSetLength = 1;
            _.keys(chart.dataSetNames).forEach((dsName) => {
                const component = {
                    line: () => {
                        return generateLineComponent(config, chartIndex, chart.dataSetNames[dsName], dataSets[dsName], null, xScale);
                    },
                    area: () => {
                        return generateAreaComponent(config, chartIndex, chart.dataSetNames[dsName], dataSets[dsName], null, xScale);
                    },
                    bar: () => {
                        // barLocal.push()
                    },
                };
                if (dataSetLength < dataSets[dsName].length) dataSetLength = dataSets[dsName].length;
                localChartSet.push(component[chart.type]());
            });
            
            if (chart.mode === 'stacked') {
                chartComponents.push(
                    (<VictoryStack>
                        {localChartSet}
                    </VictoryStack>));
                console.info(chartComponents);
            } else if (chart.type === 'bar') {
                const barWidth =
                    ((chart.orientation === 'bottom' ?
                        height : (width - 280)) / (dataSetLength * (localChartSet.length > 1 ? localChartSet.length : 2))) - 3;
                chartComponents.push((
                    <VictoryGroup
                        horizontal={(chart.orientation === 'left')}
                        offset={barWidth}
                        style={{ data: { width: barWidth } }}
                    >
                        {localChartSet}
                    </VictoryGroup>
                ));
            } else {
                chartComponents.push(...localChartSet);
            }
        });

        return (
            <VictoryChart
                containerComponent={
                    <VictoryVoronoiContainer
                        voronoiBlacklist={['ignore']}
                    />
                }
            >
                {chartComponents}
            </VictoryChart>
        );
    }
}

BasicChart2.defaultProps = {
    width: 800,
    height: 400,
    onClick: null,
    yDomain: null,
    append: true,
    data: [],
};

BasicChart2.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func,
    config: PropTypes.shape({
        x: PropTypes.string,
        charts: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
            y: PropTypes.string.isRequired,
            fill: PropTypes.string,
            color: PropTypes.string,
            colorScale: PropTypes.arrayOf(PropTypes.string),
            colorDomain: PropTypes.arrayOf(PropTypes.string),
            mode: PropTypes.string,
        })),
        tickLabelColor: PropTypes.string,
        legendTitleColor: PropTypes.string,
        legendTextColor: PropTypes.string,
        axisColor: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        maxLength: PropTypes.number,
    }).isRequired,
    yDomain: PropTypes.arrayOf(PropTypes.number),
    append: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.node),
    metadata: PropTypes.shape({
        names: PropTypes.arrayOf(PropTypes.string),
        types: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};
