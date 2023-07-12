import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserNameProps {
  value: string;
}

export class UserName extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(name: string): Result<UserName> {
    const nullGuardResult = Guard.againstNullOrUndefined(name, 'name');

    if (!nullGuardResult.succeeded) {
      return Result.fail<UserName>(nullGuardResult.message);
    }

    const nameLengthGuardResult = Guard.inRange(name.length, 3, 25, 'name');

    if (!nameLengthGuardResult.succeeded) {
      return Result.fail<UserName>(nameLengthGuardResult.message);
    }

    return Result.ok<UserName>(new UserName({ value: name }))
  }
}
