import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";

interface TourDateProps {
  value: Date;
}

export class TourDate extends ValueObject<TourDateProps> {
  private constructor(props: TourDateProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }

  public static create(date: Date): Result<TourDate> {
    const nullGuardResult = Guard.againstNullOrUndefined(date, 'date');

    if (!nullGuardResult.succeeded) {
      return Result.fail<TourDate>(nullGuardResult.message);
    }

    const dateGuardResult = TourDate.isGreatherThanToday(date);

    if (!dateGuardResult.succeeded) {
      return Result.fail<TourDate>(dateGuardResult.message);
    }

    return Result.ok<TourDate>(new TourDate({ value: date }))
  }

  private static isGreatherThanToday(date: Date): IGuardResult {
    return Guard.dateGreaterThanToday(date, 'date');
  }
}

// !TODO: Validación de aplicación (problemas en backoffice, getTours,...) --> Casos de uso
