import { PrintingRef } from "@/graphql/builder";

export const PrintingNode = PrintingRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    set: t.exposeString("set"),
    collector_number: t.exposeString("collector_number"),
  }),
});
