import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repository } from "../../core/infra/Repository";
import { City } from "../../modules/City/City";
import { GuideId } from "../../modules/Guide/GuideId";
import { Tour } from "../../modules/Tour/Tour";
import { CreateTourUseCase } from "../../modules/Tour/useCases/createTour/createTourUseCase";
import { Description } from "../../modules/value-objects/Description";
import { Title } from "../../modules/value-objects/Title";
import { TourCapacity } from "../../modules/value-objects/TourCapacity";
import { TourDate } from "../../modules/value-objects/TourDate";

describe('CreateTourUseCase', () => {
  let cityRepo: jest.Mocked<Repository<City>>;
  let tourRepo: jest.Mocked<Repository<Tour>>;
  let useCase: CreateTourUseCase;

  beforeEach(() => {
    cityRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      exists: jest.fn()
    };

    tourRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      exists: jest.fn()
    };

    useCase = new CreateTourUseCase(tourRepo, cityRepo);
  });

  it('creates a tour', async () => {
    const mockRequest = {
      title: 'Test Tour',
      description: 'Test Description: lallalallalausudhiajia',
      date: new Date('2023-08-20'),
      cityNameOrId: 'Test City',
      capacity: 10,
      guideId: '123'
    };

    const city = City.createCity({
      name: mockRequest.cityNameOrId,
      active: true
    }).getValue();

    const tourOrError = Tour.createTour({
      title: Title.create(mockRequest.title).getValue(),
      description: Description.create(mockRequest.description).getValue(),
      date: TourDate.create(mockRequest.date).getValue(),
      city: city,
      capacity: TourCapacity.create(mockRequest.capacity).getValue(),
      guideId: GuideId.create(new UniqueEntityID(mockRequest.guideId)),
    });

    const tour = tourOrError.getValue();
    const result = await useCase.execute(mockRequest);

    expect(result.isSuccess).toBe(true);
    // TODO: expect(tourRepo.save).toBeCalledWith(tour);
  });
});
