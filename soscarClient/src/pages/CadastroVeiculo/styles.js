import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Scroll = styled.ScrollView.attrs({
    keyboardDismissMode: "on-drag",
    showsVerticalScrollIndicator: false
})`
    flex: 1;
`;


export const Content = styled.View`
    flex: 1;
    padding: 10px 26px 30px 26px;
`;

export const CarContent = styled.View`
    flex: 1;
    padding: 10px 26px 30px 26px;
    align-items: center;
`;


export const Title = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 30px;
    color: #1f2126;
    text-align:left;
    margin-top:20px;
`;

export const Descricao = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 16px;
    color: #1f2126;
    margin-bottom:20px;
`;

export const CarImage = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;

`;

export const Modelo = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 30px;
    color: #1f2126;
    text-align:center;
    text-transform: uppercase;
`;

export const Ano = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 24px;
    color: #1f2126;
    text-align:center;
    text-transform: uppercase;
`;

export const Placa = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 14px;
    color: #1f2126;
    margin: 0 0 20px 0px;
    text-align:center;
    text-transform: uppercase;
`;

export const Card = styled.KeyboardAvoidingView`
    align-self: stretch;
    justify-content: space-between;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.04);
    padding: 20px;
    elevation: 1;
`;

export const CardTitle = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 15px;
    margin-bottom: 5px;
`;

export const Input = styled.TextInput`
    align-self: stretch;
    border-radius: 5px;
    background-color: #f7f8f9;
    border: 1px solid #d2cfcf;
    padding: 5px 10px 5px 10px;
    font-size: 14px;
    margin-bottom: 20px;
`;

export const ButtonNextContent = styled.View`
    align-items: flex-end;
    margin-top: 20px;
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    padding: 0 20px;
    height: 40px;
    border-radius: 8px;
    background-color: #2DCE89;
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
