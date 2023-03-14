export default async function createOptionsFiller(readline, options){
    for (let [chave, valor] of Object.entries(options)) {
        let retorno = await new Promise((resolve) => {
            readline.question(`${chave}: `, resolve);
            readline.write(valor?.toString());
        });
        options[chave] = retorno || options[chave];
    }
    
    readline.close();

    return options;
}