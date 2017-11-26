self.onmessage = (message) => {
    let arr = self.createMandelbrot(message.data.magnificationFactor, message.data.panX, message.data.panY, message.data.dimensions, message.data.hue);
    postMessage({ pixeldata: arr });
};

self.checkIfBelongsToMandelbrotSet = (x, y) => {
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
};

self.createMandelbrot = (magnificationFactor, panX, panY, dimensions, hue) => {
    let arr = new Array(dimensions.x * dimensions.y).fill(0);
    let belongsToSet = 0, row = 0, val = 0;

    for (let y = 0; y < dimensions.y; y++) {

        row = y * dimensions.x;
        val = y / magnificationFactor - panY;

        for (let x = 0; x < dimensions.x; x++) {
            belongsToSet = self.checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX, val);
            if (belongsToSet === 0) {
                arr[row + x] = '#000';
            }
            else {
                arr[row + x] = 'hsl(' + hue +', 100%, ' + belongsToSet + '%)';
            }
        }
    }
    return arr;
};