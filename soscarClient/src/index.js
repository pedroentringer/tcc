import React, { Fragment } from "react";
import { StatusBar } from "react-native";

import './config/ReactotronConfig';
import Routes from "./routes";

export default function App() {
    return (
        <Fragment>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Routes />
        </Fragment>
    );
}
