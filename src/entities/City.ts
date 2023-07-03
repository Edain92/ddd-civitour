import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface CityProps {
  name: string
  active: boolean
}

export class City extends Entity<CityProps> {
  private constructor(props: CityProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name;
  }

  public isActive(): boolean {
    return this.props.active;
  }

  public static createCity(props: CityProps, id?: UniqueEntityID): Result<City> {
    const userPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'name', argument: props.name },
      { argumentName: 'active', argument: props.active }
    ]);

    if (!userPropsResult.succeeded) {
      return Result.fail<City>(userPropsResult.message);
    }

    return Result.ok<City>(new City(props, id))
  }
}
