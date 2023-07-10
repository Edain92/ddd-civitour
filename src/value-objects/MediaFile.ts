import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard, IGuardResult } from "../core/logic/Guard";
import { URL_PATTERN } from "../constants/patterns";

export class MediaFile extends ValueObject<MediaFileProps> {
  private constructor(props: MediaFileProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get source(): string {
    return this.props.source;
  }

  public static create(props: MediaFileProps): Result<MediaFile> {
    const nullGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'name', argument: props.name },
      { argumentName: 'source', argument: props.source }
    ]);

    if (!nullGuardResult.succeeded) {
      return Result.fail<MediaFile>(nullGuardResult.message);
    }

    const spanishPhoneGuardResult = MediaFile.isValidUrl(props.source);

    if (!spanishPhoneGuardResult.succeeded) {
      return Result.fail<MediaFile>(spanishPhoneGuardResult.message);
    }

    return Result.ok<MediaFile>(new MediaFile(props))
  }

  private static isValidUrl(source: string): IGuardResult {
    return Guard.validPattern(source, URL_PATTERN, 'source');
  }
}
