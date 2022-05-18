// const word2vec = require("word2vec");
const word2vecStream = require("word2vec-stream")

// export const test = async (): Promise<Map<string, Float32Array>> => {
//     console.log("1")
//     // export async function test(): Promise<Map<string, Float32Array>> {
//     // 'GoogleNews-vectors-negative300.bin'
//     let vectors = new Map<string, Float32Array>()

//     await word2vecStream('./test.bin').then(stream => {
//         console.log("2")
//         const readMore = () => {
//             const nextObj = stream.read();
//             if (nextObj===null) return;
//             vectors.set(nextObj.word, nextObj.values)
//             readMore();
//         }

//         stream.on('readable', () => {
//             readMore();
//         });

//         stream.on('end', () => {
//             console.log("3")
//             return vectors
//         });
//         console.log("7")
//         return vectors
//     })
//     console.log("4")
//     return vectors
// }

export const test = async () => word2vecStream('./test.bin').then(stream => {
    let vectors = new Map<string, Float32Array>()
    console.log("2")
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
        console.log("3")
        // return vectors
    });
    console.log("7")
    return vectors
})

const test2 = async () => {
    console.log("5")
    const vectors = await test()
    console.log(vectors)
}

console.log("6")
test2()

// word2vec.loadModel( 'GoogleNews-vectors-negative300.bin', function( error, model ) {
//     console.log( model );
// });