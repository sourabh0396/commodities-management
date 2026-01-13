export type Role = "MANAGER" | "STORE_KEEPER";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export const users: User[] = [
    {
        id: 1,
        name: "Manager One",
        email: "manager@slooze.com",
        password: "manager123",
        role: "MANAGER",
    },
    {
        id: 2,
        name: "Store Keeper One",
        email: "store@slooze.com",
        password: "store123",
        role: "STORE_KEEPER",
    },
];
