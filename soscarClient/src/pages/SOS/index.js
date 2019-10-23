import React, { useState, useEffect } from "react";
import { Alert, TouchableWithoutFeedback } from "react-native";

import {
    Container,
    ContainerStatus,
    ContainerStatusContent,
    Header,
    Status,
    StatusText,
    Scroll,
    Content,
    Title,
    Card,
    CarImage,
    CardImage,
    CardBoard,
    CardDetails,
    CardContent,
    CardTitle,
    CardDescription,
    CardStatus,
    CardStatusText,
    Mensagem,
    Button,
    ButtonText
} from "./styles";

import api from "../../services/api";
import getRealm from "../../services/realm";
import Loading from "../../components/Loading";

export default function SOS(props) {
    const { navigation } = props;
    const sos = navigation.getParam("sos");
    const sosStatus = navigation.getParam("status");

    const [orcamentos, setOrcamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getOrcamentos(true);
    }, []);

    async function getOrcamentos(loading) {
        setIsLoading(loading);
        try {
            const realm = await getRealm();
            const user = await realm.objectForPrimaryKey("User", 1);
            const token = await realm.objectForPrimaryKey("Token", 1);

            const response = await api.get(`/users/${user._id}/sos/${sos._id}/budgets`, { headers: { token: token.token } });
            setOrcamentos(response.data.budgets);
            setIsLoading(false);

            setTimeout(function(){
                getOrcamentos(false);
            }, 2000);
        } catch (e) {
            setIsLoading(false);
            const message = e.response.data.message || "Falha ao buscar orçamentos, tente novamente.";
            showAlert("Algo deu errado", message);
        }
    }

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

    async function handleCancel() {
        setIsLoading(true);
        sos.status = "C";
        try {
            const realm = await getRealm();
            const user = await realm.objectForPrimaryKey("User", 1);
            const token = await realm.objectForPrimaryKey("Token", 1);

            const response = await api.put(`/users/${user._id}/sos/${sos._id}`, sos, { headers: { token: token.token } });
            setIsLoading(false);
            showAlert("SOS Cancelado", "Tudo certo, seu SOS foi cancelado.");
            navigation.navigate("Main");
        } catch (e) {
            setIsLoading(false);
            const message = e.response.data.message || "Falha ao cancelar SOS, tente novamente.";
            showAlert("Algo deu errado", message);
        }
    }

    renderOrcamentos = () => {
        return orcamentos.map((item, index) => {
            let status = {
                backgroundColor: "#172b4d",
                text: "Orçamento Pendente"
            };

            switch (item.status) {
                case "A":
                    status.backgroundColor = "#2DCE89";
                    status.text = "Orçamento Aprovado";
                    break;
                case "F":
                    status.backgroundColor = "#2DCE89";
                    status.text = "Orçamento Finalizado";
                    break;
                case "C":
                    status.backgroundColor = "#F5365C";
                    status.text = "Orçamento Cancelado";
                    break;
                case "R":
                    status.backgroundColor = "#F5365C";
                    status.text = "Orçamento Recusado";
                    break;
            }
            return (
                <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                        navigation.navigate("SOSOrcamento", { sos: sos._id, orcamento: item._id });
                    }}
                >
                    <Card>
                        <CardContent>
                            <CardDescription>{item.mechanical.name}</CardDescription>
                            <CardTitle>R${item.price.$numberDecimal}</CardTitle>
                            <CardDescription>Duração: {item.duration.$numberDecimal} horas.</CardDescription>
                        </CardContent>
                        <CardStatus style={{ backgroundColor: status.backgroundColor }}>
                            <CardStatusText>{status.text}</CardStatusText>
                        </CardStatus>
                    </Card>
                </TouchableWithoutFeedback>
            );
        });
    };

    return (
        <>
            {isLoading && <Loading />}
            <Container>
                <ContainerStatus>
                    <Header>
                        <Status style={{ backgroundColor: sosStatus.backgroundColor }}>
                            <StatusText>{sosStatus.text}</StatusText>
                        </Status>
                    </Header>

                    <ContainerStatusContent>
                        <CarImage>
                            <CardImage
                                source={{
                                    uri: sos.vehicle.picture
                                }}
                            ></CardImage>
                            <CardBoard>{sos.vehicle.board}</CardBoard>
                        </CarImage>
                        <CardDetails>
                            <CardTitle>{sos.title}</CardTitle>
                            <CardDescription>{sos.description}</CardDescription>
                        </CardDetails>
                    </ContainerStatusContent>
                </ContainerStatus>

                <Scroll>
                    <Content>
                        <Title>Orçamentos</Title>
                        {orcamentos.length > 0 ? this.renderOrcamentos() : <Mensagem>Nenhum orçamento recebido até o momento</Mensagem>}

                        {sos.status == "P" && (
                            <Button style={{ backgroundColor: "#e53935" }} onPress={handleCancel}>
                                <ButtonText>Cancelar SOS</ButtonText>
                            </Button>
                        )}
                    </Content>
                </Scroll>
            </Container>
        </>
    );
}
