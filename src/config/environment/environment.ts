import { version } from '@root/package.json';

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

    public SUPABASE_URL: string;
    public SUPABASE_SECRET_KEY: string;
    public SUPABASE_JWT_SECRET: string;
    public SIGNUP_REDIRECT_URL: string;
    public JWT_SECRET: string;

    constructor() {
        this.VERSION = version;

        this.PORT = parseInt(process.env.PORT);

        this.JWT_SECRET = process.env.JWT_SECRET;

        this.SUPABASE_URL = process.env.SUPABASE_URL;
        this.SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
        this.SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;
        this.SIGNUP_REDIRECT_URL = process.env.SIGNUP_REDIRECT_URL;
    }
}