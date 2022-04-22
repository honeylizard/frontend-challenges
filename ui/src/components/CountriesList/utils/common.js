const renderListAsCommaSeperatedText = (list, attribute) => {
    let output = null;
    const delimiter = ", ";
    if (attribute) {
        const attributes = list.map((item) => item[attribute]);
        output = attributes.join(delimiter);
    } else {
        output = list.join(delimiter);
    }
    return output;
};

export { renderListAsCommaSeperatedText };
