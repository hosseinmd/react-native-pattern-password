# react-native-pattern-password

A pattern password component for React Native. It supports both iOS and Android since it's written in pure JavaScript.


![image](https://github.com/hosseinmd/react-native-pattern-password/raw/master/screenshot.gif)

## Install

```javascript
npm install react-native-pattern-password --save
npm install prop-types    --save
```

## Properties

All properties bellow are optional.

### message (string)

The message text you want to show. NOTE: If you leave this blank, no message appears for any state changes.

### status (string)

Can be 'normal', 'right' or 'wrong'.

The pattern password don't validate your password. You should do that yourself, and tell the result by status.

### style (string)

Styles for the pattern password view.

### textStyle (string)

Style for the text element in the view.

### normalColor (string)

Use this color to render the default circle color.

### rightColor (string)

Use this color to render when status !== 'wrong'.

### wrongColor (string)

Use this color to render when status === 'wrong'.

### interval (number)

The active circles will be reset automatically after you give an interval.

### allowCross (boolean)

Allow cross the circles(eg: 1 -> 7 -> 4), default is false.

### onStart (function)

Event raised when user touch a number circle.

### onEnd (function)

Event raised when user finish input a password.

### onReset (function)

Event raised after the reset interval has cleared circles. Can be used to reset message.

### children

Other components that you want to display.

### outerCircle and innerCircle (boolean)

Control whether to draw outer and inner circle, true default.

## Examples

```javascript

import React  from 'react';
import { AppRegistry } from 'react-native';
import PasswordGesture from 'react-native-pattern-password';

var Password1 = '';
class AppDemo extends PureComponent {
    // Example for check password
    onEnd= (password)=> {
        if (password == '123') {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });

            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    };
    onStart=()=> {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    };
    onReset=()=>{
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    };
    // Example for set password
    /*
    onEnd= (password)=> {
        if ( Password1 === '' ) {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: 'Please input your password secondly.'
            });
        } else {
            // The second password
            if ( password === Password1 ) {
                this.setState({
                    status: 'right',
                    message: 'Your password is set to ' + password
                });

                Password1 = '';
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message:  'Not the same, try again.'
                });
            }
        }
    };
    onStart=()=> {
        if ( Password1 === '') {
            this.setState({
                message: 'Please input your password.'
            });
        } else {
            this.setState({
                message: 'Please input your password secondly.'
            });
        }
    };
    */

    getInitialState() {
        return {
            message: 'Please input your password.',
            status: 'normal'
        }
    };
    render() {
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                />
        );
    }
});

AppRegistry.registerComponent('AppDemo', () => AppDemo);

```

If you have suggestions or bug reports, feel free to send pull request or [create new issue](https://github.com/hosseinmd/react-native-pattern-password/issues/new).
