// services/auth.ts
import { api } from "./api";

export async function loginPost(login: string, password: string) {
  return api.post("/auth/login", {
    login,
    password,
  });
}
