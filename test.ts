// const word2vec = require("word2vec");
const word2vecStream = require("word2vec-stream")

export const test = async (): Promise<Map<string, Float32Array>> => {
    // 'GoogleNews-vectors-negative300.bin'
    return new Promise<Map<string, Float32Array>> ((resolve) => {
        let vectors = new Map<string, Float32Array>()
        word2vecStream('./test.bin').then(stream => {
            const readMore = () => {
                const nextObj = stream.read();
                if (nextObj===null) return;
                vectors.set(nextObj.word, nextObj.values)
                readMore();
            }

            stream.on('readable', () => {
                readMore();
            });

            stream.on('end', () => {
                resolve(vectors)
            });
        })  
    })
}

// word2vec.loadModel( 'GoogleNews-vectors-negative300.bin', function( error, model ) {
//     console.log( model );
// });