const auth=(tc)=>{
    const errorList=[];
    const tcRegex=/([^0-9])/g;
    try{
        if(tc==null || tc.trim().length==0 || tc=="")
        throw {tc:"TC boş bırakılamaz"}

        if(tc.length != 11)
        throw {tc:"TC hatalı"}

        if(tcRegex.test(tc))
        throw {tc:"TC hatalı"}

    }
    catch(error)
    {
        errorList.push(error);
    }
    return errorList;
}
export {auth};