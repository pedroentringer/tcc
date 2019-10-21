
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SOS from "./pages/SOS";
import SOSView from "./pages/SOSView";
import SOSOrcamentos from "./pages/SOSOrcamentos";
import Orcamentos from "./pages/Orcamentos";
import Cadastro from "./pages/Cadastro";

const tab = createMaterialTopTabNavigator({
    Profile:{
        screen: Profile,
        navigationOptions: () => ({
            title: 'Perfil'
        })
    },
    SOS:{
        screen: SOS,
        navigationOptions: () => ({
            title: 'SOS'
        })
    },
    Orcamentos:{
        screen: Orcamentos,
        navigationOptions: () => ({
            title: 'Orçamentos'
        })
    },
}, {
    initialRouteName: 'SOS',
    tabBarOptions: {
        activeTintColor: '#333',
        inactiveTintColor: '#333',
        pressColor: '#333',
        indicatorStyle:{
            backgroundColor: '#333',
        },
        style: {
          backgroundColor: '#fff',
          color: '#333'
        },
      }
});

export default createAppContainer(
    createStackNavigator(
        {
            Login: {
                screen: Login,
                navigationOptions: () => ({
                    header: null
                })
            },
            tab:{
                screen: tab,
                navigationOptions : () => ( {
                    title: 'SOSCAR - Mecânico',
                    headerStyle: {
                      elevation: 0,
                    },
                })
            },
            SOSView:{
                screen: SOSView,
                navigationOptions : () => ( {
                    title: 'Visualizar SOS',
                })
            },
            SOSOrcamentos:{
                screen: SOSOrcamentos,
                navigationOptions : () => ( {
                    title: 'Enviar Orçamento',
                })
            },
            Cadastro:{
                screen: Cadastro,
                navigationOptions : () => ( {
                    title: 'Criar Conta',
                })
            },
        },
        {
            initialRouteName: "Login",
            
        }
    )
);
