const React = require('react-native');
const Palette = require('../styles/Palette');
const Option = require('./Option.js');

const {
  View,
  ListView,
  StyleSheet,
  Text,
  SwitchIOS
} = React;

class SubSetting extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.setting.options),
    }
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.setting.description}
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderOption}
          style={styles.listView}
        />
      </View>
    )
  }

  renderOption(option) {
    return (
      <Option details={option} />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
  },
  nameContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  name: {
    fontSize: 20,
    color: '#212121',
  },
  icon: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#FFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
});

module.exports = SubSetting;
