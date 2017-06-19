import 'whatwg-fetch'
import 'es6-promise'

export function get(url) {
  var result = fetch(url, {
      credentials: 'include',//http方面的配置,回去看图解http
      headers: {
          'Accept': 'application/json, text/plain, */*'
      }
  });

  return result;
}
