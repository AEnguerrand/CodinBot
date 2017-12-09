export default class CommandHandler {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    onInit(client) {
        this.client = client;
    }

    onCommand(event) {
        console.warn("Unhandled %s command!", this.name);
    }
}
