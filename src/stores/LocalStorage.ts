const SaveToLocal = (key: string, item: any) => {
    localStorage.setItem(key, item);
}
const GetFromLocal = (key: string) => {
    return localStorage.getItem(key);
}
const GetDataFromLocal = (key: string) => {
    const  info = GetFromLocal(key);
    if (info !== null ){
        return JSON.parse(info!);
    } 
}
const CheckIfLocalEmpty = () => {
    const wallet = GetFromLocal("wallet");
    console.log(wallet);
    if (wallet !== null ){
        return false;
    } 
    return true;
}
const GetFullFromLocal = () => {
    const items = { ...localStorage };
    console.log(items);
}

export { SaveToLocal, GetFromLocal, CheckIfLocalEmpty, GetFullFromLocal, GetDataFromLocal }