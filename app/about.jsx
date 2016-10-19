import {render} from 'react-dom'
import React from 'react';
import {Item} from './components/presentational/Item';
import {ThemeProvider} from 'react-css-themr';
import inlineCss from './about.scss';

const contextTheme = {
    myItemName: require('./theme/ItemVendor.scss'),
};

const About = () => {
    return (
        <div>
            <Item />
            <ThemeProvider theme={contextTheme}>
                <Item />
            </ThemeProvider>
            <Item theme={inlineCss} />
        </div>
    )
};

export default About;