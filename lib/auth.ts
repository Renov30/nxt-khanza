import { cookies } from 'next/headers';

export interface UserSession {
  username: string;
  role: 'admin' | 'user';
  id: string;
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('user_session');
    
    if (!session || !session.value) {
      return null;
    }

    return JSON.parse(session.value) as UserSession;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('user_session');
}
