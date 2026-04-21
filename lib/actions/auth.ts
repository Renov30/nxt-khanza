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
    // 1. Check in 'user' table (joining with 'petugas' for the name)
    const [rows]: any = await db.execute(
      `SELECT u.id_user, p.nama 
       FROM user u 
       INNER JOIN petugas p ON u.id_user = p.nip 
       WHERE u.id_user = ? AND u.password = AES_ENCRYPT(?, ?)`,
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

    // 2. Check in 'admin' table (using usere and passworde columns as seen in sik_ori.sql)
    const [adminRows]: any = await db.execute(
      `SELECT usere FROM admin WHERE usere = AES_ENCRYPT(?, ?) AND passworde = AES_ENCRYPT(?, ?)`,
      [id_user, SECRET_KEY, password, SECRET_KEY]
    );

    if (adminRows.length > 0) {
      return { 
        success: true, 
        user: { 
          id: id_user, 
          nama: 'Admin System' 
        } 
      };
    }

    return { success: false, message: "Invalid username or password" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: "Database connection error or Invalid Schema" };
  }
}
