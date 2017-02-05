
class ModelHelper <T> {
    constructor(private readonly keyStorage?: string) {
        // this.load(); // Don't load here but in child class
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
        const data: T = JSON.parse(localStorage.getItem(this.getKey()));
        Object.assign(this, data);
    }
}

export default ModelHelper;