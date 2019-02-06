import PropTypes from "prop-types";

export const propTypes = {
  message: PropTypes.string,
  normalColor: PropTypes.string,
  rightColor: PropTypes.string,
  wrongColor: PropTypes.string,
  status: PropTypes.oneOf(["right", "wrong", "normal"]),
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  onReset: PropTypes.func,
  interval: PropTypes.number,
  allowCross: PropTypes.bool,
  innerCircle: PropTypes.bool,
  outerCircle: PropTypes.bool
};

export const defaultProps = {
  message: "",
  normalColor: "#5FA8FC",
  rightColor: "#5FA8FC",
  wrongColor: "#D93609",
  status: "normal",
  interval: 0,
  allowCross: false,
  innerCircle: true,
  outerCircle: true
};
