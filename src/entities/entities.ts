import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";

@Entity({ tableName: 'organization' })
export class OrganizationEntity {
    @PrimaryKey({ autoincrement: true })
    id: number;

    @OneToMany(() => UserEntity, e => e.organization)
    users = new Collection<UserEntity>(this);
}


@Entity({ tableName: 'user' })
@Unique({
    name: 'uniq',
    properties: ['externalId', 'organization']
})
export class UserEntity {
    @PrimaryKey({ autoincrement: true })
    id: number;

    @Property()
    externalId: string;

    @ManyToOne(() => OrganizationEntity)
    organization: OrganizationEntity;
}
