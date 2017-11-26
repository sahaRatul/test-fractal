import React, { Component } from 'react';
import Mandelbrot from './mandelbrot/mandelbrot';
//import PropTypes from 'prop-types';

class App extends Component {/**
     * constructor function for the App component where the initial state and props are defined.
     * @param  {object} - props - initial props for the App component.
     * @return {object} - returns the App component instance.
     */
    constructor(props) {
        super(props);
        this.generateRandomMagnification = this.generateRandomMagnification.bind(this);
    }

    generateRandomMagnification() {
        let magnFactor = Math.floor(Math.random() * 5000);
        let panX = Math.random();
        let panY = Math.random();
        return ({
            magnFactor: magnFactor,
            panX: panX,
            panY: panY,
            hue: Math.floor(Math.random() * 360)
        });
    }

    render() {
        let values = this.generateRandomMagnification();
        return (
            <div className="App">
                <Mandelbrot
                    magnificationFactor={values.magnFactor} panX={values.panX} panY={values.panY} hue={values.hue} />
            </div>
        );
    }
}

App.propTypes = {
    //children: PropTypes.object.isRequired
};

export default App;