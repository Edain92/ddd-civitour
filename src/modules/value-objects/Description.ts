import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  private constructor(props: DescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(description: string): Result<Description> {
    const nullGuardResult = Guard.againstNullOrUndefined(description, 'description');

    if (!nullGuardResult.succeeded) {
      return Result.fail<Description>(nullGuardResult.message);
    }

    const descriptionLengthGuardResult = Guard.inRange(description.length, 25, 250, 'description');

    if (!descriptionLengthGuardResult.succeeded) {
      return Result.fail<Description>(descriptionLengthGuardResult.message);
    }

    return Result.ok<Description>(new Description({ value: description }))
  }
}
