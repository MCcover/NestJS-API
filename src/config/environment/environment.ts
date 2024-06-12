export class Environment {

    private static instance: Environment;

    public static get Instance(): Environment {
        if (!Environment.instance) {
            Environment.instance = new Environment();
        }

        return Environment.instance;

    }

    public PORT: number;
    public VERSION: string;

    constructor() {
        this.PORT = parseInt(process.env.PORT);
        this.VERSION = process.env.VERSION;
    }
}