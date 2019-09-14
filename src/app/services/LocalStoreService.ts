/**
 * LocalStorage service provides methods for getting/setting the project
 * variables from global local storage.
 */
export default class LocalStoreService {
    /**
     * Tries to get value from local storage for provided key.
     */
    static read<T>(key: string): T | undefined {
        const o = window.localStorage.getItem(key);
        if (!!o) {
            return JSON.parse(String(o));
        }
        return undefined;
    }

    /**
     * Saves to local storage object with key.
     */
    static write<T>(key: string, value: T) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}
