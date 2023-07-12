import { City } from '../../modules/City';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';

describe('Entity: City', () => {
  const id = new UniqueEntityID();

  describe('Testing createCity', () => {
    it('Should return a Result.fail when the name is empty', () => {
      const result: Result<City> = City.createCity({ name: '', active: true }, id);
      expect(result.isFailure).toBe(true);
    });

    it('Should return a Result.ok when all properties are valid', () => {
      const result: Result<City> = City.createCity({ name: 'Florencia', active: true }, id);
      expect(result.isSuccess).toBe(true);

      const city = result.getValue();
      expect(city.name).toBe('Florencia');
      expect(city.isActive()).toBe(true);
    });
  });

  describe('Testing isActive', () => {
    it('Should return TRUE when the city is active', () => {
      const result = City.createCity({ name: 'Florencia', active: true }, id);
      const city = result.getValue();

      expect(city.isActive()).toBe(true);
    });

    it('Should return FALSE when the city is not active', () => {
      const result = City.createCity({ name: 'Florencia', active: false }, id);
      const city = result.getValue();

      expect(city.isActive()).toBe(false);
    });
  });

});
