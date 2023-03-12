
import mqtt from 'mqtt';
import createOptionsFiller from './optionsFiller.js';

let options = {
  broker: 'mqtt://broker.mqttdashboard.com',
  port: 1883,
  username: null,
  password: null,
  topics: 'topico1;topico2;topico3',
};

options = await createOptionsFiller(options);

const client = mqtt.connect(options.broker, {
  port: options.port,
  username: options.username,
  password: options.password,
});

client.on('connect', function() {
    options.topics.split(';').forEach(topic => {
        client.subscribe(topic);
        console.log(`Cliente inscrito no tópico: ${topic}`);
    })
});

client.on('message', function(topic, message) {
    console.log(`< "${topic}": ${message.toString()}`);
});