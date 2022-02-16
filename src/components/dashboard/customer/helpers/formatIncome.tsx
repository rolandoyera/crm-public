export default function formatIncome(x) {
    if (undefined || "") {
        return x
    } else {
        return x?.toString().replace(/\B(\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
}
