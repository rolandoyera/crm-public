export default function StringToBoolean(string) {
    switch (string) {
        case "true":
        case "True":
        case "yes":
        case "Yes":
        case "1":
            return true;
        case "false":
        case "False":
        case "no":
        case "No":
        case "0":
        case null:
            return false;
        default:
            return Boolean(string);
    }
}
