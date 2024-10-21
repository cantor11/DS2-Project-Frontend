import React, { useEffect, useState } from 'react';
import { getQuantityByBrand } from '../../../../api/WorkApi';
import ReactApexChart from "react-apexcharts";

const WorksByBrand = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByBrand();

            if (data) {
                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => item.brand);

                const series = [{
                    data: seriesData
                }];

                setChartData({
                    options: {
                        chart: {
                            id: 'basic-bar',
                        },
                        xaxis: {
                            categories: labels
                        },
                        plotOptions: {
                            bar: {
                                borderRadius: 4,
                                borderRadiusApplication: 'end',
                                distributed: true
                            }
                        },
                        colors: ["#25c7ff", "#2a617a", "#ff3060", "#f5770e", "#7637ff", "#66ff4b"],
                        dataLabels: {
                            enabled: false
                        },
                        legend: {
                            show: false
                        },
                        title: {
                            text: 'Obra 1',
                        }
                    },
                    series: series
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div className="apexchart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type='bar'
                height="350"
            />
        </div>
    );
};

export default WorksByBrand;
