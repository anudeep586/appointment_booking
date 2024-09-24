/* eslint-disable no-console */
import knex from 'knex';
import configs from './database.connection';
// import { data } from '../utils/plansData';
// import { v4 as uuidv4 } from 'uuid';

const config = configs[process.env.NODE_ENV || 'development'];

const db = knex(config);

// const addTrigger = async () => {
//   try {
//     // Get all table names from the database
//     const tableNamesQuery = await db.raw(`
//       SELECT table_name 
//       FROM information_schema.tables 
//       WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
//     `);

//     const tableNames = tableNamesQuery.rows.map((row: any) => row.table_name);

//     // Iterate through each table and create a trigger
//     for (const tableName of tableNames) {
//       await db.schema.raw(`
//         CREATE OR REPLACE FUNCTION update_updated_at_${tableName}_trigger()
//         RETURNS TRIGGER AS $$
//         BEGIN
//           NEW.updated_at = NOW();
//           RETURN NEW;
//         END;
//         $$ LANGUAGE plpgsql;

//         CREATE TRIGGER new_trigger_update_updated_at_${tableName}
//         BEFORE UPDATE ON "${tableName}"  -- Wrap table name in double quotes
//         FOR EACH ROW
//         EXECUTE FUNCTION update_updated_at_${tableName}_trigger();
//       `);
//     }

//     console.log('Triggers created successfully.');
//   } catch (err) {
//     console.log(err);
//   }
// };
// addTrigger(); // enable only while after running npm run migrate
// async function insertPlansData() {
//     try {
//         await Promise.all(
//             data.data.map(async (plan: any) => {
//                 const ifExist = await db('plans')
//                     .where({
//                         name: plan.name,
//                     })
//                     .select('id');
//                 if (ifExist.length == 0) {
//                     await db('plans')
//                         .insert({
//                             id: uuidv4(),
//                             name: plan.name,
//                             description: plan.description,
//                             status: 'ACTIVE',
//                             data: JSON.stringify(plan.data),
//                             price: plan.price,
//                             scope: plan.scope,
//                             storage: plan.storage,
//                             users: plan.users,
//                             contests_public: plan.contests_public,
//                             contests_organization: plan.contests_organization,
//                             tasks: plan.tasks,
//                             validity: plan.validity,
//                         })
//                         .returning('*')
//                         .select('*');
//                 }
//             })
//         );
//     } catch (error) {
//         console.error('Error inserting data:', error);
//     }
// }
// insertPlansData(); // enable only while running app for the first time
export default db;
