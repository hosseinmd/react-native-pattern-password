import React, { PureComponent } from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./props";
import styles from "./styles";
export default class Circle extends PureComponent {
  render() {
    let { color, normalColor, fill, x, y, r, inner, outer } = this.props;
    const outerDiameter = 2 * r;
    const innerDiameter = outerDiameter / 3;
    return (
      <View
        style={[
          styles.outer,
          {
            left: x - r,
            top: y - r,
            width: outerDiameter,
            height: outerDiameter,
            borderRadius: r
          },
          { borderColor: normalColor },
          fill && { borderColor: color },
          !outer && { borderWidth: 0 }
        ]}
      >
        {inner && (
          <View
            style={[
              !outer && styles.inner,
              fill
                ? {
                    backgroundColor: color,
                    width: innerDiameter,
                    height: innerDiameter,
                    borderRadius: r / 3
                  }
                : {}
            ]}
          />
        )}
      </View>
    );
  }
}

Circle.propTypes = propTypes;

Circle.defaultProps = defaultProps;