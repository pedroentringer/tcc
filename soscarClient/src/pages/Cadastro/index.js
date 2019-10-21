import React, { useState } from "react";
import { Image, Alert } from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";

import facebook from "../../services/facebook";
import getRealm from "../../services/realm";

import { Container, Scroll, Content, Title, Descricao, FacebookButton, Card, CardTitle, Input, ButtonNextContent, Button, ButtonText, ViewPicker, Picker } from "./styles";

import IconNext from "../../assets/img/icon-nex-arrow.png";

import Loading from "../../components/Loading";

export default function Cadastro(props) {
    const { navigation } = props;

    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [genero, setGenero] = useState("male");
    const [isLoading, setIsLoading] = useState(false);

    function showAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Entendi"
                }
            ],
            { cancelable: false }
        );
    }

    function dateFormat(_date) {
        const date = _date.split("/");
        return `${date[1]}/${date[0]}/${date[2]}`;
    }

    async function handleLoginFacebook() {
        setIsLoading(true);
        try {
            const loginResult = await LoginManager.logInWithPermissions(["email", "user_gender", "user_birthday", ]);

            if (loginResult.isCancelled == false) {
                const accessTokenResult = await AccessToken.getCurrentAccessToken();
                const token = accessTokenResult.accessToken.toString();

                const fieldsApi = ["id", "name", "email", "gender", "birthday", "picture"].join("%2C");
                const url = `me?fields=${fieldsApi}&access_token=${token}`;

                const facebookResult = await facebook.get(url);

                setNome(facebookResult.data.name);
                setDataNascimento(dateFormat(facebookResult.data.birthday));

                switch (facebookResult.data.gender) {
                    case "male":
                        setGenero("male");
                        break;
                    case "female":
                        setGenero("male");
                        break;
                    default:
                        setGenero("other");
                        break;
                }

                setIsLoading(false);
            }
        } catch (e) {
            setIsLoading(false);
            showAlert("Erro", e);
        }
    }

    async function handleNext() {
        const realm = await getRealm();

        const user = {
            id: 1,
            logged: false,
            name: nome,
            birthday: dataNascimento,
            genre: genero,
            cpf: "",
            tel: "",
            email: "",
            board: ""
        };

        realm.write(async () => {
            await realm.create("NewUser", user, "modified");
        });

        navigation.navigate("CadastroDetalhe");
    }

    return (
        <>
            {isLoading && <Loading />}
            <Container>
                <Scroll>
                    <Content>
                        <Title>Nova Conta</Title>
                        <Descricao>Crie sua conta agora mesmo para pedir aquele S.O.S</Descricao>
                        <FacebookButton onPress={handleLoginFacebook}>
                            <ButtonText>Entrar com Facebook</ButtonText>
                        </FacebookButton>
                        <Card>
                            <CardTitle>Nome e Sobrenome</CardTitle>
                            <Input value={nome} onChangeText={setNome} placeholder="John Doe" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="next" />

                            <CardTitle>Data de Nascimento</CardTitle>
                            <Input value={dataNascimento} onChangeText={setDataNascimento} placeholder="05/10/1997" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="next" keyboardType="number-pad" />

                            <CardTitle>Gênero</CardTitle>
                            <ViewPicker>
                                <Picker selectedValue={genero} onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}>
                                    <Picker.Item label="Masculino" value="male" />
                                    <Picker.Item label="Feminino" value="female" />
                                    <Picker.Item label="Indefinido" value="other" />
                                </Picker>
                            </ViewPicker>
                        </Card>

                        <ButtonNextContent>
                            <Button onPress={handleNext}>
                                <ButtonText>
                                    Próximo <Image source={IconNext} />
                                </ButtonText>
                            </Button>
                        </ButtonNextContent>
                    </Content>
                </Scroll>
            </Container>
        </>
    );
}
