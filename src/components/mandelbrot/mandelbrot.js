import React from 'react';
import PropTypes from 'prop-types';

import Worker from './mandelbrot.worker';
import './mandelbrot.scss';

class Mandelbrot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCanvas: false
        };

        this.worker = new Worker();
    }

    componentDidMount() {
        this.worker.addEventListener('message', (event) => {
            let myCanvas = document.getElementById("mandelbrot");
            let ctx = myCanvas.getContext("2d");

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

            for (let i = 0; i < event.data.count; i++) {
                ctx.fillStyle = event.data.pixeldata[i].color;
                ctx.fillRect(event.data.pixeldata[i].x, event.data.pixeldata[i].y, 1, 1);
            }

            //console.log('painted canvas');
            
            this.setState({
                showCanvas: true
            });
        });

        let myCanvas = document.getElementById("mandelbrot");
        this.worker.postMessage({
            hue: this.props.hue,
            magnificationFactor: this.props.magnificationFactor,
            panX: this.props.panX,
            panY: this.props.panY,
            dimensions: { x: myCanvas.width, y: myCanvas.height }
        });
    }

    componentWillReceiveProps(nextProps) {
        let myCanvas = document.getElementById("mandelbrot");
        if ((nextProps.magnificationFactor !== this.props.magnificationFactor) || (nextProps.panX !== this.props.panX) || (nextProps.panY !== this.props.panY)) {
            this.worker.postMessage({
                hue: nextProps.hue,
                magnificationFactor: nextProps.magnificationFactor,
                panX: nextProps.panX,
                panY: nextProps.panY,
                dimensions: { x: myCanvas.width, y: myCanvas.height }
            });
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
    hue: PropTypes.number,
    magnificationFactor: PropTypes.number,
    panX: PropTypes.number,
    panY: PropTypes.number,
    width: PropTypes.number,
};

Mandelbrot.defaultProps = {
    height: 900,
    hue: 114,
    magnificationFactor: 1000,
    panX: 0.5,
    panY: 0.5,
    width: 1920
};

export default Mandelbrot;