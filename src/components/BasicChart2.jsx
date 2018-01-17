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
import { generateChartArray } from './chart-helper';

export default class BasicChart2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartArray: [],
            dataSets: {},
        };

        this.visualizeData = this.visualizeData.bind(this);
    }

    componentDidMount() {
        this.visualizeData(this.props);
    }

    componentWillReceiveProps(nextProps) {

    }

    visualizeData(props) {
        let { config, metadata, data } = props;
        let { chartArray, dataSets } = this.state;
        chartArray = generateChartArray(config.charts);


        this.setState({ chartArray });
    }

    render() {
        return (
            <div />
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
