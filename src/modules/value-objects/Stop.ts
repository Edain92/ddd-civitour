import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Description } from "./Description";
import { Title } from "./Title";
import { LatLong } from "./LatLong";
import { MediaFile } from "./MediaFile";

export class Stop extends ValueObject<StopProps> {
  private constructor(props: StopProps) {
    super(props);
  }

  get title(): Title {
    return this.props.title;
  }

  get description(): Description {
    return this.props.description;
  }

  get latitude(): LatLong {
    return this.props.latitude;
  }

  get longitude(): LatLong {
    return this.props.title;
  }

  get mediaFiles(): MediaFile[] {
    return this.props.mediaFiles;
  }

  public static create(props: StopProps): Result<Stop> {
    const nullGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: 'title', argument: props.title },
      { argumentName: 'description', argument: props.description },
      { argumentName: 'latitude', argument: props.latitude },
      { argumentName: 'longitude', argument: props.longitude },
      { argumentName: 'mediaFiles', argument: props.mediaFiles }
    ]);

    if (!nullGuardResult.succeeded) {
      return Result.fail<Stop>(nullGuardResult.message);
    }

    const mediaFilesLengthGuardResult = Guard.inRange(props.mediaFiles.length, 0, 5, 'mediaFiles');

    if (!mediaFilesLengthGuardResult.succeeded) {
      return Result.fail<Stop>(mediaFilesLengthGuardResult.message);
    }

    return Result.ok<Stop>(new Stop(props))
  }
}
