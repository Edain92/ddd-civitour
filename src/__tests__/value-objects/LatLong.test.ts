import { LatLong } from "../../modules/value-objects/LatLong";

describe('ValueObject: LatLong', () => {
  it('Should create a valid LatLong object', () => {
    const result = LatLong.create('56.3847');
    const userPhone = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(userPhone.value).toEqual('56.3847');
  });

  it('Should fail to create a LatLong', () => {
    const result = LatLong.create('abc');

    expect(result.isFailure).toBe(true);
  });
});
