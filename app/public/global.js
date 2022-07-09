class App {
    static get() {
        if (typeof(window.app) === 'undefined') {
            window.app = new App();
        }
        return window.app;
    }
    static run(rawPrms) {
        App.ready(()=>{
            App.setupPage();
        });
    }
    static ready(cb) {
        if (document.readyState === 'complete') {
            cb();
            return;
        }

        document.addEventListener('readystatechange', event => {
            if (event.target.readyState === "interactive") {
                // All HTML DOM elements are accessible.
            }

            if (event.target.readyState === "complete") {
                cb();
            }
        });
    }
    static setupPage() {
        document.body = document.createElement('body');
        const button = document.createElement('button');
        const buttonTextNode = document.createTextNode('Connect');
        button.appendChild(buttonTextNode);
        button.addEventListener('click', ()=>{
            Straw.connect();
        });
        document.body.appendChild(button);
    }
}
class Straw {
    static get() {
        const app = App.get();
        if (typeof(app.straw) === 'undefined') {
            app.straw = new Straw();
        }
        return app.straw;
    }
    static connect() {
        Straw.get().connect();
    }
    static getWsProtocol() {
        return location.protocol === 'http:' ? 'ws:' : 'wss:'; // 'wss://'|'ws://'
    }
    connect() {
        if (typeof(this.ws) === 'undefined') {
            this.ws = new WebSocket(`${Straw.getWsProtocol()}//${location.host}/straw`);
            this.ws.addEventListener('open', ()=>{
                console.log('Straw opened.');
            });
            this.ws.addEventListener('close', ()=>{
                console.log('Straw closed.');
            });
        }
    }
}
