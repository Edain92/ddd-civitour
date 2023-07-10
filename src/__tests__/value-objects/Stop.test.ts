import { Description } from "../../value-objects/Description";
import { LatLong } from "../../value-objects/LatLong";
import { MediaFile } from "../../value-objects/MediaFile";
import { Stop } from "../../value-objects/Stop";
import { Title } from "../../value-objects/Title";

describe('ValueObject: Stop', () => {
  const validMediaFile = {
    name: 'this is a mediaFile',
    source: 'https://www.something.com'
  }

  const mediaFiles: MediaFile[] = []
  mediaFiles.push(MediaFile.create(validMediaFile).getValue())
  mediaFiles.push(MediaFile.create(validMediaFile).getValue())

  const validStop = {
    title: Title.create('This is a Stop'),
    description: Description.create('This is the Stop description'),
    latitude: LatLong.create('120'),
    longitude: LatLong.create('180'),
    mediaFiles: mediaFiles
  }

  describe('Testing create', () => {
    it('Should return a Result.success when the ValueObject is properly created', () => {
      const result = Stop.create(validStop);
      expect(result.isSuccess).toBe(true);
    });
  });

});
