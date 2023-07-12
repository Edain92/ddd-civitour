import { Guide } from '../../modules/Guide/Guide';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { UserName } from '../../modules/value-objects/UserName';
import { UserPhone } from '../../modules/value-objects/UserPhone';

describe('Entity: Guide', () => {
  const id = new UniqueEntityID();

  const mockValidName = UserName.create('Pepito');
  const mockValidPhone = UserPhone.create('+34691184757');

  describe('Testing createGuide', () => {

    it('Should return a Result.fail when the name don\'t pass the validations', () => {
      const result: Result<Guide> = Guide.createGuide(
        {
          name: null,
          surname: 'Pérez',
          phone: mockValidPhone.getValue()
        }, id);
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the surname is empty', () => {
      const result: Result<Guide> = Guide.createGuide(
        {
          name: mockValidName.getValue(),
          surname: '',
          phone: mockValidPhone.getValue()
        }, id);

      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.fail when the phone don\'t pass the validations', () => {
      const result: Result<Guide> = Guide.createGuide(
        {
          name: mockValidName.getValue(),
          surname: 'Pérez',
          phone: null
        }, id);

      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when all properties are valid', () => {
      const result: Result<Guide> = Guide.createGuide(
        {
          name: mockValidName.getValue(),
          surname: 'Pérez',
          phone: mockValidPhone.getValue()
        }, id);

      expect(result.isSuccess).toBe(true);

      const client = result.getValue();

      expect(client.name.value).toBe('Pepito');
      expect(client.surname).toBe('Pérez');
      expect(client.phone.value).toBe('+34691184757');
    });
  });

});
