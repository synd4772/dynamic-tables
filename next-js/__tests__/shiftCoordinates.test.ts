import { shiftCoordinates } from "@/app/utils/shiftCoordinates";

describe('shiftCoordinates', () => {
  const data = [0,1,2,3,4,5,6,7,8,9,10];
  describe('when coordinates in the beginning', () => {
    let coordinates = {
      start: 0,
      end: 3
    }

    beforeEach(() => {
      // drop coordinates
      coordinates = {
        start: 0,
        end: 3
      }
    })

    it('should move right on 3 position', () => {
      const shift = 3;
      const newCoordinates = shiftCoordinates({ coordinates, shift, maxEnd: data.length});

      expect(newCoordinates).toMatchObject({
        start: 3,
        end: 6
       });
    });

    it('should set start to 0', () => {
      const shift = -3;
      const newCoordinates = shiftCoordinates({ coordinates: { ...coordinates, start: 1 }, shift, maxEnd: data.length});

      expect(newCoordinates).toMatchObject({
        start: 0,
        end: 3
       })
    });

    it('should NOT move left on 3 position', () => {
      const shift = -3;
      const newCoordinates = shiftCoordinates({ coordinates, shift, maxEnd: data.length});

      expect(newCoordinates).toMatchObject({
        start: 0,
        end: 3
       })
    });
  });

  describe('when coordinates in the end', () => {
    let coordinates = {
      start: 7,
      end: data.length
    }

    beforeEach(() => {
      // drop coordinates
      coordinates = {
        start: 7,
        end: data.length
      }
    })

    it('should NOT move right on 3 position', () => {
      const shift = 3;
      const newCoordinates = shiftCoordinates({ coordinates, shift, maxEnd: data.length});

      expect(newCoordinates).toMatchObject({
        start: 7,
        end: 11
       });
    });

    it('should add 1 to end position', () => {
      const shift = 3;
      const newCoordinates = shiftCoordinates({ coordinates: {...coordinates, end: 10 }, shift, maxEnd: data.length});

      expect(newCoordinates).toMatchObject({
        start: 7,
        end: 11
       });
    });

    it('should move left on 3 position', () => {
      const shift = -3;
      const newCoordinates = shiftCoordinates({ coordinates, shift, maxEnd: data.length});

      expect(newCoordinates).toMatchObject({
        start: 4,
        end: 8
       })
    });
  });
})