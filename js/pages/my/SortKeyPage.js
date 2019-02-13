import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import NavigationBar from '../../common/NavigationBar';

import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/languageDao';
import ArrayUtils from '../../util/ArrayUtils';
import ViewUtils from '../../util/ViewUtils';

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: [],
        };
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }

    loadData() {
        // 从数据库中读取所有标签
        this.languageDao.fetch()
            .then((result) => {
                this.getCheckedItems(result);
            })
            .catch((error) => {

            });
    }

    // 获取已选中的标签
    getCheckedItems(result) {
        this.dataArray = result;
        let checkedArray = result.filter(data => data.checked);
        this.setState({ checkedArray });
        this.originalCheckedArray = checkedArray.concat([]);
    }

    onBack() {
        if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigation.pop();
        } else {
            Alert.alert(
                '提示',
                '是否要保存修改呢?',
                [
                    {
                        text: '否',
                        onPress: () => {
                            this.props.navigation.pop();
                        },
                    }, {
                        text: '是',
                        onPress: () => {
                            this.onSave(true);
                        },
                    },
                ],
            );
        }
    }

    onSave(isChecked) {
        if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigation.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigation.pop();
    }

    getSortResult() {
        this.sortResultArray = this.dataArray.concat([]);
        this.originalCheckedArray.forEach((item, i) => {
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        });
    }

    render() {
        // [数组下标]
        const rightButton = (
            <TouchableOpacity onPress={() => this.onSave()}>
                <View style={{ margin: 10 }}>
                    <Text style={styles.title}>
                    保存
                    </Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="我的"
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    style={{ backgroundColor: '#6495ED' }}
                    rightButton={rightButton}
                />
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row} {...this.props} />}
                />
            </View>

        );
    }
}

class SortCell extends PureComponent {
    render() {
        return (
            <TouchableHighlight
                underlayColor="#eee"
                style={styles.items}
                {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image style={styles.image} source={require('./img/ic_sort.png')} />
                    <Text>
                        {this.props.data.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    items: {
        padding: 25,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        tintColor: '#2196F3',
        height: 16,
        width: 16,
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
});
