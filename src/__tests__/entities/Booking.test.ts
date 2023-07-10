
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Booking } from '../../entities/Booking';
import { City } from '../../entities/City';
import { Client } from '../../entities/Client';
import { Guide } from '../../entities/Guide';
import { Tour } from '../../entities/Tour';
import { BookingPeople } from '../../value-objects/BookingPeople';
import { Description } from '../../value-objects/Description';
import { Title } from '../../value-objects/Title';
import { TourCapacity } from '../../value-objects/TourCapacity';
import { TourDate } from '../../value-objects/TourDate';
import { UserName } from '../../value-objects/UserName';
import { UserPhone } from '../../value-objects/UserPhone';

describe('Entity: Booking', () => {
  const tourDate = new Date('2023-10-12');
  const tourId = new UniqueEntityID();
  const tourCapacity = TourCapacity.create(20).getValue()

  const mockValidTour = Tour.createTour({
    title: Title.create('This is a tour').getValue(),
    description: Description.create('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies turpis eget nisi semper tincidunt. Cras posuere congue nibh nec posuere.').getValue(),
    date: TourDate.create(tourDate).getValue(),
    city: City.createCity({ name: 'Barcelona', active: true }, new UniqueEntityID()).getValue(),
    capacity: tourCapacity,
    guide: Guide.createGuide(
      {
        name: UserName.create('Laura').getValue(),
        surname: 'Garcia',
        phone: UserPhone.create('+34691184757').getValue()
      }, new UniqueEntityID()).getValue()
  }, tourId);

  const clientName = UserName.create('Juan')
  const clientPhone = UserPhone.create('+34691184757')
  const mockValidClient = Client.createClient(
    {
      name: clientName.getValue(),
      surname: 'Garcia',
      phone: clientPhone.getValue()
    }, new UniqueEntityID());

  const bookingId = new UniqueEntityID();
  const bookingDate = new Date()
  const mockValidCapacity = BookingPeople.create(2, tourCapacity.value);

  describe('Testing createBooking', () => {
    it('Should return a Result.ok when all properties are valid', () => {
      const result: Result<Booking> = Booking.createBooking(
        {
          tour: mockValidTour.getValue(),
          client: mockValidClient.getValue(),
          date: bookingDate,
          peopleInReserve: mockValidCapacity.getValue(),
        }, bookingId);

      expect(result.isSuccess).toBe(true);

      const booking = result.getValue();

      expect(booking.tour.title.value).toBe('This is a tour');
      expect(booking.client.name.value).toBe('Juan');
      expect(booking.date).toBe(bookingDate);
      expect(booking.peopleInReserve.value).toBe(2);
    });
  });

});
