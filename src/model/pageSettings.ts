import ModelHelper from '../lib/model.helper';

export default class pageSettings extends ModelHelper<pageSettings> {
    name: string = 'New page';
    uri: string; 
    topicDefinition: string;

    constructor(key: string = 'default') { 
        super('page/' + key);
    }
}