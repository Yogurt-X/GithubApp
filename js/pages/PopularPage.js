import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
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
        <ScrollableTabView
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
          initialPage={0}
          // renderTabBar={() => (
          //   <ScrollableTabBar
          //     style={{ height: 40, borderWidth: 0, elevation: 2 }}
          //     tabStyle={{ height: 39 }}
          //   />
          // )}
        >
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
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isLoading: true });
    const url = this.genFetchUrl(this.props.tabLabel);
    this.dataRepository
      .fetchNetRepository(url)
      .then((result) => {
        console.log(result);
        this.setState({
          result,
          isLoading: false,
        });
      });
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  _renderItem({ item }) {
    return <RepositoryCell data={item} />;
  }

  onSelectRepository=(item) => {
    console.log(item);
  }

  render() {
    const { result, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          automaticallyAdjustContentInsets={false}
          // 用于生成key,默认情况下每行都需要提供一个不重复的key属性。
          keyExtractor={item => item.node_id}
          data={result}
          renderItem={this._renderItem.bind(this)}
          // 行与行之间的分隔线组件
          // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          refreshControl={(
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.loadData}
                // 刷新指示器的背景色 android
              colors={['#2196F3']}
                // ios
              tintColor="#2196F3"
              title="加载中..."
              titleColor="#2196F3"
            />
          )}
        />
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
