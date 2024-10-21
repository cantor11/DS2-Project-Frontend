import React, { useEffect, useState } from 'react';
import { getQuantityByCategory } from '../../../../api/WorkApi';
import ReactApexChart from "react-apexcharts";

const WorksByCategory = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByCategory();

            if (data) {
                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => item.category);

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
                                distributed: true,
                                horizontal: true
                            }
                        },
                        colors: ["#fcf649", "#f5770e", "#25c7ff"],
                        dataLabels: {
                            enabled: false
                        },
                        legend: {
                            show: false
                        },
                        title: {
                            text: 'Obra 2',
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

export default WorksByCategory;
