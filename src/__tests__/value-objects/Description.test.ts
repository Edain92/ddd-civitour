import { Description } from "../../value-objects/Description";

describe('ValueObject: Description', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the description is empty', () => {
      const result = Description.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the description length is less than 25', () => {
      const result = Description.create('cc');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the description length is greater than 250', () => {
      const result = Description.create('c'.repeat(251));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the description length is within the valid range', () => {
      const result = Description.create('This is a valid description');
      expect(result.isSuccess).toBe(true);

      const description = result.getValue();
      expect(description.value).toBe('This is a valid description');
    });
  });

});
