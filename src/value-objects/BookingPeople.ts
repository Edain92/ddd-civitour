import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";

interface BookingPeopleProps {
  value: number;
}

export class BookingPeople extends ValueObject<BookingPeopleProps> {
  private constructor(props: BookingPeopleProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(peopleInReserve: number, tourCapacity: number): Result<BookingPeople> {
    const nullGuardResult = Guard.againstNullOrUndefined(peopleInReserve, 'peopleInReserve');

    if (!nullGuardResult.succeeded) {
      return Result.fail<BookingPeople>(nullGuardResult.message);
    }

    const peopleInReserveGuardResult = BookingPeople.isValidPeopleInReserve(peopleInReserve, tourCapacity);

    if (!peopleInReserveGuardResult.succeeded) {
      return Result.fail<BookingPeople>(peopleInReserveGuardResult.message);
    }

    return Result.ok<BookingPeople>(new BookingPeople({ value: peopleInReserve }))
  }

  private static isValidPeopleInReserve(peopleInReserve: number, tourCapacity: number): IGuardResult {
    return Guard.inRange(peopleInReserve, 1, tourCapacity, 'peopleInReserve');
  }
}
