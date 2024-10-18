import { NextResponse } from 'next/server'
export function middleware(request) {

  const cookie = request.cookies.get('token')
  const url = request.nextUrl
  const pathname = url.pathname;
  
  if (!cookie && pathname === '/boards/create'){
      return NextResponse.redirect('https://praiseboard.vercel.app/boards/login')
  }
  
  if(!cookie && pathname === '/boards/user/dashboard'){
    return NextResponse.redirect('https://praiseboard.vercel.app/boards/login')
  }

  if(!cookie && pathname === '/boards/dashboard'){
    return NextResponse.redirect('https://praiseboard.vercel.app/boards/login')
  }

  if(!cookie && pathname === '/boards/favorites'){
    return NextResponse.redirect('https://praiseboard.vercel.app/boards/login')
  }
  
  if(cookie && pathname === '/boards/login'){
    return NextResponse.redirect('https://praiseboard.vercel.app/boards/user/dashboard')
  }

  return NextResponse.next();


}
