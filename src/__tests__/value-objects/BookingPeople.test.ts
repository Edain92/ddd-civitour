import { BookingPeople } from "../../modules/value-objects/BookingPeople";

describe('ValueObject: BookingPeople', () => {
  it('Should create a valid BookingPeople object', () => {
    const result = BookingPeople.create(3, 5);
    const bookingPeople = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(bookingPeople.value).toEqual(3);
  });

  it('Should fail to create a BookingPeople', () => {
    const result = BookingPeople.create(0, 5);

    expect(result.isFailure).toBe(true);
  });
});
