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
import { VictoryChart, VictoryArea, VictoryVoronoiContainer, VictoryTooltip, VictoryGroup } from 'victory';
import VizG from '../../src/components/BasicChart2';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                [0, 10, 1, 'Piston']
            ],
            timer: 1,
            chartConfig: this.sparkLineConfig
        };
    }


    componentDidMount() {
        // setInterval(() => {
        //     this.setState({
        //         data: [[Math.round(Math.random() * 100), Math.round(Math.random() * 100), 1, 'Piston'], [Math.round(Math.random() * 100), Math.round(Math.random() * 100), 1, 'rotary']],
        //         timer: this.state.timer + 1
        //     });
        // }, 1000);



    }

    mapConfig = {
        key: 'rpm',
        charts: [{
            type: 'table',
            y: 'torque',
            color: '*',
            columns: ['EngineType', 'torque', 'rpm'],
            columnTitles: ['Engine Type', 'Engine Torque', 'Engine RPM'],
        }
        ],
        maxLength: 7,
        width: 400,
        height: 200,
        colorBasedStyle: true

    };


    sparkLineConfig = {
        x: 'rpm',
        charts: [{ type: 'area', y: 'torque', color: 'EngineType', colorScale: ['red','green','grey'], colorDomain: ['','piston'] }],
        maxLength: 30,
        width: 800,
        height: 400,
        // brush: true,
        interactiveLegend: true,
        legend: true,
        tipTimeFormat: '%A'
        // animation: true
    };

    sparkLineConfig2 = {
        x: 'rpm',
        charts: [{ type: 'line', y: 'torque', color: 'EngineType' }],
        maxLength: 30,
        width: 800,
        height: 400,
        interactiveLegend: true,
        // animation: true
    };

    metadataWithTime = {
        'names': ['rpm', 'torque', 'horsepower', 'EngineType'],
        'types': ['time', 'linear', 'ordinal', 'ordinal']
    };

    dataWithT = [
        [new Date(2017, 21, 10), 12, 12, 'piston'],
        [new Date(2017, 22, 10), 2, 12, 'rotary'],
        [new Date(2017, 23, 10), -6, 12, 'piston'],

        [new Date(2017, 24, 10), 89, 12, 'piston'],
        [new Date(2017, 25, 10), 60, 12, 'piston'],
        [new Date(2017, 26, 10), 40, 12, 'piston']
    ];

    dataWithTV = [
        { x: new Date(2017, 10, 21), y: 12 },
        { x: new Date(2017, 10, 22), y: 24 },
        { x: new Date(2017, 10, 23), y: 16 }
    ];


    metadata = {
        'names': ['rpm', 'torque', 'horsepower', 'EngineType'],
        'types': ['linear', 'linear', 'ordinal', 'ordinal']
    };

    staticDataSet = [
        [10, 11, 12, 'piston'],
        [11, 15, 12, 'rotary'],
        [12, 14, 12, 'piston'],
        [13, 24, 12, 'rotary'],
        [14, -6, 12, 'piston'],
        [15, 11, 12, 'rotary'],
        [16, 15, 12, 'piston'],
        [17, 14, 12, 'rotary'],
        [18, 24, 12, 'piston'],
        [19, 6, 12, 'rotary'],
        [20, 11, 12, 'piston'],
        [21, 15, 12, 'rotary'],
        [22, 14, 12, 'piston'],
        [23, 24, 12, 'piston'],
        [24, 6, 12, 'rotary'],
    ];

    tableDataSet = [
        {
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23,
            }
        }, {
            name: 'Charuka Karunanayake',
            age: 22,
            friend: {
                name: 'Don\'t have any',
                age: 'blah',
            }
        }, {
            name: 'Kaveen Karunanayake',
            age: 21,
            friend: {
                name: 'Don\'t have any',
                age: 'blah',
            }
        }
    ];


    columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
    }, {
        Header: 'Age',
        accessor: 'age',
        Cell: props => (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#dadada',
                    margin: 0,
                    textAlign: 'center'
                }}
            >
                <span>{props.value}</span>
            </div>) // Custom cell components!
    }, {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
    }, {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
    }];



    render() {
        // console.log("AAAA"+this.state.data)
        let chartComponents = [
            (
                <VictoryArea data={[
                    { x: new Date(2017, 21, 10), y: 12 },
                    { x: new Date(2017, 22, 10), y: 24 },
                    { x: new Date(2017, 23, 10), y: 16 }
                ]} />
            ),
            (
                <VictoryGroup>
                    <VictoryArea data={[
                        { x: new Date(2017, 21, 10), y: 10 },
                        { x: new Date(2017, 22, 10), y: 2 },
                        { x: new Date(2017, 23, 10), y: 90 }
                    ]} />
                </VictoryGroup>
            )
        ]
        return (
            <div>

                {/* <VizG config={this.sparkLineConfig} metadata={this.metadata} data={this.staticDataSet} onClick={(data)=>{
                    console.log(data);
                }} /> */}
                {/* <VizG config={this.sparkLineConfig} metadata={this.metadata} data={this.state.staticDataSet} /> */}
                <button onClick={() => { this.setState({ chartConfig: this.sparkLineConfig2 }); }}>Change</button>
                <VizG config={this.state.chartConfig} metadata={this.metadata} data={this.staticDataSet} />
                {/*<VictoryChart*/}
                    {/*scale={{ x: 'time' }}*/}
                    {/*domain={{ x: null }}*/}
                    {/*containerComponent={*/}
                        {/*<VictoryVoronoiContainer*/}
                            {/*voronoiDimension="x"*/}
                            {/*voronoiBlacklist={["first"]}*/}
                            {/*labels={(d) => `y:${d.y}`}*/}
                            {/*labelComponent={*/}
                                {/*<VictoryTooltip*/}
                                    {/*y={150}*/}
                                    {/*flyoutStyle={{ fill: "white" }}*/}
                                    {/*style={[{ fill: "green" }, { fill: "magenta" }]}*/}
                                {/*/>*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*}*/}
                {/*>*/}
                    {/*{chartComponents}*/}
                {/*</VictoryChart>*/}

            </div>
        );
    }

}
