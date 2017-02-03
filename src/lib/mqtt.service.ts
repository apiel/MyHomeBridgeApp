import { Injectable } from '@angular/core';
import Mqtt from 'mqtt';

@Injectable()
export default class {
    mqtt: any;

    constructor() {
        console.log('contruct mqtt');
        this.init();
    }

    init() {
    //   var client = Mqtt.connect('ws://127.0.0.1:3333') // you add a ws:// url here
    //   client.subscribe('item/garage/chill/light')
 
    //   client.on("message", function (topic, payload) {
    //     alert([topic, payload].join(": "))
    //     client.end()
    //   })
 
    //   client.publish("mqtt/demo", "hello world!")

        //this.mqtt = Mqtt.connect('mqtt://192.168.0.67');
        //this.mqtt = Mqtt.connect('mqtt://127.0.0.1:3333');
        this.mqtt = Mqtt.connect('ws://127.0.0.1:3030');
        this.mqtt.subscribe('item/garage/chill/light');

        this.mqtt.on('error', function (error) {
            console.error(error);
        });

        this.mqtt.on('connect', function (connack) {
            console.log(connack);
            console.log('connected to mqtt');
            // this.mqtt.publish('presence', 'Hello mqtt');
        });

        this.mqtt.on('message', function (topic, message) {
            console.log(topic);
            console.log(message.toString());
        });
    }
}