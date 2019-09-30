import styled from "styled-components/native";

export const OficinaCard = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: #f7f7f7;
    elevation: 2;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
`;

export const Space = styled.View`
    justify-content: center;
    align-items: center;
`;

export const SpaceContent = styled.View`
    width: 30px;
    height: 5px;
    background-color: #e2e2e2;
    border-radius: 50px;
`;

export const OficinaImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

export const OficinaDetaisContent = styled.View`
    align-items: center;
`;

export const OficinaNome = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 18px;
    text-transform: uppercase;
`;

export const OficinaDescricao = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 12px;
    text-transform: uppercase;
`;

export const OficinaDetalhes = styled.View`
    margin: 10px;
    flex: 1;
    flex-direction: column;
`;

export const OficinaDetalhesTitle = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 20px;
`;

export const OficinaDetalhesServices = styled.View`
    margin: 40px 0px;
`;

export const OficinaDetalhesServicesContent = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

export const OficinaDetalhesServicesTipo = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 16px;
    padding: 10px;
    background-color: #ededed;
    border-radius: 5px;
    margin: 5px;
`;

export const OficinaDetalhesAvaliacoes = styled.View`
    flex: 1
    padding-bottom: 40px;
`;

export const OficinaDetalhesAvaliacoesContent = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CardAvaliacao = styled.View`
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
`;

export const CardAvaliacaoImage = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 15px;
`;

export const CardAvaliacaoTitle = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 16px;
    text-transform: uppercase;
`;

export const CardAvaliacaoDescricao = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 12px;
`;

export const Buttons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 40px;
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    padding: 0 20px;
    height: 40px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 7px 18px rgba(87, 69, 239, 0.2);
    elevation: 1;
`;

export const ButtonText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #fff;
`;
