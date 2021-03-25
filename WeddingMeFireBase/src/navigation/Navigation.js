// import { HomeScreen, LoginScreen, RegistrationScreen, LoadingScreen } from "../screens";
// import AccountScreen from "../screens/AccountScreen/AccountScreen";
// import MenuScreen from "../screens/MenuScreen/MenuScreen";
// import {createStackNavigator, createAppContainer, createSwitchNavigator} from "react-navigation";

// /**
//  * Our LoginStack which contains only the Login screen
//  */
// const LoginStack = createStackNavigator({
// 	LoginScreen : {
// 		screen: LoginScreen,
// 	},
//     RegistrationScreen : {
// 		screen: RegistrationScreen,
// 	},
// });

// /**
//  * Our main AppStack with every app screens, accessible once user is logged in
//  */
// const AppStack = createStackNavigator({
// 	HomeScreen: {
// 		screen: HomeScreen,
// 	},
// 	MenuScreen: {
// 		screen: MenuScreen,
// 	},
// 	AccountScreen: {
// 		screen: AccountScreen,
// 	},
// });

// export default AppContainer = createAppContainer(
//     createSwitchNavigator(
//         {
//             Loading: LoadingScreen,
//             Login : LoginStack,
//             App : AppStack,
//         },
//         {
//             initialRouteName : "Loading",
//         }
//     )
// )