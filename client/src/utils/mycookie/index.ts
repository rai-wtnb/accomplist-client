import { parseCookies } from 'nookies';
import { NextPageContext } from 'next';

export const divideCookie = () => {
  const result = new Array();
  var allcookies = document.cookie;
  if (allcookies != '') {
    const cookies = allcookies.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      result[cookie[0]] = decodeURIComponent(cookie[1]);
    }
  }
  return result;
}

export const setCookies = (userID: string, sessionID: string) => {
  document.cookie = `userID=${userID}; max-age=86400 secure;`;
  document.cookie = `sessionID=${sessionID}; max-age=86400 secure;`;
}

export const getSessionCookie = (ctx?: NextPageContext) => {
  const cookie = parseCookies(ctx).sessionID;
  return cookie;
}
