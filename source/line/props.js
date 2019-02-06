import PropTypes from "prop-types";

export const propTypes = {
  color: PropTypes.string,
  start: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  end: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
};

export const defaultProps = {
  color: "#8E91A8",
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 }
};
