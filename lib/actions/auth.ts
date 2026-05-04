"use server";

import { db } from "@/lib/db";

/**
 * Login action matching Khanza's encryption logic:
 * - Username key: 'nur'
 * - Password key: 'windi'
 */
export async function loginAction(formData: FormData) {
  const id_user = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!id_user || !password) {
    return { success: false, message: "Username and password are required" };
  }

  try {
    // 1. Check in 'user' table (Petugas/Staff)
    // id_user uses key 'nur', password uses key 'windi'
    const [rows]: any = await db.execute(
      `SELECT * FROM user WHERE id_user = AES_ENCRYPT(?, 'nur') AND password = AES_ENCRYPT(?, 'windi')`,
      [id_user, password]
    );

    if (rows.length > 0) {
      return {
        success: true,
        user: {
          id: id_user,
          role: 'user'
        }
      };
    }

    // 2. Fallback check in 'admin' table
    const [adminRows]: any = await db.execute(
      `SELECT * FROM admin WHERE usere = AES_ENCRYPT(?, 'nur') AND passworde = AES_ENCRYPT(?, 'windi')`,
      [id_user, password]
    );

    if (adminRows.length > 0) {
      return {
        success: true,
        user: {
          id: id_user,
          role: 'admin'
        }
      };
    }

    return { success: false, message: "ID User atau Password salah" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: "Kesalahan koneksi database" };
  }
}
