import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import CurrencyAmount from "./common/CurrencyAmount";
import PercentageAmount from "./common/PercentageAmount";

import data from "../../assets/e-commerce-product-page/data.json";

import productStyles from "../../styles/e-commerce-product-page/product-detail.module.scss";
import CartIcon from "./common/CartIcon";

const ProductDetail = ({ intl }) => {
    const addToCartButtonLabel = intl.formatMessage({
        id: "eCommerceProductPage.add_to_cart",
    });

    const product = data.product;
    const currency = "USD";
    const currentPrice = product.price - product.discount;
    const currentImage = product.images[0];

    return (
        <section className={productStyles.details}>
            <div>
                <header className={productStyles.header}>
                    <div className={productStyles.name}>{product.name}</div>
                    <div className={productStyles.company}>{product.company}</div>
                </header>
                <div className={productStyles.description}>
                    <p>{product.description}</p>
                </div>
                <div className={productStyles.price}>
                    <CurrencyAmount className={productStyles.current} amount={currentPrice} currency={currency} />
                    &nbsp;
                    <PercentageAmount className={productStyles.percentage} amount={product.discountPercentage} />
                    <br />
                    <CurrencyAmount className={productStyles.previous} amount={product.price} currency={currency} />
                </div>
                <div className={productStyles.actions}>
                    <div className={productStyles.quantitySelector}>0</div>
                    <button type="button" className={productStyles.button}>
                        <CartIcon /> &nbsp;
                        {addToCartButtonLabel}
                    </button>
                </div>
            </div>
            <div className={productStyles.gallery}>
                <div className={productStyles.galleryCurrent}>
                    <img src={process.env.PUBLIC_URL + currentImage.imageSrc} alt={currentImage.alt} />
                </div>
                <ul className={productStyles.galleryList}>
                    {product.images.map((imageData) => (
                        <li key={`thumbnail-${imageData.id}`}>
                            <img src={process.env.PUBLIC_URL + imageData.thumbnailSrc} alt={imageData.alt} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

ProductDetail.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(ProductDetail);
