import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SOS from "./pages/SOS";
import SOSView from "./pages/SOSView";
import SOSOrcamentos from "./pages/SOSOrcamentos";
import Orcamentos from "./pages/Orcamentos";

const tab = createMaterialTopTabNavigator({
    Profile,
    SOS,
    Orcamentos,
}, {initialRouteName: 'SOS'});

export default createAppContainer(
    createStackNavigator(
        {
            Login: {
                screen: Login,
                navigationOptions: () => ({
                    header: null
                })
            },
            tab,
            SOSView,
            SOSOrcamentos
        },
        {
            initialRouteName: "Login"
        }
    )
);
