import React, { useState, useEffect } from "react";
import { Image, View, Alert, Keyboard } from "react-native";

import api from "../../services/api";
import getRealm from "../../services/realm";

import { Container, Card, CardTitle, CardDesc, Phone, Password, Button, ButtonText, Cadastrar, CadastrarText } from "./styles";

import Location from "../../assets/img/Location.png";
import Logo from "../../assets/img/Logo.png";

import Loading from "../../components/Loading";

export default function Login(props) {
    const { navigation } = props;
    const [tel, setTel] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function isLogado() {
            const realm = await getRealm();
            const user = await realm.objectForPrimaryKey("User", 1);

            if (user) {
                navigation.navigate("Main");
            }
        }

        isLogado();
    }, []);

    async function handleRegister() {
        navigation.navigate("Cadastro");
    }

    async function handleLogin() {
        Keyboard.dismiss();
        setIsLoading(true);

        try {
            const response = await api.post("/login", { tel, password });
            const { user, vehicles, token } = response.data;

            user.id = 1;
            user.evaluationNumber = parseFloat(user.evaluation.number.$numberDecimal);
            const tokenInsert = { id: 1, token: token };

            const realm = await getRealm();

            realm.write(() => {
                realm.create("User", user, "modified");
                realm.create("Token", tokenInsert, "modified");
                for(let i=0; i< vehicles.length; i++){
                    let vehicle = vehicles[i];
                    vehicle.id = i+1;
                    realm.create("Vehicle", vehicles[i], "modified");
                }
            });

            setIsLoading(false);
            navigation.navigate("Main");
        } catch (e) {
            setIsLoading(false);

            if (e.response.data.message) {
                showAlert("Algo deu errado", e.response.data.message);
            } else {
                showAlert("Algo deu errado", "Falha ao procurar seu registro, tente novamente.");
            }
        }
    }

    function showAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Tentar Novamente"
                },
                { text: "Criar Conta", onPress: handleRegister }
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            {isLoading && <Loading />}
            <Container>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image source={Location} />
                    <Image source={Logo} style={{ justifyContent: "flex-start" }} />
                </View>

                <Card>
                    <CardTitle>Login</CardTitle>
                    <CardDesc>Acesse sua conta para pedir aquele SOS</CardDesc>

                    <Phone keyboardType="phone-pad" value={tel} onChangeText={setTel} placeholder="(27) 9 9999-9999" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="next" />
                    <Password keyboardType="default" secureTextEntry={true} value={password} onChangeText={setPassword} placeholder="Senha" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="join" />

                    <Button
                        onPress={() => {
                            handleLogin();
                        }}
                    >
                        <ButtonText>Entrar</ButtonText>
                    </Button>
                    <Cadastrar
                        onPress={() => {
                            handleRegister();
                        }}
                    >
                        <CadastrarText>Criar Minha Conta</CadastrarText>
                    </Cadastrar>
                </Card>
            </Container>
        </>
    );
}
