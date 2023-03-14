import mqtt from 'mqtt';
import createOptionsFiller from './optionsFiller.js';
import createRequestInput from './requestInput.js';

import readline from 'readline';
let rl = readline.createInterface(process.stdin, process.stdout);

let options = {
  broker: 'mqtt://broker.mqttdashboard.com',
  port: 1883,
  username: null,
  password: null,
  topics: 'topico1',
  publisherId: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
  randomPayload: 'yes',
};

const regexYes = /^-{0,2}y(es)?$/i;

if (!process.argv.some((argumento) => regexYes.test(argumento))) {
  options = await createOptionsFiller(rl, options);
}

const client = mqtt.connect(options.broker, {
  port: options.port,
  username: options.username,
  password: options.password,
});

client.on('connect', async function () {
  if (options.randomPayload === 'yes') {
    setInterval(function () {
      const strLetras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const indice = Math.floor(Math.random() * 26);
      const informacao = strLetras[indice];

      options.topics.split(';').forEach((topic) => {
        client.publish(topic, informacao);
        console.log(`> "${topic}": ${informacao}`);
      });
    }, 1000);
  } else {
    rl = readline.createInterface(process.stdin, process.stdout);
    
    while (true) {
      const input = await createRequestInput(rl, 'Mensagem: ');
      
      options.topics.split(';').forEach((topic) => {
        client.publish(topic, input);
        console.log(`> "${topic}": ${input}`);
      });
    }
  }
});
