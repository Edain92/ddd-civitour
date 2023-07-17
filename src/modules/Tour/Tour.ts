import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Description } from "../value-objects/Description";
import { Title } from "../value-objects/Title";
import { TourCapacity } from "../value-objects/TourCapacity";
import { TourDate } from "../value-objects/TourDate";
import { City } from "../City/City";
import { GuideId } from "../Guide/GuideId";

export class Tour extends Entity<TourProps>  {
  private constructor(props: TourProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get title(): Title {
    return this.props.title;
  }

  get description(): Description {
    return this.props.description;
  }

  get date(): TourDate {
    return this.props.date;
  }

  get city(): City {
    return this.props.city;
  }

  get capacity(): TourCapacity {
    return this.props.capacity;
  }

  get guideId(): GuideId {
    return this.props.guideId;
  }

  public static createTour(props: TourProps, id?: UniqueEntityID): Result<Tour> {
    const userPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'title', argument: props.title },
      { argumentName: 'description', argument: props.description },
      { argumentName: 'date', argument: props.date },
      { argumentName: 'city', argument: props.city },
      { argumentName: 'capacity', argument: props.capacity },
      { argumentName: 'guideId', argument: props.guideId }
    ]);

    if (!userPropsResult.succeeded) {
      return Result.fail<Tour>(userPropsResult.message);
    }

    return Result.ok<Tour>(new Tour(props, id))
  }
}
