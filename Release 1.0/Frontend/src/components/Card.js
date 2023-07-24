import React from "react";
import PropTypes from "prop-types";

const Card = ({ color, children, height, width, marginBottom }) => {
  const cardStyle = {
    backgroundColor: color,
    borderRadius: "2rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    marginBottom: marginBottom || "1rem",
    height: height || "auto",
    alignItems: "center",
    width: width || "auto",
  };

  return <div style={cardStyle}>{children}</div>;
};

Card.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
