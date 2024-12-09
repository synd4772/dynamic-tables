export function shiftCoordinates({
  maxEnd,
  coordinates,
  shift
}: ShiftCoordinatesProps): Coordinates {
  if (coordinates.start + shift < 0 ) {
    console.log("third")
    return {
      start: 0,
      end: coordinates.end
    }
  }

  if (coordinates.end + shift > maxEnd ) {
    console.log("second")
    return {
      start: coordinates.start,
      end: maxEnd
    }
  }
  console.log("first")
  return { 
    start: coordinates.start + shift,
    end: coordinates.end + shift
   };
}

interface ShiftCoordinatesProps {
  maxEnd: number,
  coordinates: Coordinates, 
  shift: number,
}

export type Coordinates = {
  start: number,
  end: number
}