
class ModelHelper <T> {
    constructor(private readonly keyStorage?: string) {
        console.log('ModelHelper constructor: ', this.getKey());
        this.load();
    }

    protected getKey?(): string {
        return this.keyStorage;
    }

    save?(data?: T) {
        let copy = Object.assign({}, data ? data : this);
        delete(copy['keyStorage']);
        localStorage.setItem(this.getKey(), JSON.stringify(copy));
        this.load();
    }

    load?() {
        const data = JSON.parse(localStorage.getItem(this.getKey()));
        for(const key in data) {
            this[key] = data[key];
        }
    }
}

export default ModelHelper;