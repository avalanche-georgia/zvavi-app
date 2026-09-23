// 5 decimal places ≈ 1.1m — well beyond typical GPS accuracy, so anything
// past this is meaningless precision rather than a real measurement.
const coordinateDecimalPlaces = 5

const roundCoordinate = (value: number): number => {
  const factor = 10 ** coordinateDecimalPlaces

  return Math.round(value * factor) / factor
}

export default roundCoordinate
