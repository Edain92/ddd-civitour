import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";

interface ReviewScoreProps {
  value: number;
}

export class ReviewScore extends ValueObject<ReviewScoreProps> {
  private constructor(props: ReviewScoreProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(score: number): Result<ReviewScore> {
    const nullGuardResult = Guard.againstNullOrUndefined(score, 'score');

    if (!nullGuardResult.succeeded) {
      return Result.fail<ReviewScore>(nullGuardResult.message);
    }

    const scoreGuardResult = ReviewScore.isValidScore(score);

    if (!scoreGuardResult.succeeded) {
      return Result.fail<ReviewScore>(scoreGuardResult.message);
    }

    return Result.ok<ReviewScore>(new ReviewScore({ value: score }))
  }

  private static isValidScore(score: number): IGuardResult {
    return Guard.inRange(score, 1, 5, 'score');
  }
}
