import { ReviewScore } from "../../value-objects/ReviewScore";

describe('ValueObject: ReviewScore', () => {
  it('Should create a valid ReviewScore object', () => {
    const result = ReviewScore.create(4);
    const reviewScore = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(reviewScore.value).toEqual(4);
  });

  it('Should fail to create a ReviewScore', () => {
    const result = ReviewScore.create(6);

    expect(result.isFailure).toBe(true);
  });
});
