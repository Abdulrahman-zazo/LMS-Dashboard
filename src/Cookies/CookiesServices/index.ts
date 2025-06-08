import Cookies from "universal-cookie";

const cookies = new Cookies();

// interface CookieSetOptions {
//   path?: string;
//   expires?: Date;
//   maxAge?: number;
//   domain?: string;
//   secure?: boolean;
//   httpOnly?: boolean;
//   sameSite?: boolean | "none" | "lax" | "strict";
// }

class CookiesService {
  // Get cookie by name
  get(name: string): string | undefined {
    return cookies.get(name);
  }

  set(name: string, value: string): void {
    cookies.set(name, value);
  }
  // Set cookie with options
  // set(name: string, value: string, options?: CookieSetOptions): void {
  //   const defaultOptions = {
  //     path: "/",
  //     // secure: process.env.NODE_ENV === 'production',
  //     sameSite: "strict" as const,
  //     ...options,
  //   };

  //   cookies.set(name, value, defaultOptions);
  // }

  // Remove cookie
  remove(name: string): void {
    cookies.remove(name);
  }
}

export const cookieService = new CookiesService();
