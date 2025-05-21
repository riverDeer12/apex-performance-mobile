import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthResponse} from "../models/auth-response";
import {DefaultPostRequest} from "../models/default-post-request";
import {jwtDecode} from "jwt-decode";
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  login = (request: DefaultPostRequest) =>
    this.http.post<AuthResponse>(
      environment.apiUrl + "/authentication/login",
      request,
    );

  resetPassword = (request: DefaultPostRequest) =>
    this.http.post<AuthResponse>(
      environment.apiUrl + "/authentication/reset-password",
      request,
    );

  async isUserLogged(): Promise<boolean> {
    const token = await this.getTokenFromStorage();

    const now = Date.now().valueOf() / 1000;

    return token.exp >= now;
  }

  /**
   * Log out user from application.
   *
   * @param redirectUrl preferred redirect url.
   */
  logOut(redirectUrl: string): void {
    Preferences.remove({
      key: "token"
    });
    this.router.navigateByUrl(redirectUrl).then();
  }

  async getLoggedUserPermissions(): Promise<string[]> {
    const token = await this.getTokenFromStorage();
    return token.permissions;
  }

  async getLoggedUserRoles() {
    const token = await this.getTokenFromStorage();
    return token.role as string[];
  }

  async getLoggedUserUsername(): Promise<string> {
    const token = await this.getTokenFromStorage();
    return token.name;
  }

  async getTokenFromStorage(): Promise<AuthResponse> {
    const tokenStorageValue = await Preferences.get({key: 'token'});

    if (!tokenStorageValue || tokenStorageValue.value == null) {
      this.router.navigateByUrl("login").then();
      return new AuthResponse();
    } else {
      const token = tokenStorageValue.value as string;
      return jwtDecode(token) as AuthResponse;
    }
  }

  /**
   * Check if user has permission
   * to see some content.
   * @param permission - permission name.
   * @see {@link /src/app/constants/permissions.ts} for a list of permission constants.
   */
  async checkPermission(permission: string) {
    const userPermissions = await this.getLoggedUserPermissions();
    return userPermissions.includes(permission);
  }

  /**
   * Saves token to secure storage.
   * @param token - JWT value that needs to be stored
   */
  saveToken(token: string) {
    Preferences.set({
      key: 'token',
      value: token
    });
  }
}
