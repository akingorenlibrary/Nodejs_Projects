const registerFormValidation=(username,email,password)=>{
    const errorMessage=[];
    const usernameRegex=/([^\w._])/g;
    const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    try{
        if(username=="")
        throw {username:"Username'i boş bırakmayınız"};

        if(email=="")
        throw {email:"Email'i Boş bırakmayınız"};

        if(password=="")
        throw {password:"Password'u Boş bırakmayınız"};

        if(usernameRegex.test(username))
        throw {username:"Username özel karakter içermemelidir."};

        if(!(emailRegex.test(email)))
        throw {email:"Hatalı email girişi."};
    }
    catch(error)
    {
        errorMessage.push(error);
    }
    return errorMessage;
}

export {registerFormValidation};