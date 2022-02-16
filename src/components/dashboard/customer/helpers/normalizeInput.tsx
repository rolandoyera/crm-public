export function normalizeInput(value) {
	// if input value is falsy eg if the user deletes the input, then just return
	if (!value) return value

	// clean the input for any non-digit values.
	const normalize = value.replace(/[^\d]/g, '')

	// phoneNumberLength is used to know when to apply our formatting for the phone number
	const normalizeLength = normalize.length

	// we need to return the value with no formatting if its less then four digits
	// this is to avoid weird behavior that occurs if you  format the area code to early
	if (normalizeLength < 4) return normalize

	// if phoneNumberLength is greater than 4 and less the 7 we start to return
	// the formatted number
	if (normalizeLength < 5) {
		return `${normalize.slice(0, 3)}-${normalize.slice(3)}`
	}

	// finally, if the phoneNumberLength is greater then seven, we add the last
	// bit of formatting and return it.
	return `${normalize.slice(0, 3)}-${normalize.slice(3, 5)}-${normalize.slice(
		5,
		9
	)}`
}
