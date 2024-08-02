import { NextResponse } from 'next/server'
export function middleware(request) {
    

  const cookie = request.cookies.get('token');
  const url = request.url;
  
  if (!cookie && url.includes('/boards/create') || url.includes('/boards/user/dashboard')){
    return NextResponse.redirect('http://localhost:3000/boards/login')
  }
  
  if(cookie && url === "http://localhost:3000/boards/login"){
    return NextResponse.redirect('http://localhost:3000/boards/create')
  }
}
