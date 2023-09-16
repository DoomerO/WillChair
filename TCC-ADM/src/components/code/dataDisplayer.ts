function dateDisplayer(date : string) {
    const val = date.split('T');
    const display = val[0].split('-')
    return `${display[2]}/${display[1]}/${display[0]}`;
}

export default dateDisplayer;