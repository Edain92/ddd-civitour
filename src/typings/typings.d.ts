interface User {
  name: UserName
  surname: string
  phone: UserPhone
}
interface CityProps {
  name: string
  active: boolean
}

interface TourProps {
  title: Title
  description: Description
  date: TourDate
  city: City
  capacity: TourCapacity
  guide: Guide
}

interface BookingProps {
  tour: Tour
  client: Client
  date: Date
  peopleInReserve: BookingPeople
}
