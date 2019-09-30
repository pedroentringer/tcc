import React from "react";
import { Image, Easing, Animated } from "react-native";
import { createAppContainer } from "react-navigation";

import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { createStackNavigator } from "react-navigation-stack";
import { Transition } from "react-native-reanimated";

import backIcon from "./assets/img/icon-arrow.png";
import logoMini from "./assets/img/LogoMini.png";

import Login from "./pages/Login/";
import Menu from "./pages/Menu/";

import Cadastro from "./pages/Cadastro/";
import CadastroDetalhe from "./pages/CadastroDetalhe/";
import CadastroVeiculo from "./pages/CadastroVeiculo/";

import NovoSOS from "./pages/NovoSOS/";
import ListaSOS from "./pages/ListaSOS/";
import SOS from "./pages/SOS/";
import SOSOrcamento from "./pages/SOSOrcamento/";
import Perfil from "./pages/Perfil";

const defaultNavigationOptions = {
    headerBackImage: <Image source={backIcon} style={{ margin: 10 }} />,
    headerTitle: <Image source={logoMini} />,
    gesturesEnabled: true,
    headerPressColorAndroid: "#E53935",
    headerStyle: {
        elevation: 0
    }
};

const transitionConfig = () => ({
    transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
    },
    screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [width, 0, 0]
        });

        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 0.8, 1]
        });

        return { opacity, transform: [{ translateX }] };
    }
});

const cadastroInicial = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                header: null
            })
        },
        Cadastro,
        CadastroDetalhe,
        CadastroVeiculo
    },
    {
        initialRouteName: "Login",
        defaultNavigationOptions: defaultNavigationOptions,
        transitionConfig: transitionConfig
    }
);

const Main = createStackNavigator(
    {
        Main: {
            screen: Menu,
            navigationOptions: () => ({
                header: null
            })
        },
        NovoSOS,
        ListaSOS,
        SOS,
        SOSOrcamento,
        Perfil,
        CadastroVeiculo
    },
    {
        initialRouteName: "Main",
        defaultNavigationOptions: defaultNavigationOptions,
        transitionConfig: transitionConfig
    }
);

export default createAppContainer(
    createAnimatedSwitchNavigator(
        {
            cadastroInicial,
            Main
        },
        {
            transition: (
                <Transition.Together>
                    <Transition.Out type="slide-right" durationMs={2000} />
                    <Transition.In type="slide-right" durationMs={1800} />
                </Transition.Together>
            )
        }
    )
);
