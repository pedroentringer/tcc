import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import {
    Container,
    ContainerStatus,
    ContainerStatusContent,
    Header,
    Status,
    StatusText,
    CancelarSOS,
    BtnCancelarSOS,
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
    Mensagem
} from "./styles";

import api from "../../services/api";
import getRealm from "../../services/realm";
import Loading from "../../components/Loading";
import MechanicalProfile from "../../components/MechanicalProfile";

export default function SOSOrcamento(props) {
    const { navigation } = props;
    const orcamentoId = navigation.getParam("orcamento");
    const sosID = navigation.getParam("sos");

    const [orcamento, setOrcamento] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [oficinaSelecionada, setOficinaSelecionada] = useState(null);

    useEffect(() => {
        async function getOrcamento() {
            setIsLoading(true);
            try {
                const realm = await getRealm();
                const user = await realm.objectForPrimaryKey("User", 1);
                const token = await realm.objectForPrimaryKey("Token", 1);

                const response = await api.get(`/users/${user._id}/sos/${sosID}/budgets/${orcamentoId}`, { headers: { token: token.token } });
                response.data.budget.statusApp = getStatus(response.data.budget.status);
                setOrcamento(response.data.budget);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                const message = e.response.data.message || "Falha ao buscar orçamentos, tente novamente.";
                showAlert("Algo deu errado", message);
                navigation.goBack();
            }
        }

        getOrcamento();
    }, []);

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

    async function handleUpdateOrcamento(status, isAprovado) {
        setIsLoading(true);
        let newOrcamento = orcamento;
        newOrcamento.status = status;
        try {
            const realm = await getRealm();
            const user = await realm.objectForPrimaryKey("User", 1);
            const token = await realm.objectForPrimaryKey("Token", 1);

            const response = await api.put(`/users/${user._id}/sos/${sos._id}/budgets/${orcamentoId}`, newOrcamento, { headers: { token: token.token } });
            setIsLoading(false);

            if (isAprovado == true) {
                navigation.navigate("Main"); //tela de orçamento aprovado
            } else {
                showAlert("Tudo certo", "Orçamento Cancelado com sucesso.");
            }
        } catch (e) {
            setIsLoading(false);
            const message = e.response.data.message || "Falha ao atualizar status do orçamento, tente novamente.";
            showAlert("Algo deu errado", message);
        }
    }

    function getStatus(OrcamentoStatus) {
        let status = { text: null, backgroundColor: null };
        switch (OrcamentoStatus) {
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
        return status;
    }

    return (
        <>
            {isLoading && <Loading />}
            {oficinaSelecionada != null && (
                <MechanicalProfile
                    oficina={oficinaSelecionada}
                    onClose={() => {
                        setOficinaSelecionada(null);
                    }}
                />
            )}
            <Container>
                <Scroll>
                    <Content>
                        <Title>Orçamento</Title>
                    </Content>
                </Scroll>
            </Container>
        </>
    );
}
