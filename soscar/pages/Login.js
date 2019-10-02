import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


export default function Login(props) {
    const { navigation } = props;


    return (
        <View>
            <Text>Login</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('tab')}>
                <Text>TAB</Text>
            </TouchableOpacity>
        </View>
    );
}
