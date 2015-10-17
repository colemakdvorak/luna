var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var {
  AppRegistry,
  StyleSheet,
  View,
  Animated, 
  PanResponder
} = React;
var SQUARE_DIMENSIONS = 100;
var CIRCLE_SIZE = windowSize.width*0.75;
var ReboundBall = React.createClass({
  
  getInitialState: function() {
    return {
        listening: false,
        pan: new Animated.ValueXY()
    };
  },
  componentWillMount: function() {
    this._animatedValueX = 0;
    this._animatedValueY = 0; 
    this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
    this.state.pan.y.addListener((value) => this._animatedValueY = value.value);
    
        this._panResponder = PanResponder.create({
          onMoveShouldSetResponderCapture: () => true,
          onMoveShouldSetPanResponderCapture: () => true,
          onPanResponderGrant: (e, gestureState) => {
            this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
            this.state.pan.setValue({x: 0, y: 0});
          },
          onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y},
          ]),
          onPanResponderRelease: () => {
            this.state.listening = !this.state.listening;
            console.log(this.state.listening);
            Animated.spring(this.state.pan, {
              toValue: 0
            }).start();
          }
        });
  },  
  componentWillUnmount: function() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
  },
  getStyle: function() {
    return [
              styles.circle, 
              {
                transform: [
                  {
                    translateX: this.state.pan.x
                  },
                  {
                    translateY: this.state.pan.y
                  },
                ]
              },
              {
                opacity: this.state.pan.y.interpolate({inputRange: [-300, 0, 300], outputRange: [0.5, 1, 0.5]})
              }
            ];
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Animated.View 
          style={this.getStyle()} 
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 0,
    marginLeft: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'blue',
    marginBottom: -CIRCLE_SIZE/2,
  } 
});

module.exports = ReboundBall;
