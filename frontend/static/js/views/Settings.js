import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Change Settings</h1>
            <p>
            Here you can change your settings!
            </p>
            <p>
                <a href="/" data-link>Go Home</a>.
                <a href="/posts" data-link>See Recent Posts</a>
        `;
    }
}