import { MikroORM } from "@mikro-orm/core";
import { OrganizationEntity, UserEntity } from "./entities/entities";
import db from './mikro-orm.config';

(async () => {
    const orm = await MikroORM.init({ ...db });

    await orm.getSchemaGenerator().refreshDatabase();

    // Create organization
    await orm.em.createQueryBuilder(OrganizationEntity)
        .insert({ id: 1 })
        .execute();

    // Insert
    try {
        await orm.em.createQueryBuilder(UserEntity)
            .insert([{ externalId: '1', organization: 1 }, { externalId: '2', organization: 1 }])
            .onConflict(['externalId', 'organization'])
            .ignore()
            .execute();

        console.log('INSERT_OK');
    } catch (error) {
        console.log('INSERT_ERROR', error);
    }

    // Select
    try {
        await orm.em.createQueryBuilder(UserEntity)
            .select('externalId')
            .execute();

        console.log('SELECT_OK');
    } catch (error) {
        console.log('SELECT_ERROR', error);
    }

    // Close connection
    await orm.close();
})();
