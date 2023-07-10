type User = {
  name: UserName
  surname: string
  phone: UserPhone
}

type CityProps = {
  name: string
  active: boolean
}

type TourProps = {
  title: Title
  description: Description
  date: TourDate
  city: City
  capacity: TourCapacity
  guide: Guide
}

type BookingProps = {
  tour: Tour
  client: Client
  date: Date
  peopleInReserve: BookingPeople
}

type ReviewProps = {
  client: Client
  tour: Tour
  score: ReviewScore
  comment: Description
  tip: ReviewTip
}

type MediaFileProps = {
  name: string
  source: string
}

type StopProps = {
  title: Title
  description: Description
  latitude: LatLong
  longitude: LatLong
  mediaFiles: MediaFile[]
}
