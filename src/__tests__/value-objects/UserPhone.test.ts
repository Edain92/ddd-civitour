import { UserPhone } from "../../modules/value-objects/UserPhone";

describe('ValueObject: UserPhone', () => {
  const validSpanishPhone = "+34 600000000";
  const invalidPhone = "Invalid phone number";

  it('Should create a valid UserPhone object for a valid spanish phone number', () => {
    const result = UserPhone.create(validSpanishPhone);
    const userPhone = result.getValue();

    expect(result.isSuccess).toBe(true);
    expect(userPhone.value).toEqual(validSpanishPhone);
  });

  it('Should fail to create a UserPhone object for a invalid phone number', () => {
    const result = UserPhone.create(invalidPhone);

    expect(result.isFailure).toBe(true);
  });
});
