import mqtt from 'mqtt';
import createOptionsFiller from './optionsFiller.js';

let options = {
  broker: 'mqtt://broker.mqttdashboard.com',
  port: 1883,
  username: null,
  password: null,
  topics: 'topico1;topico2;topico3',
  publisherId: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
};

options = await createOptionsFiller(options);

const client = mqtt.connect(options.broker, {
  port: options.port,
  username: options.username,
  password: options.password,
});

client.on('connect', function () {
  setInterval(function () {
    const strLetras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const indice = Math.floor(Math.random() * 26);
    const letraAleatoria = strLetras[indice];
    const mensagem = `${options.publisherId}_${letraAleatoria}`;
    
    options.topics.split(';').forEach(topic => {
        client.publish(topic, mensagem);
        console.log(`> "${topic}": ${mensagem}`);
    })

  }, 1000);
});
