class App {
    static get() {
        if (typeof(window.app) === 'undefined') {
            window.app = new App();
        }
        return window.app;
    }
    static run() {
        App.ready(()=>{
            App.setupPage();
        });
    }
    static ready(cb) {
        if (document.readyState === 'complete') {
            cb();
            return;
        }

        document.addEventListener('readystatechange', event=>{
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

        const connectButton = document.createElement('button');
        connectButton.appendChild(document.createTextNode('Connect'));
        connectButton.addEventListener('click', ()=>{
            Straw.connect();
        });
        document.body.appendChild(connectButton);

        const disconnectButton = document.createElement('button');
        disconnectButton.appendChild(document.createTextNode('Disconnect'));
        disconnectButton.addEventListener('click', ()=>{
            Straw.disconnect();
        });
        document.body.appendChild(disconnectButton);

        Straw.connect();
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
    static disconnect() {
        Straw.get().disconnect();
    }
    static getWsProtocol() {
        return location.protocol === 'http:' ? 'ws:' : 'wss:'; // 'wss://'|'ws://'
    }
    disconnect() {
        if (typeof(this.ws) !== 'undefined' && this.ws.statusCode !== 2) {
            this.ws.close();
            this.updateStatusText();
        }
    }
    connect() {
        if (typeof(this.ws) !== 'undefined' && [0, 1].indexOf(this.ws.readyState) !== -1) {
            return;
        }

        this.ws = new WebSocket(`${Straw.getWsProtocol()}//${location.host}/straw`);
        this.ws.addEventListener('open', ()=>{
            console.log('Straw opened.');
            this.updateStatusText();
        });
        this.ws.addEventListener('close', ()=>{
            console.log('Straw closed.');
            this.updateStatusText();
            delete this.ws;
        });
        this.updateStatusText();
    }
    updateStatusText() {
        const wsStatusElement = Straw.getWsStatusElement();
        Page.updateContains(Page.getBody(), wsStatusElement, true);
        const wsStatusText = this.getWsStatusText();
        if (wsStatusElement.innerText !== wsStatusText) {
            Page.removeChildren(wsStatusElement);
            wsStatusElement.appendChild(document.createTextNode(wsStatusText));
        }
        Page.setCssClasses(wsStatusElement, this.getWsStatusCssClasses());
    }
    getWsStatusCssClasses() {
        switch (this.getWsReadyState()) {
            case 0:
                return ['warning'];
            case 1:
                return ['success'];
        }
        return ['danger'];
    }
    getWsReadyState() {
        return typeof(this.ws) !== 'undefined' ? this.ws.readyState : undefined;
    }
    getWsStatusText() {
        switch (this.getWsReadyState()) {
            case 0:
                return 'opening';
            case 1:
                return 'open';
            case 2:
                return 'closing';
        }
        return 'closed';
    }
    static getWsStatusElement() {
        let wsStatusElement = document.getElementById('wsStatus');
        if (!wsStatusElement) {
            wsStatusElement = document.createElement('span');
            wsStatusElement.id = 'wsStatus';
        }
        return wsStatusElement;
    }
}
class Page {
    static getBody() {
        if (!document.body) {
            document.body = document.createElement('body');
        }
        return document.body;
    }
    static updateContains(parentElement, childElement, shouldContain) {
        if (parentElement.contains(childElement)) {
            if (shouldContain === false) {
                parentElement.removeChild(childElement);
            }
        } else {
            if (shouldContain === true) {
                parentElement.appendChild(childElement);
            }
        }
    }
    /**
     * [Add / Remove] a css class [to / from] an element.
     *
     * @param {object}  element
     * @param {string}  cssClass
     * @param {boolean} shouldContainClass
     */
    static updateCssClass(element, cssClass, shouldContainClass) {
        if (element) {
            const classList = element.classList;
            const containsClass = classList.contains(cssClass);

            if (containsClass && !shouldContainClass) {
                classList.remove(cssClass);
            }
            if (!containsClass && shouldContainClass) {
                classList.add(cssClass);
            }
        }
    }
    static removeChildren(element) {
        if (element instanceof Element) {
            while (element.lastChild) {
                element.removeChild(element.lastChild);
            }
        }
    }
    static setCssClasses(element, cssClassList) {
        Page.removeCssClasses(element);

        if (element && Array.isArray(cssClassList)) {
            cssClassList.map(cssClass=>{
                element.classList.add(cssClass);
            });
        }
    }
    static removeCssClasses(element) {
        if (element instanceof Element) {
            while (element.classList.length >= 1) {
                element.classList.remove(element.classList[0]);
            }
        }
    }
}
