import EnvService from '../services/EnvService';

const CURRENT_HOST = EnvService.getCurrentHost();

/** This file contains all project API urls. */
export const LOAD_MINI_QUIZZES_URL = `${CURRENT_HOST}/open/mini/quizzes`;
