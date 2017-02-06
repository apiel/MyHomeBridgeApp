import { Injectable } from '@angular/core';
import PageSettings from './pageSettings';

@Injectable()
export default class {
    sequence: number = 0;
    pages: { [key: string]: PageSettings } = {};

    constructor() {
        this.load();
    }

    new() {
        this.add('page-' + this.sequence++);
        this.save();
    }

    add(key: string) {
        const page = new PageSettings(key);
        this.pages[key] = page;
    }

    delete(key: string) {
        // delete(this.get(key));
        // delete also pageSettings
        this.save();
    }

    get(key: string) {
        return this.pages[key ? key : this.keys()[0]];
    }

    keys() {
        return Object.keys(this.pages);
    }

    getStoreKey() {
        return 'pagesStore';
    }

    save() {
        localStorage.setItem(this.getStoreKey(), JSON.stringify({
            sequence: this.sequence,
            pages: this.keys()
        }));
        this.load();
    }

    load() {
        const data = JSON.parse(localStorage.getItem(this.getStoreKey()));
        console.log('Pages data: ', data);
        if (data) {
            this.sequence = data.sequence;
            for(const key of data.pages) {
                this.add(key);
            }
        }
    }
}