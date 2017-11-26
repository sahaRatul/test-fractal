import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './mandelbrot.scss';

class Mandelbrot extends Component {
    constructor(props) {
        super(props);

        this.checkIfBelongsToMandelbrotSet = this.checkIfBelongsToMandelbrotSet.bind(this);
        this.createMandelbrot = this.createMandelbrot.bind(this);
    }

    componentDidMount() {
        this.createMandelbrot(this.props.magnificationFactor, this.props.panX, this.props.panY);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.magnificationFactor !== this.props.magnificationFactor) || (nextProps.panX !== this.props.panX) || (nextProps.panY !== this.props.panY)) {
            this.createMandelbrot(nextProps.magnificationFactor, nextProps.panX, nextProps.panY);
        }
    }

    checkIfBelongsToMandelbrotSet(x, y) {
        let realComponentOfResult = x;
        let imaginaryComponentOfResult = y;
        let maxIterations = 100;
        for (let i = 0; i < maxIterations; i++) {
            let tempRealComponent = realComponentOfResult * realComponentOfResult
                - imaginaryComponentOfResult * imaginaryComponentOfResult
                + x;
            let tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                + y;
            realComponentOfResult = tempRealComponent;
            imaginaryComponentOfResult = tempImaginaryComponent;

            // Return a number as a percentage
            if (realComponentOfResult * imaginaryComponentOfResult > 5)
                return (i / maxIterations * 100);
        }
        return 0;  // Return zero if in set        
    }

    createMandelbrot(magnificationFactor, panX, panY) {
        let myCanvas = document.getElementById("mandelbrot");
        let ctx = myCanvas.getContext("2d");

        for (let x = 0; x < myCanvas.width; x++) {
            for (let y = 0; y < myCanvas.height; y++) {
                let belongsToSet =
                    this.checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX, y / magnificationFactor - panY);
                if (belongsToSet === 0) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x, y, 1, 1); // Draw a black pixel
                }
                else {
                    ctx.fillStyle = 'hsl(114, 100%, ' + belongsToSet + '%)';
                    ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
                }
            }
        }
    }

    render() {
        return (
            <div className="mandelbrot-container">
                <div className="mandelbrot-wrapper">
                    <canvas id="mandelbrot" width={this.props.width} height={this.props.height} />
                </div>
            </div>
        );
    }
}

Mandelbrot.propTypes = {
    height: PropTypes.number,
    magnificationFactor: PropTypes.number,
    panX: PropTypes.number,
    panY: PropTypes.number,
    width: PropTypes.number,
};

Mandelbrot.defaultProps = {
    height: 900,
    magnificationFactor: 1000,
    panX: 0.5,
    panY: 0.5,
    width: 1920
};

export default Mandelbrot;