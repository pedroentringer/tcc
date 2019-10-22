import React, { Fragment } from "react";
import { StatusBar } from "react-native";

import Routes from "./routes";
import './config/ReactotronConfig';

export default function App() {
    return (
        <Fragment>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Routes />
        </Fragment>
    );
}
