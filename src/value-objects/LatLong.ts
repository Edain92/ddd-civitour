import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";
import { LAT_LONG_PATTERN } from "../constants/patterns";

interface LatLongProps {
  value: string;
}

export class LatLong extends ValueObject<LatLongProps> {
  private constructor(props: LatLongProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(latLong: string): Result<LatLong> {
    const nullGuardResult = Guard.againstNullOrUndefined(latLong, 'latLong');

    if (!nullGuardResult.succeeded) {
      return Result.fail<LatLong>(nullGuardResult.message);
    }

    const latLongGuardResult = LatLong.isValidLatLong(latLong, LAT_LONG_PATTERN);

    if (!latLongGuardResult.succeeded) {
      return Result.fail<LatLong>(latLongGuardResult.message);
    }

    return Result.ok<LatLong>(new LatLong({ value: latLong }))
  }

  private static isValidLatLong(latLong: string, pattern: string): IGuardResult {
    return Guard.validPattern(latLong, pattern, 'latLong');
  }
}
