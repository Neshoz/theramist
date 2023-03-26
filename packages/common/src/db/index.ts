import { Pool, QueryConfig, QueryResultRow } from "pg";

const pool = new Pool();

pool.on("error", (error, client) => {
  console.error(
    `DB: Unexpected error on idle client. ${pool.totalCount} / ${pool.idleCount} / ${pool.waitingCount} (total / idle / waiting)`,
    error
  );
});

async function query<R extends QueryResultRow = any, I extends any[] = any[]>(
  query: QueryConfig<I>
) {
  const start = Date.now();
  const res = await pool.query<R>(query);
  const duration = Date.now() - start;
  console.debug(
    `DB: Executed query ${query.text
      .replace(/\n/g, " ")
      .replace(/  +/g, " ")}, duration: ${duration}, rows: ${res.rowCount}`
  );
  return res;
}

export const db = {
  query,
  pool,
};
