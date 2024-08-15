import { NextResponse } from 'next/server'
export function middleware(request) {

  const cookie = request.cookies.get('token')
  const url = request.url
  
  if (!cookie && url === 'http://localhost:3000/boards/create'){
      return NextResponse.redirect('http://localhost:3000/boards/login')
  }
  
  if(!cookie && url === 'http://localhost:3000/boards/user/dashboard'){
    return NextResponse.redirect('http://localhost:3000/boards/login')
  }

  if(!cookie && url === 'http://localhost:3000/boards/favorites'){
    return NextResponse.redirect('http://localhost:3000/boards/login')
  }
  
  if(cookie && url === 'http://localhost:3000/boards/login'){
    return NextResponse.redirect('http://localhost:3000/boards/user/dashboard')
  }


}
