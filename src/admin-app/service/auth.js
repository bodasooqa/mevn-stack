import Api from './api';

export default class AuthenticationService {
    login(credentials) {
        return Api().post('login', credentials);
    }
}