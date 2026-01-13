export type Role = "MANAGER" | "STORE_KEEPER";

export interface User {
    email: string;
    role: Role;
}
