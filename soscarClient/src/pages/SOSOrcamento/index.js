import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import { Container, OficinaProfileContent, Oficina, OficinaAvatar, OficinaContent, OficinaDescricao, OficinaNome, OficinaStar, OficinaStarText, Conteudo, Titulo, Descricao, Secao, Botoes, Botao, BotaoText } from "./styles";

import api from "../../services/api";
import getRealm from "../../services/realm";
import Loading from "../../components/Loading";
import MechanicalProfile from "../../components/MechanicalProfile";

import StarImage from "../../assets/img/star-fill.png";

export default function SOSOrcamento(props) {
    const { navigation } = props;
    const orcamentoId = navigation.getParam("orcamento");
    const sosID = navigation.getParam("sos");

    const [orcamento, setOrcamento] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [oficinaSelecionada, setOficinaSelecionada] = useState(null);

    useEffect(() => {
        async function getOrcamento() {
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

    async function handleOficina() {
        setOficinaSelecionada(orcamento.mechanical);
    }

    async function handleUpdateOrcamento(status) {
        setIsLoading(true);
        let newOrcamento = orcamento;
        newOrcamento.status = status;
        try {
            const realm = await getRealm();
            const user = await realm.objectForPrimaryKey("User", 1);
            const token = await realm.objectForPrimaryKey("Token", 1);

            const response = await api.put(`/users/${user._id}/sos/${sosID}/budgets/${orcamentoId}`, newOrcamento, { headers: { token: token.token } });
            setIsLoading(false);

            if (status == "A") {
                showAlert("Tudo certo", "Orçamento Aprovado com sucesso.");
            } else {
                showAlert("Tudo certo", "Orçamento Recusado com sucesso.");
            }
            setOrcamento(newOrcamento);
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

            {orcamento != null && (
                <>
                    <Container>
                        <Oficina>
                            <OficinaAvatar
                                source={{
                                    uri: orcamento.mechanical.picture
                                }}
                            />
                            <OficinaContent>
                                <OficinaNome>{orcamento.mechanical.name}</OficinaNome>
                                <OficinaDescricao>{orcamento.mechanical.description}</OficinaDescricao>
                                <Oficina>
                                    <OficinaStar source={StarImage} />
                                    <OficinaStarText>{orcamento.mechanical.evaluation.number.$numberDecimal}</OficinaStarText>
                                </Oficina>
                            </OficinaContent>
                        </Oficina>
                        <Botoes>
                            <Botao style={{ backgroundColor: "#5C7196" }} onPress={handleOficina}>
                                <BotaoText>Ver Perfil Completo</BotaoText>
                            </Botao>
                        </Botoes>

                        <Conteudo>
                            <Secao>
                                <Titulo>Detalhes do Serviço:</Titulo>
                                <Descricao>{orcamento.description}</Descricao>
                            </Secao>
                            <Secao>
                                <Titulo>Tempo de duração:</Titulo>
                                <Descricao>{orcamento.duration.$numberDecimal} horas</Descricao>
                            </Secao>
                            <Secao>
                                <Titulo>Preço:</Titulo>
                                <Descricao>R${orcamento.price.$numberDecimal}</Descricao>
                            </Secao>
                        </Conteudo>

                        {orcamento.status == "P" ? (
                            <Botoes>
                                <Botao
                                    style={{ backgroundColor: "#F5365C" }}
                                    onPress={() => {
                                        handleUpdateOrcamento("R");
                                    }}
                                >
                                    <BotaoText>Recusar</BotaoText>
                                </Botao>
                                <Botao
                                    style={{ backgroundColor: "#2DCE89" }}
                                    onPress={() => {
                                        handleUpdateOrcamento("A");
                                    }}
                                >
                                    <BotaoText>Aprovar</BotaoText>
                                </Botao>
                            </Botoes>
                        ) : (
                            <Botoes>
                                <Botao style={{ backgroundColor: orcamento.statusApp.backgroundColor }}>
                                    <BotaoText>{orcamento.statusApp.text}</BotaoText>
                                </Botao>
                            </Botoes>
                        )}
                    </Container>
                    {oficinaSelecionada != null && (
                        <OficinaProfileContent>
                            <MechanicalProfile
                                oficina={oficinaSelecionada}
                                onClose={() => {
                                    setOficinaSelecionada(null);
                                }}
                            />
                        </OficinaProfileContent>
                    )}
                </>
            )}
        </>
    );
}
