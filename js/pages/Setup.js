import { createStackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import PopularPage from './PopularPage';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Welcome: WelcomePage,
    Popular: PopularPage,
  },
);

export default SwitchNavigator(
  {
    Main: MainStack,
    Welcome: WelcomePage,
  },
  {
    initialRouteName: 'Welcome',
  },
);
