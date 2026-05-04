import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // 1. Try to login as Admin Utama
    // Khanza uses AES_ENCRYPT(?, 'nur') for username and AES_ENCRYPT(?, 'windi') for password
    const adminQuery = `
      SELECT * FROM admin 
      WHERE usere = AES_ENCRYPT(?, 'nur') 
      AND passworde = AES_ENCRYPT(?, 'windi')
    `;
    
    const admins = await query<any[]>(adminQuery, [username, password]);

    if (admins.length > 0) {
      // Set session cookie
      const cookieStore = await cookies();
      cookieStore.set('user_session', JSON.stringify({
        username: 'Admin Utama',
        role: 'admin',
        id: username
      }), { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 // 1 day
      });

      return NextResponse.json({ 
        message: 'Login successful', 
        user: { username: 'Admin Utama', role: 'admin' } 
      });
    }

    // 2. Try to login as regular User
    const userQuery = `
      SELECT * FROM user 
      INNER JOIN petugas ON user.id_user = AES_ENCRYPT(petugas.nip, 'nur')
      WHERE user.id_user = AES_ENCRYPT(?, 'nur') 
      AND user.password = AES_ENCRYPT(?, 'windi')
    `;
    
    // Note: SIMRS Khanza sometimes has complex logic for 'user' table joining with 'petugas' or 'pegawai'.
    // Let's check the basic user query first.
    const userQueryBasic = `
      SELECT * FROM user 
      WHERE id_user = AES_ENCRYPT(?, 'nur') 
      AND password = AES_ENCRYPT(?, 'windi')
    `;

    const users = await query<any[]>(userQueryBasic, [username, password]);

    if (users.length > 0) {
      // Get detail from petugas/pegawai if needed
      const userData = users[0];
      
      const cookieStore = await cookies();
      cookieStore.set('user_session', JSON.stringify({
        username: username,
        role: 'user',
        id: username
      }), { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 
      });

      return NextResponse.json({ 
        message: 'Login successful', 
        user: { username: username, role: 'user' } 
      });
    }

    return NextResponse.json(
      { message: 'ID User atau Password salah' },
      { status: 401 }
    );

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
