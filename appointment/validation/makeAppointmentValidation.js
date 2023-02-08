const dateValidation=(date)=>{
    const errorArray=[];
    try{
        if(date=="" || date==null)
        throw {date:"Tarih hatalı"};
    }
    catch(error)
    {
        errorArray.push(error);
    }
    return errorArray;
}
export {dateValidation};