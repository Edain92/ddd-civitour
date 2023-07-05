
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";
import { ES_MOBILE_PATTERN } from "../globals/patterns";

interface UserPhoneProps {
  value: string;
}

export class UserPhone extends ValueObject<UserPhoneProps> {
  private constructor(props: UserPhoneProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(phone: string): Result<UserPhone> {
    const nullGuardResult = Guard.againstNullOrUndefined(phone, 'phone');

    if (!nullGuardResult.succeeded) {
      return Result.fail<UserPhone>(nullGuardResult.message);
    }

    const spanishPhoneGuardResult = UserPhone.isSpanishPhone(phone, ES_MOBILE_PATTERN);

    if (!spanishPhoneGuardResult.succeeded) {
      return Result.fail<UserPhone>(spanishPhoneGuardResult.message);
    }

    return Result.ok<UserPhone>(new UserPhone({ value: phone }))
  }

  private static isSpanishPhone(phone: string, pattern: string): IGuardResult {
    return Guard.validPattern(phone, pattern, 'phone');
  }
}

