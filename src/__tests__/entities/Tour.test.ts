
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Title } from '../../value-objects/Title';
import { Description } from '../../value-objects/Description';
import { City } from '../../entities/City';
import { TourDate } from '../../value-objects/TourDate';
import { TourCapacity } from '../../value-objects/TourCapacity';
import { Guide } from '../../entities/Guide';
import { UserName } from '../../value-objects/UserName';
import { UserPhone } from '../../value-objects/UserPhone';
import { Tour } from '../../entities/Tour';

describe('Entity: Tour', () => {
  const tourId = new UniqueEntityID();

  const now = new Date('2023-10-12')
  const guideName = UserName.create('Laura')
  const guidePhone = UserPhone.create('+34691184757')

  const mockValidTitle = Title.create('This is a tour');
  const mockValidDescription = Description.create('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies turpis eget nisi semper tincidunt. Cras posuere congue nibh nec posuere.');
  const mockValidDate = TourDate.create(now);
  const mockValidCity = City.createCity({ name: 'Barcelona', active: true }, new UniqueEntityID());
  const mockValidCapacity = TourCapacity.create(20);
  const mockValidGuide = Guide.createGuide(
    {
      name: guideName.getValue(),
      surname: 'Garcia',
      phone: guidePhone.getValue()
    }, new UniqueEntityID());

  describe('Testing createTour', () => {
    it('Should return a Result.ok when all properties are valid', () => {
      const result: Result<Tour> = Tour.createTour(
        {
          title: mockValidTitle.getValue(),
          description: mockValidDescription.getValue(),
          date: mockValidDate.getValue(),
          city: mockValidCity.getValue(),
          capacity: mockValidCapacity.getValue(),
          guide: mockValidGuide.getValue()
        }, tourId);

      expect(result.isSuccess).toBe(true);

      const tour = result.getValue();

      expect(tour.title.value).toBe('This is a tour');
      expect(tour.description.value).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies turpis eget nisi semper tincidunt. Cras posuere congue nibh nec posuere.');
      expect(tour.date.value).toBe(now);
      expect(tour.city.name).toBe('Barcelona');
      expect(tour.capacity.value).toBe(20);
      expect(tour.guide.name.value).toBe('Laura');
    });
  });

});
