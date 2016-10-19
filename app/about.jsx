import {render} from 'react-dom'
import React from 'react';
import {Item} from './components/presentational/Item';
import {ThemeProvider} from 'react-css-themr';
import style from './theme/ItemDefault.scss';
const contextTheme = {
    Item: require('./theme/ItemVendor.scss'),
};

const About = () => {
    return (
        <ThemeProvider theme={contextTheme}>
            <Item theme={style} className={style.button}/>
        </ThemeProvider>
    )
};

export default About;