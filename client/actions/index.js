export const FETCH_GOOGLE = 'FETCH_GOOGLE'

export function fetchGoogle(google) {
	console.log("fetching")
	return{
		type:FETCH_GOOGLE,
		payload: google
	}
}
