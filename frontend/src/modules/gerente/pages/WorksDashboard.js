import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getQuantityByBrand } from "../../../api/WorkApi";
import { WorksByStock, WorksByPrice, WorksByBrand, WorksByCategory } from "../../shared/components/charts";

const WorksDashboard = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByBrand();

            if (data) {
                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => item.brand);

                setChartData({
                    options: {
                        labels: labels,
                        legend: {
                            show: true
                        },
                        title: {
                            text: 'Product Quantity by Brand',
                        },
                    },
                    series: seriesData,
                });
            }
        };

        fetchData();
    }, []);

            /* <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    className="apexchart-pie"
                />*/

    return (
        <div className="container-fluid side-container">
            {/*<div className="row side-row">
                <WorksByBrand />
            </div>
            <div className="row side-row">
                <WorksByCategory />
            </div>*/}
            <div className="row side-row">
                <div className="col side-col">
                    <WorksByBrand />
                </div>
                <div className="col side-col">
                    <WorksByCategory />
                </div>
            </div>
            <div className="row side-row">
                <div className="col side-col">
                    <WorksByStock />
                </div>
                <div className="col side-col">
                    <WorksByPrice />
                </div>
            </div>
        </div>
        /*<div>
            <WorksByCategory />
        </div>
        <div>
            <WorksByPrice />
        </div>*/
    );
};

export default WorksDashboard;