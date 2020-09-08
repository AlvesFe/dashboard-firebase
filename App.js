import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './src/pages/Main';
import Dashboard from './src/pages/Dashboard';

const AppNavigator = createStackNavigator({
  Main,
  'Dashboard': {
    screen: Dashboard,
    navigationOptions: () => {
      return (
        {
          title: 'Dashboard',
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
            flexGrow: 1,
            textAlign: 'center'
          }
        }
      )
    }
  }
}, {
  defaultNavigationOptions: {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 10,
      borderBottomColor: '#c5c5c5'
    },
    headerTitleStyle: {
      color: '#fff',
      fontSize: 30,
      flexGrow: 1,
      textAlign: 'center'
    }
  }
})

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer