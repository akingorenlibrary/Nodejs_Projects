const Auth=(tc)=>{
    const tcNew=tc.trim()
    const regexTc=/([0-9]{11})/g;
    return regexTc.test(tcNew);
}

export {Auth};