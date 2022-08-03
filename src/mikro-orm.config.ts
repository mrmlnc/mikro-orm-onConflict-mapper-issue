import { defineConfig, type Options } from "@mikro-orm/postgresql";
import { UserEntity, OrganizationEntity } from "./entities/entities";

const options: Options = defineConfig({
    type: 'postgresql',
    dbName: 'db',
    user: 'root',
    password: 'password',
    port: 8432,

    entities: [UserEntity, OrganizationEntity],

    debug: Boolean(process.env.DEBUG) || false,

    allowGlobalContext: true,
});

export default options;
