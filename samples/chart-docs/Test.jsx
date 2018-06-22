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
import VizG from '../../src/VizG';

export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this.chartConfig = {
            x: 'xAxisVal',
            charts: [{ type: 'bar', y: 'yAxisVal' }],
            timeSeriesStep: true,
        };

        this.metadata = {
            names: ['xAxisVal', 'yAxisVal', 'color'],
            types: ['linear', 'linear', 'ordinal'],
        };

        this.dataSet = [
            [new Date('2017-06-28 00:00:00.000'), 123, 'piston'],
            [new Date('2017-06-29 00:00:00.000'), 172, 'rotary'],
            [new Date('2017-06-30 00:00:00.000'), 1133, 'piston'],
            [new Date('2017-07-01 00:00:00.000'), 189, 'rotary'],
            [new Date('2017-07-02 00:00:00.000'), 9023, 'piston'],
            [new Date('2017-07-03 00:00:00.000'), 1923, 'rotary'],
            [new Date('2017-07-04 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-05 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-06 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-07 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-08 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-09 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-10 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-11 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-12 00:00:00.000'), 12123, 'piston'],
            [new Date('2017-07-13 00:00:00.000'), 12123, 'piston'],
        ];
    }

    render() {
        return (
            <VizG config={this.chartConfig} metadata={this.metadata} data={this.dataSet} />
        );
    }
}
