import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role?:string;
      name?: string | null;
      phone?: string | null;
      image?: string | null;
      address?: string | null;

    };
  }

  interface User {
    id: string;
    name?:string;
    email: string;
    role: string;
    phone:string;
    address:string;
    name?: string | null;
    image?: string | null;
    password?: string;
  }
  
}
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}