export const units = [
  // Weight
  { label: 'Kilograms', shortLabel: 'kg', value: 'kg', category: 'weight' },
  { label: 'Grams', shortLabel: 'g', value: 'g', category: 'weight' },
  { label: 'Pounds', shortLabel: 'lb', value: 'lb', category: 'weight' },
  { label: 'Ounces', shortLabel: 'oz', value: 'oz', category: 'weight' },

  // Distance / Length
  { label: 'Kilometers', shortLabel: 'km', value: 'km', category: 'distance' },
  { label: 'Meters', shortLabel: 'm', value: 'm', category: 'distance' },
  { label: 'Centimeters', shortLabel: 'cm', value: 'cm', category: 'distance' },
  { label: 'Millimeters', shortLabel: 'mm', value: 'mm', category: 'distance' },
  { label: 'Miles', shortLabel: 'mi', value: 'mi', category: 'distance' },
  { label: 'Yards', shortLabel: 'yd', value: 'yd', category: 'distance' },
  { label: 'Feet', shortLabel: 'ft', value: 'ft', category: 'distance' },
  { label: 'Inches', shortLabel: 'in', value: 'in', category: 'distance' },
  { label: 'Steps', shortLabel: 'steps', value: 'steps', category: 'distance' },

  // Time
  { label: 'Hours', shortLabel: 'h', value: 'h', category: 'time' },
  { label: 'Minutes', shortLabel: 'min', value: 'min', category: 'time' },
  { label: 'Seconds', shortLabel: 's', value: 's', category: 'time' },
  { label: 'Milliseconds', shortLabel: 'ms', value: 'ms', category: 'time' },

  // Volume
  { label: 'Liters', shortLabel: 'L', value: 'l', category: 'volume' },
  { label: 'Milliliters', shortLabel: 'ml', value: 'ml', category: 'volume' },
  { label: 'Cups', shortLabel: 'cups', value: 'cups', category: 'volume' },
  { label: 'Fluid Ounces', shortLabel: 'fl oz', value: 'fl_oz', category: 'volume' },
  { label: 'Tablespoons', shortLabel: 'tbsp', value: 'tbsp', category: 'volume' },
  { label: 'Teaspoons', shortLabel: 'tsp', value: 'tsp', category: 'volume' },

  // Energy
  { label: 'Calories', shortLabel: 'kcal', value: 'kcal', category: 'energy' },
  { label: 'Kilojoules', shortLabel: 'kJ', value: 'kj', category: 'energy' },

  // Performance
  { label: 'Repetitions', shortLabel: 'reps', value: 'reps', category: 'performance' },
  { label: 'Sets', shortLabel: 'sets', value: 'sets', category: 'performance' },
  { label: 'Rounds', shortLabel: 'rounds', value: 'rounds', category: 'performance' },
  { label: 'Tasks', shortLabel: 'tasks', value: 'tasks', category: 'performance' },
  { label: 'Points', shortLabel: 'pts', value: 'points', category: 'performance' },
  { label: 'Score', shortLabel: 'score', value: 'score', category: 'performance' },

  // Health
  { label: 'Heart Rate (BPM)', shortLabel: 'bpm', value: 'bpm', category: 'health' },
  { label: 'Blood Pressure (mmHg)', shortLabel: 'mmHg', value: 'mmHg', category: 'health' },
  { label: 'Breaths', shortLabel: 'breaths', value: 'breaths', category: 'health' },

  // Power & Speed
  { label: 'Watts', shortLabel: 'W', value: 'w', category: 'power' },
  { label: 'Speed (km/h)', shortLabel: 'km/h', value: 'kmh', category: 'speed' },
  { label: 'Speed (mph)', shortLabel: 'mph', value: 'mph', category: 'speed' },
  { label: 'Pace (min/km)', shortLabel: 'min/km', value: 'min_per_km', category: 'speed' },
  { label: 'Pace (min/mile)', shortLabel: 'min/mi', value: 'min_per_mile', category: 'speed' },

  // Misc
  { label: 'Items', shortLabel: 'items', value: 'items', category: 'count' },
  { label: 'Sessions', shortLabel: 'sessions', value: 'sessions', category: 'count' },
  { label: 'Attempts', shortLabel: 'attempts', value: 'attempts', category: 'count' },

];



// Volume conversions

export const litersToMilliliters = (l) => l * 1000;
export const millilitersToLiters = (ml) => ml / 1000;

export const cupsToMilliliters = (cups) => cups * 240;
export const millilitersToCups = (ml) => ml / 240;

// Weight Conversions

export const kilogramsToGrams = (kg) => kg * 1000;
export const gramsToKilograms = (g) => g / 1000;

export const kilogramsToPounds = (kg) => kg * 2.20462;
export const poundsToKilograms = (lb) => lb / 2.20462;

export const gramsToOunces = (g) => g / 28.3495;
export const ouncesToGrams = (oz) => oz * 28.3495;

// Distance Conversions

export const kilometersToMeters = (km) => km * 1000;
export const metersToKilometers = (m) => m / 1000;

export const metersToCentimeters = (m) => m * 100;
export const centimetersToMeters = (cm) => cm / 100;

export const milesToKilometers = (mi) => mi * 1.60934;
export const kilometersToMiles = (km) => km / 1.60934;

export const feetToMeters = (ft) => ft * 0.3048;
export const metersToFeet = (m) => m / 0.3048;


// Time Conversions

export const hoursToMinutes = (h) => h * 60;
export const minutesToHours = (min) => min / 60;

export const minutesToSeconds = (min) => min * 60;
export const secondsToMinutes = (s) => s / 60;

export const hoursToSeconds = (h) => h * 3600;
export const secondsToHours = (s) => s / 3600;

