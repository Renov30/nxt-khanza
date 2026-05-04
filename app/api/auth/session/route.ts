import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("user_session");

  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const userData = JSON.parse(sessionCookie.value);
    return NextResponse.json({
      isLoggedIn: true,
      user: userData,
    });
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false });
  }
}
