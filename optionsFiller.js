import readline from 'readline';
const rl = readline.createInterface(process.stdin, process.stdout);

export default async function createOptionsFiller(options){
    for (let [chave, valor] of Object.entries(options)) {
        let retorno = await new Promise((resolve) => {
            rl.question(`${chave}: `, resolve);
            rl.write(valor?.toString());
        });
        options[chave] = retorno || options[chave];
    }
    
    rl.close();

    return options;
}