import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
    }

    onSave() {

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="自定义标签"
                    style={{ backgroundColor: '#6495ED' }}
                    leftButton={ViewUtils.getLeftButton(() => this.onSave())}
                />
                <Text style={styles.tips}>
                    自定义标签
                </Text>
            </View>);
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
