import React, { Component } from 'react';
import Mandelbrot from './mandelbrot/mandelbrot'

class App extends Component {
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
            panY: panY
        });
    }

    render() {
        let values = this.generateRandomMagnification();
        console.log(values);
        return (
            <div className="App">
                <Mandelbrot
                    magnificationFactor={values.magnFactor} panX={values.panX} panY={values.panY} />
            </div>
        );
    }
}

export default App;
