import React from 'react';
import { TabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PopularPage from './PopularPage';
import MyPage from './my/MyPage';

const Page = () => (
    <View>
        <Text>
        其他
        </Text>
    </View>
);

export default TabNavigator(
    {
        最热: PopularPage,
        趋势: Page,
        收藏: Page,
        我的: MyPage,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                case '最热':
                    iconName = `ios-flame${focused ? '' : '-outline'}`;
                    break;
                case '趋势':
                    iconName = `ios-podium${focused ? '' : '-outline'}`;
                    break;
                case '收藏':
                    iconName = `ios-heart${focused ? '' : '-outline'}`;
                    break;
                case '我的':
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                    break;
                }
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#2196F3',
            inactiveTintColor: 'gray',
        },
    },
);
