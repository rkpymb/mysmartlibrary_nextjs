import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Function to decode JWT and extract webid
function getWebidFromJwt(jwtToken) {

  try {
    const decoded = jwt.decode(jwtToken);

    return decoded
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Function to check user authentication via API call
async function checkUserAuthentication(request, webid) {
  // Retrieve the jwt_token from cookies
  const jwtToken = request.cookies.get('jwt_token');

  if (!jwtToken) {
    console.log('No jwt token');

    return { isValid: false, redirect: true };
  }

  // API endpoint for checking authentication
  const apiEndpoint = `${process.env.API_URL}Users/check_auth`;
  const requestBody = {
    token: process.env.MYKEY,
    webid: webid, // Assign the webid dynamically
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
export async function middleware(request) {
  // Extract current pathname
  const currentPathname = request.nextUrl.pathname;

  const indexOfFirstSlash = currentPathname.indexOf('/');

  let pathAfterFirstSlash = '';
  if (indexOfFirstSlash !== -1) {

    const indexOfNextSlash = currentPathname.indexOf('/', indexOfFirstSlash + 1);

    if (indexOfNextSlash !== -1) {
      pathAfterFirstSlash = currentPathname.substring(indexOfFirstSlash + 1, indexOfNextSlash);
    } else {

      pathAfterFirstSlash = currentPathname.substring(indexOfFirstSlash + 1);
    }
  }



  const requiresAuthPaths = ['/user', '/subscription-pass'];

  // Check if the path requires authentication
  if (requiresAuthPaths.some(path => currentPathname.includes(path))) {
    // Retrieve the jwt_token from cookies
    const jwtToken = request.cookies.get('jwt_token');

    if (!jwtToken) {

      return NextResponse.redirect(new URL(`/${pathAfterFirstSlash}/Login`, request.url));
    }

    const UserData = getWebidFromJwt(jwtToken);

    const webid = UserData.users.WebData.webid

    if (webid === pathAfterFirstSlash) {
      // Call the API to check user authentication
      const { response, isValid, redirect, data } = await checkUserAuthentication(request, pathAfterFirstSlash);

      if (isValid) {
        console.log('pathAfterFirstSlash matches User_Webid');

        return response;
      } else {
        console.log(`Redirecting to /${webid}/Login`);
        return NextResponse.redirect(new URL(`/${webid}/Login`, request.url));
      }
    }
  }

  return NextResponse.next();
}
