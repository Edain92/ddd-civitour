import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { UserName } from "../value-objects/UserName";
import { UserPhone } from "../value-objects/UserPhone";

export class Guide extends Entity<User>  {
  private constructor(props: User, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): UserName {
    return this.props.name;
  }

  get surname(): string {
    return this.props.surname;
  }

  get phone(): UserPhone {
    return this.props.phone;
  }

  public static createGuide(props: User, id?: UniqueEntityID): Result<Guide> {
    const guideResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'name', argument: props.name },
      { argumentName: 'surname', argument: props.surname },
      { argumentName: 'phone', argument: props.phone }
    ]);

    if (!guideResult.succeeded) {
      return Result.fail<Guide>(guideResult.message);
    }

    return Result.ok<Guide>(new Guide(props, id))
  }
}
