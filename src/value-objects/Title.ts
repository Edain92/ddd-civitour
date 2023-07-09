import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TitleProps {
  value: string;
}

export class Title extends ValueObject<TitleProps> {
  private constructor(props: TitleProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(title: string): Result<Title> {
    const nullGuardResult = Guard.againstNullOrUndefined(title, 'title');

    if (!nullGuardResult.succeeded) {
      return Result.fail<Title>(nullGuardResult.message);
    }

    const titleLengthGuardResult = Guard.inRange(title.length, 3, 60, 'title');

    if (!titleLengthGuardResult.succeeded) {
      return Result.fail<Title>(titleLengthGuardResult.message);
    }

    return Result.ok<Title>(new Title({ value: title }))
  }
}
