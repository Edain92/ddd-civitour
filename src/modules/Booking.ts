import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { BookingPeople } from "./value-objects/BookingPeople";
import { Client } from "./Client";
import { Tour } from "./Tour";

export class Booking extends Entity<BookingProps>  {
  private constructor(props: BookingProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get tour(): Tour {
    return this.props.tour;
  }

  get client(): Client {
    return this.props.client;
  }

  get date(): Date {
    return this.props.date;
  }

  get peopleInReserve(): BookingPeople {
    return this.props.peopleInReserve;
  }

  public static createBooking(props: BookingProps, id?: UniqueEntityID): Result<Booking> {
    const userPropsResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'tour', argument: props.tour },
      { argumentName: 'client', argument: props.client },
      { argumentName: 'date', argument: props.date },
      { argumentName: 'peopleInReserve', argument: props.peopleInReserve }
    ]);

    if (!userPropsResult.succeeded) {
      return Result.fail<Booking>(userPropsResult.message);
    }

    return Result.ok<Booking>(new Booking(props, id))
  }
}
