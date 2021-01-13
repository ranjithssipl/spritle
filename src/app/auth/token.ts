import * as JWT from 'jwt-decode';

//--
import { authTokenId } from '../core/settings/config';

// Stores token into the memory
export function setToken(token: string): void { 
    localStorage.setItem(authTokenId, token);
}

// Gets token from the stored memory
export function getToken(): string|false {
    return localStorage.getItem(authTokenId)? localStorage.getItem(authTokenId): false;
}

// Removes token from the stored memory
export function unsetToken(): void {
    localStorage.removeItem(authTokenId);
}

// Parses JWT token and returns the token expiration date
export function getTokenExpiration(): Date|false {
    
    let decoded: { id: number; exp: number } = JWT(<string>getToken());
    return new Date(decoded.exp * 1000);
}

// Checks whether the token is expired or not
export function isTokenExpired() {
    if (!getToken()) return true;

    return (<Date>getTokenExpiration()).getTime() <= (new Date()).getTime();
}