export const checkAlphaNumeric = (val) => {
    let regex = /[^a-z0-9]/;
    if(regex.test(val)){
        return 'Name should be only letters and numbers'; 
    }
    return;
}