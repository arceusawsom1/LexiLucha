const prettyDate = (millis : number) => {
    let dateData = new Date(millis)
    let date = dateData.getDate()
    // let monthString = dateData.toLocaleString('default', { month: 'long' });
    let month = dateData.getMonth() + 1
    let year = dateData.getFullYear();
    return date + "-" + month + "-" + year
}
export { prettyDate }