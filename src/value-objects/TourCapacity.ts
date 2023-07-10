import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";

interface TourCapacityProps {
  value: number;
}

export class TourCapacity extends ValueObject<TourCapacityProps> {
  private constructor(props: TourCapacityProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(capacity: number): Result<TourCapacity> {
    const nullGuardResult = Guard.againstNullOrUndefined(capacity, 'capacity');

    if (!nullGuardResult.succeeded) {
      return Result.fail<TourCapacity>(nullGuardResult.message);
    }

    const capacityGuardResult = TourCapacity.isValidCapacity(capacity);

    if (!capacityGuardResult.succeeded) {
      return Result.fail<TourCapacity>(capacityGuardResult.message);
    }

    return Result.ok<TourCapacity>(new TourCapacity({ value: capacity }))
  }

  private static isValidCapacity(capacity: number): IGuardResult {
    return Guard.inRange(capacity, 1, 50, 'capacity');
  }
}
