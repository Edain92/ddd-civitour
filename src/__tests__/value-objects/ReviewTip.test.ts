import { ReviewTip } from "../../value-objects/ReviewTip";

describe('ValueObject: ReviewTip', () => {
  it('Should create a valid ReviewTip object', () => {
    const result = ReviewTip.create(50);
    const tourCapacity = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(tourCapacity.value).toEqual(50);
  });

  it('Should fail to create a ReviewTip', () => {
    const result = ReviewTip.create(301);

    expect(result.isFailure).toBe(true);
  });
});
