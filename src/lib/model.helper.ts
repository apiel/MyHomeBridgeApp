
abstract class ModelHelper <T> {
    constructor() {
        this.load();
    }

    protected abstract getKey?();

    save?(data?: T) {
        localStorage.setItem(this.getKey(), JSON.stringify(data ? data : this));
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