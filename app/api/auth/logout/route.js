import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  
  // Get all cookies
  const allCookies = cookieStore.getAll();
  
  // Delete each cookie with proper options
  allCookies.forEach(cookie => {
    cookieStore.set(cookie.name, '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      sameSite: 'lax'
    });
  });

  console.log('All cookies cleared:', allCookies.length);

  return NextResponse.json({ 
    success: true, 
    clearedCount: allCookies.length 
  });
}