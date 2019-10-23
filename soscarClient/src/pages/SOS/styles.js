import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const ContainerStatus = styled.View`
    padding: 20px;
`;

export const ContainerStatusContent = styled.View`
    flex-direction: row;
    padding-top: 10px;
`;

export const Header = styled.View`
    flex-direction: row;
`;

export const Status = styled.View`
    height: 25px;
    width: 100px;
    justify-content: center;
    align-items: center;
    border-radius: 12.5px;
`;

export const StatusText = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 11px;
    color: #fff;
`;

export const CancelarSOS = styled.View`
    flex: 1;
    align-items: flex-end;
`;

export const BtnCancelarSOS = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
    background-color: #f5365c;
    height: 25px;
    width: 120px;
    justify-content: center;
    align-items: center;
    border-radius: 12.5px;
`;

export const Scroll = styled.ScrollView.attrs({
    keyboardDismissMode: "on-drag",
    showsVerticalScrollIndicator: false
})`
    flex: 1;
    background-color: #fafafa;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const Content = styled.View`
    flex: 1;
    padding: 10px 26px;
`;

export const Title = styled.Text`
    font-family: "Montserrat-Bold";
    text-align: center;
    font-size: 30px;
    color: #1f2126;
    margin: 10px 0px 20px 0px;
`;

export const Card = styled.View`
    align-self: stretch;
    justify-content: space-between;
    border-radius: 15px;
    background-color: #fff;
    margin-bottom: 20px;
    elevation: 1;
`;

export const CardContent = styled.View`
    padding: 20px 20px 45px 20px;
`;

export const CarImage = styled.View`
    justify-content: center;
    align-items: center;
`;

export const CardDetails = styled.View`
    flex: 1;
    padding-left: 20px;
    justify-content: center;
`;

export const CardImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const CardTitle = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 18px;
    color: #1f2126;
`;

export const CardBoard = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 12px;
    color: #1f2126;
    padding-top: 5px;
`;
export const CardDescription = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 14px;
    color: #8898aa;
`;

export const CardStatus = styled.View`
    height: 25px;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

export const CardStatusText = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 14px;
    color: #fff;
`;

export const Mensagem = styled.Text`
    font-family: "Montserrat-Regular";
    text-align: center;
    font-size: 14px;
    color: #8898aa;
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
    margin-top: 20px;
`;

export const ButtonText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #fff;
`;