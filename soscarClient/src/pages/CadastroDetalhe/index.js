import React, { useState } from "react";
import { Image, Alert } from "react-native";
import { Container, Scroll, Content, Title, Descricao, DescricaoAviso, Card, CardTitle, Input, ButtonNextContent, Button, ButtonText } from "./styles";

import IconNext from "../../assets/img/icon-nex-arrow.png";

import api from "../../services/api";
import getRealm from "../../services/realm";
import Loading from "../../components/Loading";

export default function CadastroDetalhe(props) {
    const { navigation } = props;

    const [isLoading, setIsLoading] = useState(null);

    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");

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

    async function deleteNewUser(user, _token) {
        const realm = await getRealm();
        const userInfo = await realm.objectForPrimaryKey("NewUser", 1);

        user.id = 1;
        user.evaluationNumber = parseFloat(user.evaluation.number.$numberDecimal);
        const token = { id: 1, token: _token };
        realm.write(() => {
            realm.delete(userInfo);
            realm.create("User", user, "modified");
            realm.create("Token", token, "modified");
        });
    }

    async function handleNext() {
        setIsLoading(true);

        try {
            const realm = await getRealm();

            const userInfo = await realm.objectForPrimaryKey("NewUser", 1);
            const sendUser = {
                name: userInfo.name,
                tel: celular,
                password: password,
                email: email,
                birthDate: userInfo.birthday,
                genre: userInfo.genre,
                picture: "",
                cpf: cpf,
                evaluation: {
                    quantity: 0,
                    number: 5.0
                }
            };

            const response = await api.post("/users", sendUser);
            const { user, token } = response.data;

            deleteNewUser(user, token);

            setIsLoading(false);
            navigation.navigate("CadastroVeiculo");
        } catch (e) {
            setIsLoading(false);
            console.tron.log(e);
            //const message = e.response.data.message || "Erro ao validar informações, confira os dados informados e tente novamente.";
            showAlert("Algo deu errado", "Erro ao validar informações, confira os dados informados e tente novamente.");
        }
    }

    return (
        <>
            {isLoading && <Loading />}
            <Container>
                <Scroll>
                    <Content>
                        <Title>Conte-me mais...</Title>
                        <Descricao>Só mais alguns detalhes e estaremos prontos.</Descricao>
                        <DescricaoAviso>Usaremos essas informações para obter os dados do seu veículo, isso irá ajudar os mecânicos a produzirem orçamentos super compatíveis. </DescricaoAviso>

                        <Card>
                            <CardTitle>E-Mail</CardTitle>
                            <Input value={email} onChangeText={setEmail} placeholder="nome@exemplo.com.br" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="next" keyboardType="email-address" />

                            <CardTitle>Celular</CardTitle>
                            <Input value={celular} onChangeText={setCelular} placeholder="(27) 9 9999-9999" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="next" keyboardType="number-pad" />

                            <CardTitle>CPF</CardTitle>
                            <Input value={cpf} onChangeText={setCpf} placeholder="CPF" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="next" keyboardType="number-pad" />

                            <CardTitle>Senha</CardTitle>
                            <Input
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Senha de acesso"
                                placeholderTextColor="#BDBDBD"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="join"
                                keyboardType="default"
                                secureTextEntry={true}
                            />
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
