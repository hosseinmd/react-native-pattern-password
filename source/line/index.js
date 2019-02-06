import { isEquals, getTransform } from "../helper";
import React, { PureComponent } from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./props";
import styles from "./styles";
export default class Line extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.props;
  }

  setNativeProps(props) {
    this.setState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      this.setState({ color: nextProps.color });
    }
  }

  render() {
    console.log(this.state);
    let { start, end, color } = this.state;

    if (isEquals(start, end)) return null;

    let transform = getTransform(start, end);
    let length = transform.d;
    let angle = transform.a + "rad";
    let moveX = transform.x;
    let moveY = transform.y;

    return (
      <View
        style={[
          styles.line,
          {
            backgroundColor: color,
            left: start.x,
            top: start.y,
            width: length
          },
          {
            transform: [
              { translateX: moveX },
              { translateY: moveY },
              { rotateZ: angle }
            ]
          }
        ]}
      />
    );
  }
}

Line.propTypes = propTypes;
Line.defaultProps = defaultProps;

module.exports = Line; // for compatible with require only
