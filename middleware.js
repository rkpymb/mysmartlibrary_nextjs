import { NextResponse, NextRequest } from 'next/server';

// Function to check user authentication via API call
async function checkUserAuthentication(request) {
  // Retrieve the jwt_token from cookies
  const jwtToken = request.cookies.get('jwt_token');

  if (!jwtToken) {
    console.log('No jwt token');
    // If jwt_token is not found, redirect to login
    return { isValid: false, redirect: true };
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
        // response.cookies.set('user_data', JSON.stringify(data), {
        //   httpOnly: true,
        //   secure: request.url.startsWith('https'),
        //   sameSite: 'lax',
        //   maxAge: 86400, // Cookie expiry set to 1 day (86400 seconds)
        // });

        return { response, data, isValid: true };
      } else {
        console.log(data.error);
      }
    }


    return { isValid: false };

  } catch (error) {
    console.error('Error checking user authentication:', error);
    return { isValid: false };
  }
}

// Middleware function
// Middleware function
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

  const requiresAuthPaths = ['/user'];

  if (requiresAuthPaths.some(path => currentPathname.includes(path))) {
    const { response, isValid, redirect } = await checkUserAuthentication(request);

    if (redirect) {
      
       console.log(pathAfterFirstSlash);
      return NextResponse.redirect(new URL(`/${pathAfterFirstSlash}/Login`, request.url));
    }

    if (isValid) {
     
      return response;
    }
  }

  return NextResponse.next();
}

