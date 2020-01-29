import {View} from 'react-native';
import React, {Component} from 'react';
import {createDrawerNavigator, createStackNavigator, createBottomTabNavigator} from "react-navigation";
import AmlakList from "./component/main/AmlakList";
import Splash from "./component/main/Splash";
import DrawerStyle from "./component/main/DrawerStyle";
import EnterMobile from "./component/auth/EnterMobile";
import CheckCode from "./component/auth/CheckCode";
import SignUp from "./component/auth/SignUp";
import Profile from "./component/main/Profile";
import DetailsFile from "./component/main/DetailsFile";
import ChatScreen from "./component/main/ChatScreen";
import TourList from "./component/main/TourList";
import DetailsTour from "./component/main/DetailsTour";
import Favorite from "./component/main/Favorite";
import AddTour from "./component/main/AddTour";
import AddFile from "./component/main/AddFile";
import AddRoom from "./component/main/AddRoom";
import Categories from "./component/main/Categories";
import AdsList from "./component/main/AdsList";
import DetailsAD from "./component/main/DetailsAD";
import AddAd from "./component/main/AddAd";
import RoomList from "./component/main/RoomList";
import DetailsRoom from "./component/main/DetailsRoom";
import EditFile from "./component/main/EditFile";
import EditTour from "./component/main/EditTour";
import EditAD from "./component/main/EditAD";
import EditRoom from "./component/main/EditRoom";
import ProvinceList from "./component/main/ProvinceList";
import Reserve from "./component/main/Reserve";
import ReserveList from "./component/main/ReserveList";
import RoomReserve from "./component/main/RoomReserve";
import Rules from "./component/main/Rules";
import AddContract from "./component/main/AddContract";
import AdvancedSearch from "./component/main/AdvancedSearch";
import ContractRules from "./component/main/ContractRules";
import RentContract from "./component/main/RentContract";
import Add from "./component/main/Add";
import ContactUs from "./component/main/ContactUs";
import AboutUS from "./component/main/AboutUS";
import ShowContract from "./component/main/ShowContract";
import DigSign from "./component/main/DigSign";
import ContractsReqs from "./component/main/ContractsReqs";
import MyTransaction from "./component/main/MyTransaction";
import ContractList from "./component/main/ContractList";
import Notification from "./component/main/Notification";


//---------First Navigator------------------------------------------------------------------------------------
const StackNavigator = createStackNavigator({
    Splash: {screen: Splash, navigationOptions: {header: null}},
    Categories: {screen: Categories, navigationOptions: {header: null}},
    AdvancedSearch: {screen: AdvancedSearch, navigationOptions: {header: null}},
    //-lists--------------------------------------------------------------------------------------------------
    AmlakList: {screen: AmlakList, navigationOptions: {header: null}}, // same as MAIN page
    TourList: {screen: TourList, navigationOptions: {header: null}},
    ReserveList: {screen: ReserveList, navigationOptions: {header: null}},
    AdsList: {screen: AdsList, navigationOptions: {header: null}},
    RoomList: {screen: RoomList, navigationOptions: {header: null}},
    RoomReserve: {screen: RoomReserve, navigationOptions: {header: null}},
    Favorite: {screen: Favorite, navigationOptions: {header: null}},
    MyTransaction: {screen: MyTransaction, navigationOptions: {header: null}},
    //Contracts--------------------------------------------------------------------------------------------------
    ContractList: {screen: ContractList, navigationOptions: {header: null}},
    ContractsReqs: {screen: ContractsReqs, navigationOptions: {header: null}},
    ContractRules: {screen: ContractRules, navigationOptions: {header: null}},
    ShowContract: {screen: ShowContract, navigationOptions: {header: null}},
    //Details--------------------------------------------------------------------------------------------------
    DetailsFile: {screen: DetailsFile, navigationOptions: {header: null}},
    DetailsTour: {screen: DetailsTour, navigationOptions: {header: null}},
    DetailsAD: {screen: DetailsAD, navigationOptions: {header: null}},
    DetailsRoom: {screen: DetailsRoom, navigationOptions: {header: null}},
    //Edit--------------------------------------------------------------------------------------------------
    EditFile: {screen: EditFile, navigationOptions: {header: null}},
    EditTour: {screen: EditTour, navigationOptions: {header: null}},
    EditAD: {screen: EditAD, navigationOptions: {header: null}},
    EditRoom: {screen: EditRoom, navigationOptions: {header: null}},
    //Adding--------------------------------------------------------------------------------------------------
    Add: {screen: Add, navigationOptions: {header: null}},
    AddFile: {screen: AddFile, navigationOptions: {header: null}},
    AddTour: {screen: AddTour, navigationOptions: {header: null}},
    AddRoom: {screen: AddRoom, navigationOptions: {header: null}},
    AddAd: {screen: AddAd, navigationOptions: {header: null}},
    AddContract: {screen: AddContract, navigationOptions: {header: null}},
    RentContract: {screen: RentContract, navigationOptions: {header: null}},
    //Others--------------------------------------------------------------------------------------------------
    DigSign: {screen: DigSign, navigationOptions: {header: null}},
    ContactUs: {screen: ContactUs, navigationOptions: {header: null}},
    AboutUS: {screen: AboutUS, navigationOptions: {header: null}},
    ChatScreen: {screen: ChatScreen, navigationOptions: {header: null}},
    ProvinceList: {screen: ProvinceList, navigationOptions: {header: null}},
    Notification: {screen: Notification, navigationOptions: {header: null}},
    Reserve: {screen: Reserve, navigationOptions: {header: null}},
    //Login Signup--------------------------------------------------------------------------------------------------
    EnterMobile: {screen: EnterMobile, navigationOptions: {header: null}},
    CheckCode: {screen: CheckCode, navigationOptions: {header: null}},
    SignUp: {screen: SignUp, navigationOptions: {header: null}},
    Rules: {screen: Rules, navigationOptions: {header: null}},
    Profile: {screen: Profile, navigationOptions: {header: null}},
}, {
    initialRouteName: 'AmlakList',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0,
        },
    }),
});
//---------Drawer Navigator------------------------------------------------------------------------------------
const DrawerNavigator = createDrawerNavigator({
    StackNavigator: {screen: StackNavigator, navigationOptions: {header: null}},

}, {
    drawerWidth: 270,
    drawerPosition: 'right',
    contentComponent: ({navigation}) => (<DrawerStyle navigation={navigation}/>),
});

export default class App extends Component<props> {
    render() {
        return (
            <DrawerNavigator/>
        );
    }
}




