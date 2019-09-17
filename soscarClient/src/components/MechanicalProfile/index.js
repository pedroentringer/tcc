import React, { useState, useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
    OficinaCard,
    OficinaImage,
    OficinaDetaisContent,
    OficinaNome,
    OficinaDescricao,
    OficinaDetalhes,
    OficinaDetalhesTitle,
    OficinaDetalhesServices,
    OficinaDetalhesServicesContent,
    OficinaDetalhesServicesTipo,
    OficinaDetalhesAvaliacoes,
    OficinaDetalhesAvaliacoesContent,
    CardAvaliacao,
    CardAvaliacaoImage,
    CardAvaliacaoTitle,
    CardAvaliacaoDescricao,
    Space,
    SpaceContent
} from "./styles";

import { Animated } from "react-native";
import { PanGestureHandler, State, TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

import api from "../../services/api";
import getRealm from "../../services/realm";

export default function Loading(props) {
    const { oficina, onClose } = props;
    oficina.services = ["#", "#", "#", "#", "#", "#"];
    oficina.evaluations = [{ user: { name: "Carregando" }, description: "Carregando avaliações." }];

    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const heightAnimation = height - 13;

    const [oficinaImage, setOficinaImage] = useState(40);
    const [services, setServices] = useState(oficina.services);
    const [evaluations, setEvaluation] = useState(oficina.evaluations);
    const [shimmer, setShimmer] = useState(false);

    let opened = false;
    let offset = 0;
    let translateY = new Animated.Value(0);
    const opacity = new Animated.Value(0);
    const animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: translateY
                }
            }
        ],
        {
            useNativeDriver: true
        }
    );

    renderServicos = () => {
        return services.map((service, index) => {
            return (
                <ShimmerPlaceHolder key={index} autoRun={true} visible={shimmer} style={{ width: 60, height: 20, borderRadius: 10, margin: 5 }}>
                    <OficinaDetalhesServicesTipo key={index}>{service}</OficinaDetalhesServicesTipo>
                </ShimmerPlaceHolder>
            );
        });
    };

    renderAvaliacoes = () => {
        return evaluations.map((evaluation, index) => {
            return (
                <ShimmerPlaceHolder key={index} autoRun={true} visible={shimmer} style={{ width: 300, height: 80, borderRadius: 10, margin: 10 }}>
                    <CardAvaliacao>
                        <CardAvaliacaoImage
                            source={{
                                uri: evaluation.user.picture
                            }}
                        />
                        <CardAvaliacaoTitle>{evaluation.user.name}</CardAvaliacaoTitle>
                        <CardAvaliacaoDescricao>{evaluation.description}</CardAvaliacaoDescricao>
                    </CardAvaliacao>
                </ShimmerPlaceHolder>
            );
        });
    };

    function handleClose() {
        if (opened == false) {
            onClose();
        }
    }

    async function getDadosProfile() {
        try {
            const realm = await getRealm();
            const token = await realm.objectForPrimaryKey("Token", 1);

            const response = await api.get("/mechanicals/" + oficina._id, { headers: { token: token.token } });
            const { evaluations, mechanical } = response.data;

            if (mechanical.services.length == 0) {
                setServices(["Nenhum serviço cadastrados"]);
            } else {
                setServices(mechanical.services);
            }

            if (evaluations.length == 0) {
                setEvaluation([{ user: { picture: oficina.picture, name: "Ops" }, description: "Nenhuma avaliação registrada ainda..." }]);
            } else {
                setEvaluation(evaluations);
            }

            setShimmer(true);
        } catch (e) {
            setServices(["Falha ao buscar dados da oficina, tente novamente."]);
            setEvaluation([{ user: { picture: oficina.picture, name: "Ops" }, description: "Nenhuma avaliação registrada ainda..." }]);
            setShimmer(true);
        }
    }

    useEffect(() => {
        if (shimmer == true) {
            translateY.setValue(0);
            translateY.setOffset(-heightAnimation);
            offset = -heightAnimation;
            opened = true;
        }
    }, [shimmer]);

    function onHandlerStateChange(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const { translationY } = event.nativeEvent;

            offset += translationY;

            if (translationY < -10) {
                opened = true;
            } else if (translationY > 100) {
                opened = false;
                translateY.setValue(offset);
                translateY.setOffset(0);
                offset = 0;
            } else {
                translateY.setValue(offset);
                translateY.setOffset(0);
                offset = 0;
            }

            Animated.timing(translateY, {
                toValue: opened ? -heightAnimation : 100,
                duration: 200,
                useNativeDriver: true
            }).start(() => {
                offset = opened ? -heightAnimation : 100;
                translateY.setOffset(offset);
                translateY.setValue(0);

                if (opened == false) {
                    onClose();
                } else {
                    if (shimmer == false) {
                        Animated.timing(opacity, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true
                        }).start();

                        getDadosProfile();
                    }
                }
            });
        }
    }

    return (
        <TouchableWithoutFeedback style={{ backgroundColor: "rgba(40, 40, 40, 0.3)" }} onPress={handleClose}>
            <PanGestureHandler onGestureEvent={animatedEvent} onHandlerStateChange={onHandlerStateChange}>
                <Animated.View
                    style={{
                        height: height,
                        top: height,
                        transform: [
                            {
                                translateY: translateY.interpolate({
                                    inputRange: [-heightAnimation, 0, 100],
                                    outputRange: [-heightAnimation, -100, 0],
                                    extrapolate: "clamp"
                                })
                            }
                        ]
                    }}
                >
                    <OficinaCard>
                        <Space>
                            <SpaceContent></SpaceContent>
                        </Space>
                        <OficinaImage
                            onLayout={event => {
                                const elementWidth = event.nativeEvent.layout.width / 2;
                                const result = width / 2 - elementWidth;
                                setOficinaImage(result - 10);
                            }}
                            source={{
                                uri: oficina.picture
                            }}
                            style={{
                                transform: [
                                    {
                                        translateY: translateY.interpolate({
                                            inputRange: [-heightAnimation, 0],
                                            outputRange: [40, 0],
                                            extrapolate: "clamp"
                                        })
                                    },
                                    {
                                        translateX: translateY.interpolate({
                                            inputRange: [-heightAnimation, 0],
                                            outputRange: [oficinaImage, 0],
                                            extrapolate: "clamp"
                                        })
                                    },
                                    {
                                        scale: translateY.interpolate({
                                            inputRange: [-heightAnimation, 0],
                                            outputRange: [1.5, 1],
                                            extrapolate: "clamp"
                                        })
                                    }
                                ]
                            }}
                        />

                        <OficinaDetaisContent
                            style={{
                                transform: [
                                    {
                                        translateY: translateY.interpolate({
                                            inputRange: [-heightAnimation, 0],
                                            outputRange: [140, 0],
                                            extrapolate: "clamp"
                                        })
                                    },
                                    {
                                        scale: translateY.interpolate({
                                            inputRange: [-heightAnimation, 0],
                                            outputRange: [1.4, 1],
                                            extrapolate: "clamp"
                                        })
                                    }
                                ]
                            }}
                        >
                            <OficinaNome>{oficina.name}</OficinaNome>
                            <OficinaDescricao>{oficina.description}</OficinaDescricao>
                        </OficinaDetaisContent>
                        <OficinaDetalhes
                            style={{
                                opacity: opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                    extrapolate: "clamp"
                                })
                            }}
                        >
                            <OficinaDetalhesServices>
                                <OficinaDetalhesTitle>Serviços</OficinaDetalhesTitle>
                                <OficinaDetalhesServicesContent>{this.renderServicos()}</OficinaDetalhesServicesContent>
                            </OficinaDetalhesServices>
                            <OficinaDetalhesAvaliacoes>
                                <OficinaDetalhesTitle>Avaliações</OficinaDetalhesTitle>
                                <ScrollView horizontal={true}>
                                    <OficinaDetalhesAvaliacoesContent horizontal={true}>{this.renderAvaliacoes()}</OficinaDetalhesAvaliacoesContent>
                                </ScrollView>
                            </OficinaDetalhesAvaliacoes>
                        </OficinaDetalhes>
                    </OficinaCard>
                </Animated.View>
            </PanGestureHandler>
        </TouchableWithoutFeedback>
    );
}
