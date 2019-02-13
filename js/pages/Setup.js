import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import CustomKeyPage from './my/CustomKeyPage';
import SortKeyPage from './my/SortKeyPage';

const MainStack = createStackNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: () => ({
                header: null,
            }),
        },
        Welcome: {
            screen: WelcomePage,
            navigationOptions: () => ({
                header: null,
            }),
        },
        Custom: {
            screen: CustomKeyPage,
            navigationOptions: () => ({
                header: null,
            }),
        },
        Sort: {
            screen: SortKeyPage,
            navigationOptions: () => ({
                header: null,
            }),
        },
    },
    {
        initialRouteName: 'Welcome',
    },
);

export default MainStack;
