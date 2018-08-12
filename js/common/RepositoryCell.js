import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class RepositoryCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
        style={styles.container}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>
            {data.full_name}
          </Text>
          <Text style={styles.description}>
            {data.description}
          </Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>
Author:
              </Text>
              <Image
                style={{ height: 22, width: 22 }}
                source={{ uri: data.owner.avatar_url }}
              />
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text>
Star:
              </Text>
              <Text>
                {data.stargazers_count}
              </Text>
            </View>
            <Image
              style={{ width: 22, height: 22 }}
              source={require('../../res/images/ic_star.png')}
            />
          </View>
        </View>

      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'grey',
    shadowOffset: { width: 0.5, height: 0.5 }, // shadowOffset阴影偏移,x向右偏移4，y向下偏移4，默认(0, -3),这个跟shadowRadius配合使用
    shadowOpacity: 0.4, // 阴影透明度，默认0
    shadowRadius: 1, // 阴影半径
    elevation: 2, // 视图高度，用于android下达到阴影效果
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
