import { NextResponse, NextRequest } from 'next/server';

// Function to check user authentication via API call
async function checkUserAuthentication(request) {
  // Retrieve the jwt_token from cookies
  const jwtToken = request.cookies.get('jwt_token');

  if (!jwtToken) {
    console.log('No jwt token');
    // If jwt_token is not found, redirect to login and delete the cookie
    return { isValid: false, redirect: true, deleteCookie: true };
  }

  // API endpoint for checking authentication
  const apiEndpoint = `${process.env.API_URL}Users/check_auth`;
  const requestBody = {
    token: process.env.MYKEY,
  };

  try {
    // API request to validate the token
    const apiResponse = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      if (data && !data.error) {
        const response = NextResponse.next();
        return { response, data, isValid: true };
      } else {
        console.log(data.error);
      }
    }

    return { isValid: false, deleteCookie: true };
  } catch (error) {
    console.error('Error checking user authentication:', error);
    return { isValid: false, deleteCookie: true };
  }
}

// Middleware function
export async function middleware(request) {
  // Extract current pathname
  const currentPathname = request.nextUrl.pathname;

  // Find the index of the first "/"
  const indexOfFirstSlash = currentPathname.indexOf('/');

  // Extract the portion of the path after the first "/" if it exists
  let pathAfterFirstSlash = '';
  if (indexOfFirstSlash !== -1) {
    // Find the index of the next "/" after the first "/"
    const indexOfNextSlash = currentPathname.indexOf('/', indexOfFirstSlash + 1);

    // Extract the portion of the path between the first "/" and the next "/"
    if (indexOfNextSlash !== -1) {
      pathAfterFirstSlash = currentPathname.substring(indexOfFirstSlash + 1, indexOfNextSlash);
    } else {
      // If there's no next "/", extract the portion of the path after the first "/"
      pathAfterFirstSlash = currentPathname.substring(indexOfFirstSlash + 1);
    }
  }

  const requiresAuthPaths = ['/user', '/subscription-pass'];

  if (requiresAuthPaths.some(path => currentPathname.includes(path))) {
    const { response, isValid, redirect, data, deleteCookie } = await checkUserAuthentication(request);

    if (deleteCookie) {
      const newResponse = NextResponse.redirect(new URL(`/${pathAfterFirstSlash}/Login`, request.url));
      newResponse.cookies.delete('jwt_token');
      return newResponse;
    }

    if (redirect) {
      const newResponse = NextResponse.redirect(new URL(`/${pathAfterFirstSlash}/Login`, request.url));
      newResponse.cookies.delete('jwt_token');
      return newResponse;
    }

    if (isValid && data.UserData.WebData.webid === pathAfterFirstSlash) {
      console.log('pathAfterFirstSlash');
      console.log(data);
      return response;
    } else {
      const newResponse = NextResponse.redirect(new URL(`/${pathAfterFirstSlash}/Login`, request.url));
      newResponse.cookies.delete('jwt_token');
      return newResponse;
    }
  }

  return NextResponse.next();
}
