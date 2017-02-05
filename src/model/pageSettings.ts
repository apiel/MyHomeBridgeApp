import { Injectable } from '@angular/core';
import ModelHelper from '../lib/model.helper';

@Injectable()
export default class pageSettings extends ModelHelper<pageSettings> {
    name: string; // here we could define default
    uri: string; 
    topicDefinition: string;

    protected getKey?() {
        return 'thisisatest';
    }
}