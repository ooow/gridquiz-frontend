import EnvService from '../services/EnvService';
import LocalStoreService, {userTokenKey} from '../services/LocalStoreService';
import {UserToken} from '../model/User';

const CURRENT_HOST = EnvService.getCurrentHost();

/** All project API urls. */
export const AUTH_URL = `${CURRENT_HOST}/auth/login`;
export const LOAD_ATTEMPT_URL = `${CURRENT_HOST}/quiz/attempt`;
export const LOAD_MINI_QUIZZES_BY_USER_URL = `${CURRENT_HOST}/quiz/mini`;
export const LOAD_MINI_QUIZZES_URL = `${CURRENT_HOST}/open/mini`;
export const SUBMIT_ANSWERS_URL = `${CURRENT_HOST}/result/submit`;

export async function get<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    return response.json();
}

export async function post<T>(url: string, body: any): Promise<T> {
    const preparedBody = typeof body === 'string' ? body : JSON.stringify(body);
    const response: Response = await fetch(url, {
        method: 'post',
        headers: getHeaders(),
        body: preparedBody,
    });
    return response.json();

}

function getHeaders(): any {
    const userToken: UserToken = LocalStoreService.read<any>(userTokenKey);
    const token = userToken ? `Bearer ${userToken.message}` : '';

    let headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = token;
    }

    return headers;
}
