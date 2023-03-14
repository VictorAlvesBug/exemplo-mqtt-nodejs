import mqtt from 'mqtt';
import createOptionsFiller from './optionsFiller.js';

import readline from 'readline';
const rl = readline.createInterface(process.stdin, process.stdout);

let options = {
  broker: 'mqtt://broker.mqttdashboard.com',
  port: 1883,
  username: null,
  password: null,
  topics: 'topico1;topico2;topico3',
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

client.on('connect', function () {
  options.topics.split(';').forEach((topic) => {
    client.subscribe(topic);
    console.log(`Cliente inscrito no tópico: ${topic}`);
  });
});

client.on('message', function (topic, strPayload) {
  if (isJSON(strPayload)) {
    const payload = JSON.parse(strPayload);
    console.log(`< "${topic}":`, payload);
  } 
  else {
    console.log(`< "${topic}":`, strPayload.toString());
  }
});

function isJSON(text){
  try{
    JSON.parse(text);
    return true;
  }
  catch{
    return false;
  }
}