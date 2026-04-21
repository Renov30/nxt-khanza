"use server";

import { db } from "@/lib/db";

const SECRET_KEY = process.env.KHANZA_SECRET_KEY || 'windi';

export async function loginAction(formData: FormData) {
  const id_user = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!id_user || !password) {
    return { success: false, message: "Username and password are required" };
  }

  try {
    // Check in 'user' table which is standard for staff in Khanza
    const [rows]: any = await db.execute(
      `SELECT id_user, nama FROM user WHERE id_user = ? AND password = AES_ENCRYPT(?, ?)`,
      [id_user, password, SECRET_KEY]
    );

    if (rows.length > 0) {
      return {
        success: true,
        user: {
          id: rows[0].id_user,
          nama: rows[0].nama
        }
      };
    }

    // fallback check in 'admin' table
    const [adminRows]: any = await db.execute(
      `SELECT id_admin FROM admin WHERE id_admin = ? AND password = AES_ENCRYPT(?, ?)`,
      [id_user, password, SECRET_KEY]
    );

    if (adminRows.length > 0) {
      return {
        success: true,
        user: {
          id: adminRows[0].id_admin,
          nama: adminRows[0].id_admin // admin table usually only has ID
        }
      };
    }

    return { success: false, message: "Invalid username or password" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: "Database connection error" };
  }
}
