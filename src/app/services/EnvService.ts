const LOCAL_HOST = 'http://localhost:8080';
const PROD_HOST = 'http://quiz.griddynamics.com:8080';

/**
 * Env Service provides all functions related to project environment.
 */
export default class EnvService {
    /** Checks if is production environment. */
    static isProdEnv(): boolean {
        return process.env.NODE_ENV === 'production';
    }

    /** Returns host address for current environment. */
    static getCurrentHost(): string {
        return this.isProdEnv() ? PROD_HOST : LOCAL_HOST;
    }
}
