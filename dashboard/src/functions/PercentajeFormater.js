function percentajeFormater(value){
    let increasedValue = value*100;
    const roundedValue = Math.round(increasedValue * 10) / 10;
    const formattedValue = increasedValue !== roundedValue ? increasedValue.toFixed(1) : increasedValue.toFixed(0);
    return formattedValue
}

export default percentajeFormater;