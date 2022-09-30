export class User {
    constructor(public id: string,
        public email: string,
        private _token: string,
        private _tokenExpireDate: Date) {

        }

    getToken() {

        if(!this._tokenExpireDate ||
            this._tokenExpireDate < new Date()) {
                return null;
            }
        
        return this._token;
    }
}