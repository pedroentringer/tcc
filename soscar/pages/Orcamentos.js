import React from "react";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';



export default function Orcamento(props) {
    const { navigation } = props;

    renderOrcamentos = () => {
        const items = [
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Reparar Pneu Furado',
                description: 'Será preciso tampar o buraco',
                value: '52,30',
                duration: '13h',
                status: 'Pendente'
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Reparar Pneu Furado',
                description: 'Será preciso tampar o buraco',
                value: '52,30',
                duration: '13h',
                status: 'Pendente'
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Reparar Pneu Furado',
                description: 'Será preciso tampar o buraco',
                value: '52,30' ,
                duration: '13h',
                status: 'Pendente'
            },
        ]

        return items.map( (item, index) => {
            return (
              <ListItem avatar key={index} onPress={()=> {
                navigation.navigate('SOSOrcamentos', {budget: item})
            }}>
              <Left>
                <Thumbnail source={{ uri: item.avatar }} />
              </Left>
              <Body>
                <Text>{item.title}</Text>
                <Text note>{item.description}</Text>
              </Body>
              <Right>
                <Text note>R${item.value}</Text>
              </Right>
            </ListItem>
            )
        })
    };

    return (
        <Container>
        <Content>
          <List>
          {this.renderOrcamentos()}
          </List>
        </Content>
      </Container>
    );
}
