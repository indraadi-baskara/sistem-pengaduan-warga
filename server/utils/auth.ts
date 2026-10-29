import type { H3Event } from "h3";

export type UserRole = "pelapor" | "pengurus" | "admin";

export interface AuthUser {
  id: number;
  nama: string;
  email: string;
  peran: UserRole;
}

export function getAuthUser(event: H3Event): AuthUser | null {
  const auth: any = (event.context as any).auth;
  return auth?.user ?? null;
}

export function requireAuth(event: H3Event): AuthUser {
  const u = getAuthUser(event);
  if (!u) throw createError({ statusCode: 401, message: "Unauthorized — login required" });
  return u;
}

export function requireRole(event: H3Event, roles: UserRole[]): AuthUser {
  const u = requireAuth(event);
  if (!roles.includes(u.peran)) throw createError({ statusCode: 403, message: "Forbidden — insufficient role" });
  return u;
}

export function requirePengurusOrAdmin(event: H3Event): AuthUser {
  return requireRole(event, ["pengurus", "admin"]);
}

export function requireAdmin(event: H3Event): AuthUser {
  return requireRole(event, ["admin"]);
}
