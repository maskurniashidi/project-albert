import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { logout } from "../../utils/auth";
import Unix from "./Unix";

function ApexChartFlow({ title, data, categories }) {

    const [dataGrafik, setDataGrafik] = useState()
    const [dataValue, setDataValue] = useState()
    const [flowTimeValue, setFlowTimeValue] = useState()
    const [allDataFlow, setAllDataFlow] = useState()
    const [lowerLow, setLowerLow] = useState(0);
    const [low, setLow] = useState(0);
    const [espi, setEspi] = useState(0);
    const [high, setHigh] = useState(0);
    const [higherHigh, setHigherHigh] = useState(0);

    // USEEFFECT GRAFIK
    useEffect(() => {
        // const interval = setInterval(() => {
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://rcm-albert.dhani.cloud/flow-sensor/_1675912783388/values',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                },
            };
            
            axios(config)
            .then(function (response) {
                setDataGrafik(response.data)
                // console.log("flow", response);
                setDataValue(response.data.map((dataz) => dataz.value))
                setFlowTimeValue(response.data.map((dataz) => Unix(dataz.createdAt._seconds)))
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                logout();
                }
                console.log(error.response.status)
                console.log(error);
            });
            console.log('useeffect flow jalan')
        // }, 5000);
    }, []);
    
    useEffect(() => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://rcm-albert.dhani.cloud/flow-sensor/all',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
            },
        };
        
        axios(config)
        .then(function (response) {
            // console.log("flow idx", response.data[0]);
            setAllDataFlow(response.data[0])
            setLowerLow(parseInt(response.data[0].LL))
            setLow(parseInt(response.data[0].L))
            setEspi(parseInt(response.data[0].SP))
            setHigh(parseInt(response.data[0].H))
            setHigherHigh(parseInt(response.data[0].HH))
            // console.log('response.data[0]: ', response.data[0].value)
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                logout();
            }
            console.log(error.response.status)
            console.log(error);
        });
    }, []);

    const [state, setState] = useState({
        series: [
            {
                name: title,
                data: []
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            title: {
                text: title,
                align: "left",
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            xaxis: {
              categories: categories
            }
        },
    });

    useEffect(() => {
        setState({
            series: [
                {
                    name: title,
                    data: dataValue
                },
            ],
            options: {
                annotations: {
                    position: "back",
                    yaxis: [
                        {
                            label: {
                                text: "LL"
                            },
                            y: 0,
                            y2: lowerLow,
                            fillColor: "brown"
                        },
                        {
                            label: {
                                text: "L"
                            },
                            y: lowerLow,
                            y2: low,
                            fillColor: "yellow"
                        },
                        {
                            label: {
                                text: "SP"
                            },
                            y: low,
                            y2: espi,
                            fillColor: "lime"
                        },
                        {
                            label: {
                                text: "H"
                            },
                            y: espi,
                            y2: high,
                            fillColor: "orange"
                        },
                        {
                            label: {
                                text: "HH"
                            },
                            y: high,
                            y2: higherHigh+20,
                            fillColor: "red"
                        }
                    ]
                },
                chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "straight",
                },
                title: {
                    text: title,
                    align: "left",
                },
                grid: {
                    row: {
                        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                        opacity: 0.5,
                    },
                },
                xaxis: {
                  categories: flowTimeValue
                }
            },})
    // }, [ low || lowerLow || espi || high || higherHigh || dataValue ])
    console.log('use state refresh jalan')
    }, [ low, lowerLow, espi, high, higherHigh, dataValue, flowTimeValue ])

    return (
        <>
            {
                (dataValue == null && flowTimeValue == null) ?
                // (dataValue == null) ?
                    <>null
                    </>
                    :
                    <div id="chart" className={styles.chartArea}>
                        <ReactApexChart options={state.options} series={state.series} type="line"/>
                        {/* <ReactApexChart options={state.options} series={[{data: [dataValue === undefined ? null : dataValue]}]} type="line"/> */}
                    </div>
            }
            {/* {
                console.log('ini datavalue: ', dataValue)
            } */}
            {/* {
                console.log('flowTimeValue: ', flowTimeValue)
            } */}
            {/* {Unix(1705937790)} */}
        </>
    );
}

export default ApexChartFlow;
