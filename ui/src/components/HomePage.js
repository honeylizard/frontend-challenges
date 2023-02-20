import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import data from "../assets/challenges.json";

const HomePage = ({ intl }) => {
    const title = intl.formatMessage({ id: "header.appTitle" });
    const content = intl.formatMessage({ id: "app.home.body" });
    const challengeLabel = intl.formatMessage({ id: "app.home.challenge" });
    const solutionLabel = intl.formatMessage({ id: "app.home.solution" });
    const linkLabel = intl.formatMessage({ id: "app.home.solution.link" });

    return (
        <div id="content" className="wrapper content main" role="main">
            <section className="home-section section">
                <h1>{title}</h1>
                <p>{content}</p>

                <table className="tableBordered">
                    <thead>
                        <tr>
                            <th scope="col">{challengeLabel}</th>
                            <th scope="col">{solutionLabel}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.length > 0 &&
                            data.map((challenge, index) => (
                                <tr key={`challenge-row-${index}`}>
                                    <th scope="row">{challenge.title}</th>
                                    <td>
                                        <Link to={challenge.solution_url} className="link">
                                            {linkLabel}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

HomePage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(HomePage);
