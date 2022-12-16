// Format a number to Belarussian number format

export const numberFormat = (number: string) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}