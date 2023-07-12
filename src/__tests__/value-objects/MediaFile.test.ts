import { MediaFile } from "../../modules/value-objects/MediaFile";

describe('ValueObject: MediaFile', () => {
  const validMediaFile = {
    name: 'this is a mediaFile',
    source: 'https://www.something.com'
  }

  const invalidMediaFile = {
    name: 'this is a mediafile with bad url',
    source: 'hwwwsomething.com/'
  }

  it('Should create a valid MediaFile object', () => {
    const result = MediaFile.create(validMediaFile);
    const mediaFile = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(mediaFile.name).toEqual(validMediaFile.name);
    expect(mediaFile.source).toEqual(validMediaFile.source);
  });

  it('Should fail to create a MediaFile object', () => {
    const result = MediaFile.create(invalidMediaFile);

    expect(result.isFailure).toBe(true);
  });
});
