import { Injectable } from '@angular/core';
import Mqtt from 'mqtt';

@Injectable()
export default class {
    mqtt: any;
    protected _subscribeCallback: { [topic: string]: (message: string) => any } = {};

    // constructor() {
    //     this.init('ws://127.0.0.1:3030');
    // }

    init(uri: string) {
        this.mqtt = Mqtt.connect(uri);

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
        if (this.mqtt) {
            this.mqtt.subscribe(topic);
            this._subscribeCallback[topic] = callback;            
        }        
    }

    publish(topic: string, message: string) {
        if (this.mqtt) {
            this.mqtt.publish(topic, message, { retain: true });
        }
    }

    isConnected() {
        return this.mqtt ? this.mqtt.connected : false;
    }    
}