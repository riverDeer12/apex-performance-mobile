import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthResponse} from "../models/auth-response";
import {DefaultPostRequest} from "../models/default-post-request";
import {jwtDecode} from "jwt-decode";
import {Preferences} from "@capacitor/preferences";
import {Roles} from "../constants/roles";

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

    if (!token) {
      return false;
    }

    const now = Date.now().valueOf() / 1000;

    const decodedToken = jwtDecode(token) as AuthResponse;

    return decodedToken.exp >= now;
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

    const decodedToken = jwtDecode(token) as AuthResponse;

    return decodedToken.permissions;
  }

  async getLoggedUserRoles() {
    const token = await this.getTokenFromStorage();

    const decodedToken = jwtDecode(token) as AuthResponse;

    return decodedToken.role as string[];
  }

  async getLoggedUserUsername(): Promise<string> {
    const token = await this.getTokenFromStorage();

    const decodedToken = jwtDecode(token) as AuthResponse;

    return decodedToken.name;
  }

  async getTokenFromStorage(): Promise<string> {
    const tokenStorageValue = await Preferences.get({key: 'token'});

    if (!tokenStorageValue || tokenStorageValue.value == null) {
      this.router.navigateByUrl("login").then();
      return '';
    } else {
      return tokenStorageValue.value as string;
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

  async validateAdminUser(): Promise<boolean> {
    const roles = await this.getLoggedUserRoles();

    return (
      roles.includes(Roles.Administrator) || roles.includes(Roles.SuperAdmin)
    );
  }
}
