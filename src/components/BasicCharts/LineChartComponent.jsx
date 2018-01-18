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
import { VictoryLine, VictoryPortal, VictoryScatter, VictoryTooltip } from 'victory';
import { timeFormat } from 'd3';

export default function generateLineComponent(config, chartIndex, color, dataSet, mouseEvent, xScale) {
    return ([
        (<VictoryLine
            name='ignore'
            style={{
                data: {
                    strokeWidth: config.charts[chartIndex].style ?
                        config.charts[chartIndex].style.strokeWidth || null : null,
                    stroke: color,
                },
            }}
            animate={config.animate ? { onEnter: { duration: 100 } } : null}
            data={dataSet}
        />),
        (<VictoryPortal>
            <VictoryScatter
                labels={
                    (() => {
                        if (xScale === 'time' && config.tipTimeFormat) {
                            return (data) => {
                                return `${config.x}:${timeFormat(config.tipTimeFormat)(new Date(data.x))}\n` +
                                    `${config.charts[chartIndex].y}:${Number(data.y).toFixed(2)}`;
                            };
                        } else {
                            return (d) => {
                                if (isNaN(d.x)) {
                                    return `${config.x}:${d.x}\n${config.charts[chartIndex].y}:${Number(d.y).toFixed(2)}`;
                                } else {
                                    return `${config.x}:${Number(d.x).toFixed(2)}\n` +
                                        `${config.charts[chartIndex].y}:${Number(d.y).toFixed(2)}`;
                                }
                            };
                        }
                    })()
                }
                labelComponent={
                    <VictoryTooltip
                        pointerLength={4}
                        cornerRadius={2}
                        flyoutStyle={{ fill: '#000', fillOpacity: '0.8', strokeWidth: 0 }}
                        style={{ fill: '#b0b0b0' }}
                    />
                }
                data={dataSet}
                style={{
                    data: {
                        fill: color,
                    },
                }}
            />
        </VictoryPortal>),
    ]);
}
