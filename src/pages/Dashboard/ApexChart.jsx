import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart({ title, data, categories }) {
    const [state, setState] = useState({
        series: [
            {
                name: title,
                data: data,
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
                categories: categories,
            },
        },
    });

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
        </div>
    );
}

export default ApexChart;
