import Api from './api';

export default class AuthenticationService {
    login(credentials) {
        return Api().post('login', credentials)
            .then(() => {
                window.location = '/admin';
            });
    }
}