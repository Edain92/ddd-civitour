import { Title } from "../../modules/value-objects/Title";

describe('ValueObject: Title', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the title is empty', () => {
      const result = Title.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the title length is less than 3', () => {
      const result = Title.create('bb');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the title length is greater than 60', () => {
      const result = Title.create('b'.repeat(61));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the title length is within the valid range', () => {
      const result = Title.create('This is a title');
      expect(result.isSuccess).toBe(true);

      const title = result.getValue();
      expect(title.value).toBe('This is a title');
    });
  });

});
