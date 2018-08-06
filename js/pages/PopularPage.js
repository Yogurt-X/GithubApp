import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import NavigationBar from '../common/NavigationBar';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="最热"
          statusBar={{ backgroundColor: '#2196F3' }}
        />
        <ScrollableTabView renderTabBar={() => <ScrollableTabBar />}>
          <PopularTab tabLabel="Java">
            JAVA
          </PopularTab>
          <PopularTab tabLabel="iOS">
            IOS
          </PopularTab>
          <PopularTab tabLabel="Android">
            Android
          </PopularTab>
          <PopularTab tabLabel="JavaScript">
            js
          </PopularTab>
        </ScrollableTabView>
      </View>
    );
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const url = this.genFetchUrl(this.props.tabLabel);
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  _renderItem(item) {
    return (
      <View>
        <Text>
          {item.full_name}
        </Text>
        <Text>
          {item.description}
        </Text>
        <Text>
          {item.owner.avatar_url}
        </Text>
        <Text>
          {item.stargazers_count}
        </Text>

      </View>
    );
  }

  onSelectRepository=(item) => {
    console.log(item);
  }

  render() {
    const { result } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ height: 600 }}>
          {result}
        </Text>
        {/* <FlatList
          automaticallyAdjustContentInsets={false}
          // 用于生成key,默认情况下每行都需要提供一个不重复的key属性。
          keyExtractor={(item, index) => index}
          data={this.state.result}
          renderItem={this._renderItem.bind(this)}
          // 行与行之间的分隔线组件
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tips: {
    fontSize: 29,
  },
});
