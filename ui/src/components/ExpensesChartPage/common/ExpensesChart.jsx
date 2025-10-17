import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

import data from "@resources/expenses-chart-page/data.json";
import { currencyAmount } from "../utils/common";
import appStyles from "@styles/expenses-chart-page/app.module.scss";

const ExpensesChart = ({ intl, currency = "USD" }) => {
    const { chartData = [] } = data;

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const chartAltText = intl.formatMessage({
        id: "expensesPage.chart.alt",
    });

    const isCurrentDay = (day) => {
        const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]; // Label Reference from Chart

        return day === dayNames[new Date().getDay()];
    };

    const options = {
        responsive: true,
        scales: {
            y: { display: false }, // Do not show the values, grid lines, or border on y axis
            x: {
                grid: { display: false }, // Do not show the grid lines between the bars
                border: { display: false }, // Do not show border on x axis
                ticks: {
                    font: appStyles.fontFamily,
                    color: appStyles.brown,
                }, // customize the values on the x axis
            },
        },
        plugins: {
            legend: { labels: { filter: () => false } }, // Do not show dataset legend
            tooltip: {
                displayColors: false, // Do not use the color boxes next to the labels for datasets
                bodyColor: appStyles.white,
                backgroundColor: appStyles.brownDark,
                callbacks: {
                    title: () => {
                        return "";
                    }, // Do not render the bar label in the tooltip
                    label: (context) => currencyAmount(context.raw, currency), // customize the tooltip value
                },
            },
        },
        datasets: {
            bar: { borderRadius: 5, borderSkipped: false }, // customize the bar elements
        },
    };

    const dataSource = {
        labels: chartData.map((item) => item.day),
        datasets: [
            {
                data: chartData.map((item) => item.amount),
                backgroundColor: chartData.map((item) => (isCurrentDay(item.day) ? appStyles.cyan : appStyles.red)),
                hoverBackgroundColor: chartData.map((item) =>
                    isCurrentDay(item.day) ? appStyles.cyanLight : appStyles.redLight
                ),
            },
        ],
    };

    return <Bar options={options} data={dataSource} aria-label={chartAltText} />;
};

ExpensesChart.propTypes = {
    intl: PropTypes.object.isRequired,
    currency: PropTypes.string,
};

export default injectIntl(ExpensesChart);
