import { printing } from "@prisma/client";
import { builder } from "../builder";


export const PrintingNode = builder.objectRef<printing>("Printing").implement({
  description:
    "A printing is a version of a card that is unique to a particular set.",
  fields: (t) => ({
    id: t.exposeID("id"),
    set: t.exposeString("set"),
    collectorNumber: t.exposeString("collector_number"),
  }),
});
