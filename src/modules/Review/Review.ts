import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Description } from "../value-objects/Description";
import { ReviewScore } from "../value-objects/ReviewScore";
import { Client } from "../Client/Client";
import { Tour } from "../Tour/Tour";

export class Review extends Entity<ReviewProps>  {
  private constructor(props: ReviewProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get tour(): Tour { //? TODO: tourId?
    return this.props.tour;
  }

  get client(): Client { //? TODO: clientId?
    return this.props.client;
  }

  get score(): ReviewScore {
    return this.props.score;
  }

  get comment(): Description {
    return this.props.comment;
  }

  get tip(): ReviewScore {
    return this.props.tip;
  }

  public static createReview(props: ReviewProps, id?: UniqueEntityID): Result<Review> {
    const userPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'tour', argument: props.tour },
      { argumentName: 'client', argument: props.client },
      { argumentName: 'score', argument: props.score },
      { argumentName: 'comment', argument: props.comment },
      { argumentName: 'tip', argument: props.tip }
    ]);

    if (!userPropsResult.succeeded) {
      return Result.fail<Review>(userPropsResult.message);
    }

    return Result.ok<Review>(new Review(props, id))
  }
}
