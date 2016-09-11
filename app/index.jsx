import React from "react";
import ReactDom from "react-dom";
import World from "./World.jsx";
import createStrore from "redux";
import todoApp from "./reducers/reducers";

let store = createStrore(todoApp);

ReactDom.render(
    <World foo="bar" />,
    document.getElementById('app')
);