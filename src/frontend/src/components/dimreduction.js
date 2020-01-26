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
    data.dispose();
    return h;
}

async function reduce(autoencoder, trained, data) {
    await trained;
    let predictor = tf.sequential();
    predictor.add(autoencoder.encoder);

    console.log(data)
    let ret = predictor.predict(data);
    // eslint-disable-next-line no-console


    //tidyWrapper.dispose();
}

const data = tf.randomUniform([100,300]);
buildModel().then((model) =>{
    train(model, data).then((trained) =>{
        reduce(model, trained, data).then((it) => {
            console.log(trained)
        })


        return tf.randomUniform([100,2]).array()
        // eslint-disable-next-line no-console
        //console.log(it.next().value)

    })
})

//export {reduce, train, buildModel}
