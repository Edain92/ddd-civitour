import { TourCapacity } from "../../value-objects/TourCapacity";

describe('ValueObject: TourCapacity', () => {
  it('Should create a valid TourCapacity object', () => {
    const result = TourCapacity.create(10);
    const tourCapacity = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(tourCapacity.value).toEqual(10);
  });

  it('Should fail to create a TourCapacity', () => {
    const result = TourCapacity.create(51);

    expect(result.isFailure).toBe(true);
  });
});
