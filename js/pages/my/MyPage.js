import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';

export default class MyPage extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="我的"
                    statusBar={{ backgroundColor: '#2196F3' }}
                />
                <Text
                    style={styles.tips}
                    onPress={() => {
                        // 每次调用 ` push ` 时, 我们会向导航堆栈中添加新路由。
                        // 当你调用 ` navigate ` 时, 它首先尝试查找具有该名称的现有路由, 并且只有在堆栈上没有一个新路由时才会推送该路由。
                        this.props.navigation.push('Custom');
                    }}
                >
                自定义标签
                </Text>
                <Text
                    style={styles.tips}
                    onPress={() => {
                        this.props.navigation.push('Sort');
                    }}
                >
                标签排序
                </Text>
            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    tips: {
        fontSize: 29,
    },
});
