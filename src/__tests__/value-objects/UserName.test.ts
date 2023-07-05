import { UserName } from '../../value-objects/UserName';

describe('ValueObject: UserName', () => {
  describe('Testing create', () => {
    it('Should return a Result.fail when the name is empty', () => {
      const result = UserName.create('');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the name length is less than 3', () => {
      const result = UserName.create('aa');
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the name length is greater than 25', () => {
      const result = UserName.create('a'.repeat(26));
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when the name length is within the valid range', () => {
      const result = UserName.create('Pepito');
      expect(result.isSuccess).toBe(true);

      const userName = result.getValue();
      expect(userName.value).toBe('Pepito');
    });
  });

});
