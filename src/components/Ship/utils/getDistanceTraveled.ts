const metersToAU = 1 / 149597870700; // Conversion factor from meters to AU
const randomNumber = 100_000_000;

interface Params {
	prevDistance: number;
	travelSpeed: number;
	delta: number;
}

export function getDistanceTraveled({ prevDistance, travelSpeed, delta }: Params) {
	const distanceInMeters = travelSpeed * delta * randomNumber;
	const distanceInAU = distanceInMeters * metersToAU;
	return prevDistance + distanceInAU;
}
