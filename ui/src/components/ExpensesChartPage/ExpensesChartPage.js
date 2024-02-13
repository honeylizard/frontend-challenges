import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import appLogo from "../../assets/expenses-chart-page/logo.svg";
import appStyles from "../../styles/expenses-chart-page/app.module.scss";

import ExpensesChart from "./common/ExpensesChart";
import CurrencyAmount from "./common/CurrencyAmount";
import Footer from "./Footer";
import PercentageAmount from "./common/PercentageAmount";

const ExpensesChartPage = ({ intl }) => {
    const data = {
        balance: 921.48,
        monthTotal: 478.33,
        monthDifference: 0.024,
        currency: "USD",
    };
    const title = intl.formatMessage({
        id: "expensesPage.title",
    });
    const balanceLabel = intl.formatMessage({
        id: "expensesPage.balance.title",
    });
    const chartLabel = intl.formatMessage({
        id: "expensesPage.chart.title",
    });
    const chartSummaryLabel = intl.formatMessage({
        id: "expensesPage.chart.summary.title",
    });
    const chartDifferenceLabel = intl.formatMessage({
        id: "expensesPage.chart.difference.title",
    });
    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap"
                />
            </Helmet>
            <div className={appStyles.centerBox}>
                <div className={appStyles.container}>
                    <header>
                        <h1 className="sr-only">{title}</h1>
                        <div className={appStyles.summary}>
                            <div className={appStyles.title}>{balanceLabel}</div>
                            <div className={appStyles.amount}>
                                <CurrencyAmount amount={data.balance} currency={data.currency} />
                            </div>
                        </div>
                        <img src={appLogo} alt={title} className={appStyles.headerLogo} />
                    </header>
                    <main id="content" className={appStyles.content}>
                        <h2 className={appStyles.chartTitle}>{chartLabel}</h2>
                        <ExpensesChart currency={data.currency} />
                        <hr className={appStyles.divider} />
                        <div className={appStyles.chartFooter}>
                            <div className={appStyles.title}>{chartSummaryLabel}</div>
                            <div className={appStyles.summary}>
                                <div className={appStyles.totalAmount}>
                                    <CurrencyAmount amount={data.monthTotal} currency={data.currency} />
                                </div>
                                <div className={appStyles.difference}>
                                    <div className={appStyles.amount}>
                                        <PercentageAmount amount={data.monthDifference} suffix="+" percision={1} />
                                    </div>
                                    <div className={appStyles.title}>{chartDifferenceLabel}</div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

ExpensesChartPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(ExpensesChartPage);
