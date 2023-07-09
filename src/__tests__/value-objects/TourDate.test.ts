import { TourDate } from "../../value-objects/TourDate";

describe('ValueObject: TourDate', () => {
  const validTourDate: Date = new Date('2023-12-31');
  const invalidTourDate: Date = new Date('2022-12-31');

  it('Should create a valid TourDate object for a valid date provided', () => {
    const result = TourDate.create(validTourDate);
    const tourDate = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(tourDate.value).toEqual(validTourDate);
  });

  it('Should fail to create a TourDate object for a invalid date provided', () => {
    const result = TourDate.create(invalidTourDate);

    expect(result.isFailure).toBe(true);
  });
});
