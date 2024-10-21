import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getQuantityByPrice } from '../../../../api/WorkApi';

const WorksByPrice = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByPrice();

            if (data) {
                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => {
                    const [minPrice, maxPrice] = item.price_range;
                    if (!(maxPrice === null)) {
                        return `$${minPrice} - $${maxPrice}`;
                    } else {
                        return `+$${minPrice}`;
                    }
                });

                setChartData({
                    options: {
                        labels: labels,
                        legend: {
                            show: true
                        },
                        title: {
                            text: 'Obra 4',
                        },
                    },
                    series: seriesData,
                });
            }
        };

        fetchData();
    }, []);

    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            className="apexchart"
        />
    );
};

export default WorksByPrice;
