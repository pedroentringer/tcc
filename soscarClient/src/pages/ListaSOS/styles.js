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
    flex-direction: row;
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
