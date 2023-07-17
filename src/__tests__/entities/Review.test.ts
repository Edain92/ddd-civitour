
import { UniqueEntityID } from '../../core/domain/UniqueEntityID'
import { Result } from '../../core/logic/Result'
import { Review } from '../../modules/Review/Review'
import { City } from '../../modules/City/City'
import { Client } from '../../modules/Client/Client'
import { Tour } from '../../modules/Tour/Tour'
import { Description } from '../../modules/value-objects/Description'
import { Title } from '../../modules/value-objects/Title'
import { TourCapacity } from '../../modules/value-objects/TourCapacity'
import { TourDate } from '../../modules/value-objects/TourDate'
import { UserName } from '../../modules/value-objects/UserName'
import { UserPhone } from '../../modules/value-objects/UserPhone'
import { ReviewScore } from '../../modules/value-objects/ReviewScore'
import { ReviewTip } from '../../modules/value-objects/ReviewTip'
import { GuideId } from '../../modules/Guide/GuideId'

describe('Entity: Review', () => {
  const tourDate = new Date('2023-10-12')
  const tourId = new UniqueEntityID()
  const tourCapacity = TourCapacity.create(20).getValue()

  const mockValidTour = Tour.createTour({
    title: Title.create('This is a tour').getValue(),
    description: Description.create('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies turpis eget nisi semper tincidunt. Cras posuere congue nibh nec posuere.').getValue(),
    date: TourDate.create(tourDate).getValue(),
    city: City.createCity({ name: 'Barcelona', active: true }, new UniqueEntityID()).getValue(),
    capacity: tourCapacity,
    guideId: GuideId.create(new UniqueEntityID('test-guide')),
  }, tourId)

  const clientName = UserName.create('Luis')
  const clientPhone = UserPhone.create('+34691184757')
  const mockValidClient = Client.createClient(
    {
      name: clientName.getValue(),
      surname: 'Garcia',
      phone: clientPhone.getValue()
    }, new UniqueEntityID())

  const reviewId = new UniqueEntityID()
  const score = ReviewScore.create(4)
  const comment = Description.create('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies turpis eget nisi semper tincidunt.')
  const tip = ReviewTip.create(10)

  describe('Testing createReview', () => {
    it('Should return a Result.ok when all properties are valid', () => {
      const result: Result<Review> = Review.createReview(
        {
          tour: mockValidTour.getValue(),
          client: mockValidClient.getValue(),
          score: score.getValue(),
          comment: comment.getValue(),
          tip: tip.getValue()
        }, reviewId)

      expect(result.isSuccess).toBe(true)

      const review = result.getValue()

      expect(review.tour.title.value).toBe('This is a tour')
      expect(review.client.name.value).toBe('Luis')
      expect(review.score.value).toBe(4)
      expect(review.comment.value).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies turpis eget nisi semper tincidunt.')
      expect(review.tip.value).toBe(10)
    })
  })

})
