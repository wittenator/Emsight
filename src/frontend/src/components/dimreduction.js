const tf = require('@tensorflow/tfjs')


const buildModel = async () => {
    const model = tf.sequential();

    // To simulate PCA we use 1 hidden layer with a linear (relu) activation
    const encoder = tf.layers.dense({
        units: 2,
        batchInputShape:[null,300],          //We will input N samples X 4 columns
        activation: 'relu',
        kernelInitializer:"randomNormal",  //Randomize to avoid degenerate cases
        biasInitializer:"ones"});
    const decoder = tf.layers.dense({units: 300, activation: 'relu'});

    model.add(encoder);
    model.add(decoder);
    await model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

    return  {
        'model':model,
        'encoder':encoder,
        'decoder':decoder
    }
}

const train = async (autoencoder, data) => {
    await autoencoder.model
    let h = await autoencoder.model.fit(data, data, {epochs: 50,batchSize:40,shuffle:true,validationSpit:0.1});
    return h;
}

async function reduce(autoencoder, trained, data) {
    await trained;
    let predictor = tf.sequential();
    predictor.add(autoencoder.encoder);

    let ret = predictor.predict(data);
    // eslint-disable-next-line no-console

    return ret
    //tidyWrapper.dispose();
}



export {reduce, train, buildModel}
