

export const request = (path, opts = {})=> {
    const headers = Object.assign({},
                        opts.headers || {},
                        {'Content-Type': 'application/json',
                        'token': sessionStorage.getItem( 'authToken' ) || localStorage.getItem( 'authToken' ) || ''
                        }
                    );
    return fetch(
        path,
        Object.assign({ method: 'POST',}, opts,{headers}),
    ).then( result => {
      if( result.status === 401 ){
        sessionStorage.setItem( 'authToken' , 'missing' );
        //window.location.assign( '/' );
      }
      return result;
    } );
};
