import { NextResponse } from 'next/server'
export function middleware(request) {

  const cookie = request.cookies.get('token')
  const url = request.url
  
  if (!cookie && url === 'https://praiseboard.vercel.app/boards/create'){
      return NextResponse.redirect('https://praiseboard.vercel.app/boards/login')
  }
  
  if(!cookie && url === 'https://praiseboard.vercel.app/boards/user/dashboard'){
    return NextResponse.redirect('https://praiseboard.vercel.app/boards/login')
  }

  if(!cookie && url === 'https://praiseboard.vercel.app/boards/favorites'){
    return NextResponse.redirect('https://praiseboard.vercel.app/boards/login')
  }
  
  if(cookie && url === 'https://praiseboard.vercel.app/boards/login'){
    return NextResponse.redirect('https://praiseboard.vercel.app/boards/user/dashboard')
  }


}
