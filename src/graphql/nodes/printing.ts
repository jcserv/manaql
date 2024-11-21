import { printing } from "@prisma/client";
import { builder } from "@/graphql/builder";
import { FinishRef } from "@/graphql/builderTypes";


export const PrintingNode = builder.objectRef<printing>("Printing").implement({
  description:
    "A printing is a version of a card that is unique to a particular set.",
  fields: (t) => ({
    id: t.exposeID("id"),
    set: t.exposeString("set"),
    setName: t.exposeString("set_name"),
    collectorNumber: t.exposeString("collector_number"),
    imageUri: t.exposeString("image_uri"),
    backImageUri: t.exposeString("back_image_uri", { nullable: true}),
    finishes: t.field({
      type: [FinishRef],
      resolve: (parent) => parent.finishes,
    }),
    priceUsd: t.expose("price_usd", { type: "Decimal", nullable: true}),
    priceUsdFoil: t.expose("price_usd_foil", { type: "Decimal", nullable: true}),
    priceUsdEtched: t.expose("price_usd_etched", { type: "Decimal", nullable: true}),
    priceEur: t.expose("price_eur", { type: "Decimal", nullable: true}),
    priceEurFoil: t.expose("price_eur_foil", { type: "Decimal", nullable: true}),
    priceEurEtched: t.expose("price_eur_etched", { type: "Decimal", nullable: true}),
  }),
});
