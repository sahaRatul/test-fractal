self.onmessage = (message) => {
    let data = self.createMandelbrot(message.data.magnificationFactor, message.data.panX, message.data.panY, message.data.dimensions, message.data.hue);
    postMessage(data);
};

self.checkIfBelongsToMandelbrotSet = (x, y) => {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;
    let maxIterations = 30;
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
    let belongsToSet = 0, val = 0;
    let i = 0;
    for (let y = 0; y < dimensions.y; y++) {
        val = y / magnificationFactor - panY;
        for (let x = 0; x < dimensions.x; x++) {
            belongsToSet = self.checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX, val);
            if (belongsToSet !== 0) {
                arr[i] = { x: x, y: y, color: 'hsl(' + hue + ', 100%, ' + belongsToSet + '%)' };
                i++;
            }
        }
    }
    return { pixeldata: arr, count: i };
};