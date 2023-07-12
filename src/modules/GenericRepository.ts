import { Repository } from "../core/infra/repository";

export interface GenericRepository extends Repository<any> {
  getEntityById (entityId: VinylId): Promise<any>;
}

export class GenericRepository implements GenericRepository {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    return {
      where: {},
      include: []
    }
  }

  public async getVinylById (entityId: VinylId | string): Promise<Vinyl> {
    const VinylModel = this.models.Vinyl;
    const query = this.createBaseQuery();
    query.where['entity_id'] = (
      entityId instanceof VinylId ? (<VinylId>entityId).id.toValue() : entityId
    );
    const sequelizeVinylInstance = await VinylModel.findOne(query);
    if (!!sequelizeVinylInstance === false) {
      return null;
    }
    return VinylMap.toDomain(sequelizeVinylInstance);
  }

  private async rollbackSave (entity: Vinyl) {
    const VinylModel = this.models.Vinyl;
    await this.artistRepo.removeArtistById(entity.artist.artistId);
    await this.albumRepo.removeAlbumById(entity.artist.artistId);
    await VinylModel.destroy({
      where: {
        entity_id: entity.entityId.id.toString()
      }
    })
  }

  public async save (entity: Vinyl): Promise<Vinyl> {
    const VinylModel = this.models.Vinyl;
    const exists: boolean = await this.exists(entity.entityId);
    const rawVinyl: any = VinylMap.toPersistence(entity);

    try {
      await this.artistRepo.save(entity.artist);
      await this.albumRepo.save(entity.album);

      if (!exists) {
        await VinylModel.create(rawVinyl);
      } else {
        await VinylModel.update(rawVinyl);
      }
    } catch (err) {
      this.rollbackSave(entity);
    }

    return entity;
  }
}