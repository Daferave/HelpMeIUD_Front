export const InfoUsers = {

    roleExiste(role) {
        if(sessionStorage.getItem('user') != null){
            const _token = JSON.parse(sessionStorage.getItem('user'));
            
            if(_token){
                if(_token.user){
                    const token = _token.user.access_token;
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    const existe = payload.authorities.includes(role);
                    return existe;
                }
                return false;
            }
            return false;
        }
        return false;
    },
};