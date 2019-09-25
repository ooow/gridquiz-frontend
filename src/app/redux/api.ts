import EnvService from '../services/EnvService';
import LocalStoreService, {userTokenKey} from '../services/LocalStoreService';
import {User} from '../model/User';

const CURRENT_HOST = EnvService.getCurrentHost();

/** All project API urls. */
export const AUTH_URL = `${CURRENT_HOST}/auth/login`;
export const LOAD_DASHBOARDS_URL = `${CURRENT_HOST}/result/dashboards`;
export const LOAD_OPEN_DASHBOARDS_URL = `${CURRENT_HOST}/open/dashboards`;
export const LOAD_MINI_QUIZZES_BY_USER_URL = `${CURRENT_HOST}/quiz/mini`;
export const LOAD_MINI_QUIZZES_URL = `${CURRENT_HOST}/open/mini`;
export const LOAD_PROGRESS_URL = `${CURRENT_HOST}/quiz/progress`;
export const SUBMIT_ANSWERS_URL = `${CURRENT_HOST}/result/submit`;
export const SAVE_QUIZ_URL = `${CURRENT_HOST}/admin/quiz/save`;
export const CHECK_IS_ADMIN_URL = `${CURRENT_HOST}/admin/check`;

export async function get<T>(url: string): Promise<T> {
    const response: Response = await fetch(url, {
        method: 'get',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}

export async function post<T>(url: string, body: any): Promise<T> {
    const preparedBody = typeof body === 'string' ? body : JSON.stringify(body);
    const response: Response = await fetch(url, {
        method: 'post',
        headers: getHeaders(),
        body: preparedBody,
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();

}

export function getHeaders(): any {
    const user: User = LocalStoreService.read<any>(userTokenKey);
    const token = user ? `Bearer ${user.token}` : '';

    let headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = token;
    }

    return headers;
}
