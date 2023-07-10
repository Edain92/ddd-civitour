import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";

interface ReviewTipProps {
  value: number;
}

export class ReviewTip extends ValueObject<ReviewTipProps> {
  private constructor(props: ReviewTipProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(tip: number): Result<ReviewTip> {
    const nullGuardResult = Guard.againstNullOrUndefined(tip, 'tip');

    if (!nullGuardResult.succeeded) {
      return Result.fail<ReviewTip>(nullGuardResult.message);
    }

    const tipGuardResult = ReviewTip.isValidReviewTip(tip);

    if (!tipGuardResult.succeeded) {
      return Result.fail<ReviewTip>(tipGuardResult.message);
    }

    return Result.ok<ReviewTip>(new ReviewTip({ value: tip }))
  }

  private static isValidReviewTip(tip: number): IGuardResult {
    return Guard.inRange(tip, 0, 300, 'tip');
  }
}
