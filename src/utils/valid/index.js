const valid = {
    password: (value)=>{
        return value.length >= 6;
    },
    email: (email)=>{
        let user = email.substring(0, email.indexOf("@"));
        
        let domain = email.substring(email.indexOf("@")+ 1, email.length);

        return ((user.length >=1) &&
            (domain.length >=3) &&
            (user.search("@")==-1) &&
            (domain.search("@")==-1) &&
            (user.search(" ")==-1) &&
            (domain.search(" ")==-1) &&
            (domain.search(".")!=-1) &&
            (domain.indexOf(".") >=1)&&
            (domain.lastIndexOf(".") < domain.length - 1));
    }
}

module.exports = valid;