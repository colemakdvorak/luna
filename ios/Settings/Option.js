const React = require('react-native');
//const Palette = require('../constants/Palette');

const {
  StyleSheet,
  Text,
  View,
  SwitchIOS,
} = React;

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.details.name,
      onOff: props.details.onOff
    }
  }

  render() {
    return (
    <View>
      <Text>
        {this.state.name}
      </Text>
      <SwitchIOS
        onValueChange={(value) => this.setState({onOff: value})}
        value={this.state.onOff} />
    </View>
    );
  }
};

module.exports = Option;