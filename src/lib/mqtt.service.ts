import { Injectable } from '@angular/core';
import Mqtt from 'mqtt';

@Injectable()
export default class {
    mqtt: any;
    protected _subscribeCallback: { [topic: string]: (message: string) => any } = {};

    constructor() {
        console.log('contruct mqtt');
        this.init();
    }

    init() {
        this.mqtt = Mqtt.connect('ws://127.0.0.1:3030');
        this.subscribe('item/garage/table/light', msg => console.log(msg));

        this.mqtt.on('error', error => console.error);
        this.mqtt.on('connect', connack => console.log('connected to mqtt: ', connack) );

        this.mqtt.on('message', this._consume.bind(this));
    }

    protected _consume(topic: string, message: any) {
        if (topic in this._subscribeCallback) {
           this._subscribeCallback[topic](message.toString());
        }
    }

    subscribe(topic: string, callback: (message: string) => any) {
        this.mqtt.subscribe(topic);
        this._subscribeCallback[topic] = callback;
    }

    publish(topic: string, message: string) {
        this.mqtt.publish(topic, message, { retain: true });
    }
}