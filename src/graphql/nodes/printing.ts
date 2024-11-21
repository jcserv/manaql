import { PrintingRef } from "@/graphql/builder";

export const PrintingNode = PrintingRef.implement({
  description:
    "A printing is a version of a card that is unique to a particular set.",
  fields: (t) => ({
    id: t.exposeID("id"),
    set: t.exposeString("set"),
    collector_number: t.exposeString("collector_number"),
  }),
});
