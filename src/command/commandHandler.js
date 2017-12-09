import i18n from "i18n";

export default class CommandHandler {
    constructor(name) {
        this.name = name;
    }

    tl(user, key) {
        return i18n.__({phrase: key, locale: user.lang});
    }

    onInit(client) {
        this.client = client;
    }

    onCommand(event) {
        console.warn(`Unhandled ${this.name} command!`);
    }
}
