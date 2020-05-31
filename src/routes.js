import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScanCode from "./pages/ScanCode";
import HomeHealth from "./pages/HomeHealth";
import Welcome from "./pages/Welcome";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          headerShown: false,
        },
      },
      HomeHealth: {
        screen: HomeHealth,
        navigationOptions: {
          headerShown: false,
        },
      },
      ScanCode: {
        screen: ScanCode,
        navigationOptions: {
          headerShown: false,
        },
      },

      Login: {
        screen: Login,
        navigationOptions: {
          headerShown: false,
        },
      },
      Welcome: {
        screen: Welcome,
        navigationOptions: {
          headerShown: false,
        },
      },
      Register: {
        screen: Register,
        navigationOptions: {
          headerShown: false,
        },
      },

      Login: {
        screen: Login,
        navigationOptions: {
          headerShown: false,
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "#FFF",
        headerStyle: {
          backgroundColor: "#0B4F6C",
        },
      },
    }
  )
);

export default Routes;
