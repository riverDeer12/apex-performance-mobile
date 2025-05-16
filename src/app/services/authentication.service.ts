import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthResponse} from "../models/auth-response";
import {DefaultPostRequest} from "../models/default-post-request";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login = (request: DefaultPostRequest) =>
    this.http.post<AuthResponse>(
      environment.apiUrl + "/authentication/login",
      request,
    );

  register = (request: DefaultPostRequest) =>
    this.http.post<AuthResponse>(
      environment.apiUrl + "/authentication/register",
      request,
    );

  resetPassword = (request: DefaultPostRequest) =>
    this.http.post<AuthResponse>(
      environment.apiUrl + "/authentication/reset-password",
      request,
    );

  isUserLogged(): boolean {
    const token = this.getAuthTokenFromLocalStorage();

    const now = Date.now().valueOf() / 1000;

    return token.exp >= now;
  }

  /**
   * Log out user from application.
   *
   * @param redirectUrl preferred redirect url.
   */
  logOut(redirectUrl: string): void {
    localStorage.removeItem("token");
    this.router.navigateByUrl(redirectUrl).then();
  }

  getLoggedUserPermissions(): string[] {
    const token = this.getAuthTokenFromLocalStorage();
    return token.permissions;
  }

  getLoggedUserRoles() {
    const token = this.getAuthTokenFromLocalStorage();
    return token.role as string[];
  }

  getLoggedUserUsername(): string {
    const token = this.getAuthTokenFromLocalStorage();
    return token.name;
  }

  private getAuthTokenFromLocalStorage(): AuthResponse {
    const tokenStorageValue = localStorage.getItem("token");

    if (!tokenStorageValue) {
      this.router.navigateByUrl("login").then();
      return new AuthResponse();
    } else {
      return jwtDecode(tokenStorageValue) as AuthResponse;
    }
  }

  /**
   * Check if user has permission
   * to see some content.
   * @param permission - permission name.
   * @see {@link /src/app/constants/permissions.ts} for a list of permission constants.
   */
  checkPermission(permission: string) {
    const userPermissions = this.getLoggedUserPermissions();
    return userPermissions.includes(permission);
  }
}
