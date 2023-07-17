import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { UseCase } from "../../../../core/domain/UseCase";
import { Repository } from "../../../../core/infra/Repository";
import { Result } from "../../../../core/logic/Result";
import { TextUtil } from "../../../../utils/TextUtil";
import { City } from "../../../City/City";
import { GuideId } from "../../../Guide/GuideId";
import { Description } from "../../../value-objects/Description";
import { Title } from "../../../value-objects/Title";
import { TourCapacity } from "../../../value-objects/TourCapacity";
import { TourDate } from "../../../value-objects/TourDate";
import { Tour } from "../../Tour";

interface CreateTourUseCaseRequestDTO {
  title: string
  description: string
  date: Date
  cityNameOrId: string
  capacity: number
  guideId: string
}

export class CreateTourUseCase implements UseCase<CreateTourUseCaseRequestDTO, Result<Tour>> {
  private tourRepo: Repository<Tour>;
  private cityRepo: Repository<City>;

  constructor(tourRepo: Repository<Tour>, cityRepo: Repository<City>) {
    this.tourRepo = tourRepo
    this.cityRepo = cityRepo
  }

  private async getCity(request: CreateTourUseCaseRequestDTO): Promise<Result<City>> {
    const { cityNameOrId } = request;
    const isCityIdProvided = TextUtil.isUUID(cityNameOrId);

    if (!isCityIdProvided) {
      return City.createCity({
        name: cityNameOrId,
        active: true
      })
    }

    const city = await this.cityRepo.findById(cityNameOrId);
    const found = !!city;

    if (!found) {
      return Result.fail<City>(`Couldn't find city by id=${cityNameOrId}`);
    }

    return Result.ok<City>(city);
  }

  public async execute(request: CreateTourUseCaseRequestDTO): Promise<Result<Tour>> {
    const { title, description, date, capacity, guideId } = request;

    let city: City;

    try {
      const cityOrError = await this.getCity(request);
      if (cityOrError.isFailure) {
        return Result.fail<Tour>(cityOrError.error);
      } else {
        city = cityOrError.getValue();
      }

      const tourOrError = Tour.createTour({
        title: Title.create(title).getValue(),
        description: Description.create(description).getValue(),
        date: TourDate.create(date).getValue(),
        city: city,
        capacity: TourCapacity.create(capacity).getValue(),
        guideId: GuideId.create(new UniqueEntityID(guideId)),
      });

      if (tourOrError.isFailure) {
        return Result.fail<Tour>(tourOrError.error)
      }

      const tour = tourOrError.getValue();

      await this.tourRepo.save(tour);

      return Result.ok<Tour>(tour)
    } catch (err) {
      console.log(err);
      return Result.fail<Tour>(err);
    }
  }
}