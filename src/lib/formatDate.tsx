export const formatDate = (str) => {
    let cleaned = ("" + str).replace(/\D/g, "")
    let match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/)
    if (match) {
        return match[1] + "-" + match[2] + "-" + match[3]
    }
    return str
}
