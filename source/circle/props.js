import PropTypes from "prop-types";

export const propTypes = {
  color: PropTypes.string,
  fill: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  inner: PropTypes.bool,
  outer: PropTypes.bool
};

export const defaultProps = {
  inner: true,
  outer: true
};
