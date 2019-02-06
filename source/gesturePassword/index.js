import * as helper from "../helper";
import React, { PureComponent } from "react";
import { PanResponder, View, Text } from "react-native";
import Line from "../line";
import Circle from "../circle";
import { HEIGHT, WIDTH, isVertical } from "../utils";
import { propTypes, defaultProps } from "./props";
import styles from "./styles";

const Top = isVertical ? ((HEIGHT - WIDTH) / 2.0) * 1.25 : 10;
const Radius = isVertical ? WIDTH / 10 : WIDTH / 25;

export default class GesturePassword extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;
    this.lastIndex = -1;
    this.sequence = ""; // 手势结果
    this.isMoving = false;

    // getInitialState
    let circles = [];
    let Margin = Radius;
    for (let i = 0; i < 9; i++) {
      let p = i % 3;
      let q = parseInt(i / 3);
      circles.push({
        isActive: false,
        x: p * (Radius * 2 + Margin) + Margin + Radius,
        y: q * (Radius * 2 + Margin) + Margin + Radius
      });
    }

    this.state = {
      circles: circles,
      lines: []
    };
  }

  _panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    // 开始手势操作
    onPanResponderGrant: (event, gestureState) => {
      this.onStart(event, gestureState);
    },
    // 移动操作
    onPanResponderMove: (event, gestureState) => {
      this.onMove(event, gestureState);
    },
    // 释放手势
    onPanResponderRelease: (event, gestureState) => {
      this.onEnd(event, gestureState);
    }
  });

  render() {
    const {
      status,
      normalColor,
      wrongColor,
      rightColor,
      innerCircle,
      outerCircle
    } = this.props;
    const color = status === "wrong" ? wrongColor : rightColor;

    return (
      <View style={[styles.frame, this.props.style, { flex: 1 }]}>
        <View style={styles.message}>
          <Text
            style={[styles.msgText, this.props.textStyle, { color: color }]}
          >
            {this.state.message || this.props.message}
          </Text>
        </View>
        <View style={styles.board} {...this._panResponder.panHandlers}>
          {this.state.circles.map(function(c, i) {
            return (
              <Circle
                key={i}
                fill={c.isActive}
                normalColor={normalColor}
                color={color}
                x={c.x}
                y={c.y}
                r={Radius}
                inner={!!innerCircle}
                outer={!!outerCircle}
              />
            );
          })}
          {this.state.lines.map(function(l, i) {
            return <Line key={i} color={color} start={l.start} end={l.end} />;
          })}
          <Line ref="line" color={color} />
        </View>

        {this.props.children}
      </View>
    );
  }

  setActive(index) {
    const circles = [...this.state.circles];
    circles[index].isActive = true;
    this.setState({ circles });
  }

  resetActive() {
    this.state.lines = [];
    let circles = [...this.state.circles];
    for (let i = 0; i < 9; i++) {
      circles[i].isActive = false;
    }
    this.setState({ circles });
    this.props.onReset && this.props.onReset();
  }

  getTouchChar(touch) {
    let x = touch.x;
    let y = touch.y;

    for (let i = 0; i < 9; i++) {
      if (helper.isPointInCircle({ x, y }, this.state.circles[i], Radius)) {
        return String(i);
      }
    }

    return false;
  }

  getCrossChar(char) {
    let middles = "13457",
      last = String(this.lastIndex);

    if (middles.indexOf(char) > -1 || middles.indexOf(last) > -1) return false;

    let point = helper.getMiddlePoint(
      this.state.circles[last],
      this.state.circles[char]
    );

    for (let i = 0; i < middles.length; i++) {
      let index = middles[i];
      if (helper.isEquals(point, this.state.circles[index])) {
        return String(index);
      }
    }

    return false;
  }

  onStart(e, g) {
    let x = isVertical
      ? e.nativeEvent.pageX
      : e.nativeEvent.pageX - WIDTH / 3.4;
    let y = isVertical
      ? e.nativeEvent.pageY - Top / 1.25
      : e.nativeEvent.pageY - 30;

    let lastChar = this.getTouchChar({ x, y });
    if (lastChar) {
      this.isMoving = true;
      this.lastIndex = Number(lastChar);
      this.sequence = lastChar;
      this.resetActive();
      this.setActive(this.lastIndex);

      let point = {
        x: this.state.circles[this.lastIndex].x,
        y: this.state.circles[this.lastIndex].y
      };

      this.refs.line.setNativeProps({ start: point, end: point });

      this.props.onStart && this.props.onStart();

      if (this.props.interval > 0) {
        clearTimeout(this.timer);
      }
    }
  }

  onMove(e, g) {
    let x = isVertical
      ? e.nativeEvent.pageX
      : e.nativeEvent.pageX - WIDTH / 3.4;
    let y = isVertical
      ? e.nativeEvent.pageY - Top / 1.25
      : e.nativeEvent.pageY - 30;

    if (this.isMoving) {
      this.refs.line.setNativeProps({ end: { x, y } });

      let lastChar = null;

      if (
        !helper.isPointInCircle(
          { x, y },
          this.state.circles[this.lastIndex],
          Radius
        )
      ) {
        lastChar = this.getTouchChar({ x, y });
      }

      if (lastChar && this.sequence.indexOf(lastChar) === -1) {
        if (!this.props.allowCross) {
          let crossChar = this.getCrossChar(lastChar);

          if (crossChar && this.sequence.indexOf(crossChar) === -1) {
            this.sequence += crossChar;
            this.setActive(Number(crossChar));
          }
        }

        let lastIndex = this.lastIndex;
        let thisIndex = Number(lastChar);

        this.state.lines.push({
          start: {
            x: this.state.circles[lastIndex].x,
            y: this.state.circles[lastIndex].y
          },
          end: {
            x: this.state.circles[thisIndex].x,
            y: this.state.circles[thisIndex].y
          }
        });

        this.lastIndex = Number(lastChar);
        this.sequence += lastChar;

        this.setActive(this.lastIndex);

        let point = {
          x: this.state.circles[this.lastIndex].x,
          y: this.state.circles[this.lastIndex].y
        };

        this.refs.line.setNativeProps({ start: point });
      }
    }

    if (this.sequence.length === 9) this.onEnd();
  }

  onEnd(e, g) {
    if (this.isMoving) {
      let password = helper.getRealPassword(this.sequence);
      this.sequence = "";
      this.lastIndex = -1;
      this.isMoving = false;

      let origin = { x: 0, y: 0 };
      this.refs.line.setNativeProps({ start: origin, end: origin });

      this.props.onEnd && this.props.onEnd(password);

      if (this.props.interval > 0) {
        this.timer = setTimeout(() => this.resetActive(), this.props.interval);
      }
    }
  }
}
GesturePassword.propTypes = propTypes;
GesturePassword.defaultProps = defaultProps;

module.exports = GesturePassword;
