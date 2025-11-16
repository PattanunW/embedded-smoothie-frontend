import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      User_info: {
        createdAt: string;
        email: string;
        name: string;
        password: string;
        role: string;
        tel: string;
        __v: number;
        _id: string;
        totalPayment: number;
        totalPaymentThisYear: number;
      };
      exp: number;
      iat: number;
      jti: string;
      success: boolean;
      token: string;
    };
  }
}
