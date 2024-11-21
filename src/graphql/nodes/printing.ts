import { printing } from "@prisma/client";
import { builder } from "@/graphql/builder";
import { FinishRef } from "@/graphql/builderTypes";

export const PrintingNode = builder.objectRef<printing>("Printing").implement({
  description:
    "A printing is a version of a card that is unique to a particular set.",
  fields: (t) => ({
    id: t.exposeID("id", {
      description: "The unique identifier of a printing.",
    }),
    set: t.exposeString("set", { description: "The set code of a printing." }),
    setName: t.exposeString("set_name", {
      description: "The name of the set of a printing.",
    }),
    collectorNumber: t.exposeString("collector_number", {
      description: "The collector number of a printing.",
    }),
    imageUri: t.exposeString("image_uri", {
      description: "The image URI of a printing.",
    }),
    backImageUri: t.exposeString("back_image_uri", {
      description: "The image URI of the back of a printing",
      nullable: true,
    }),
    finishes: t.field({
      type: [FinishRef],
      resolve: (parent) => parent.finishes,
    }),
    priceUsd: t.expose("price_usd", {
      description: "The price of the non-foil version of a printing in USD.",
      type: "Decimal",
      nullable: true,
    }),
    priceUsdFoil: t.expose("price_usd_foil", {
      description: "The price of the foil version of a printing in USD.",
      type: "Decimal",
      nullable: true,
    }),
    priceUsdEtched: t.expose("price_usd_etched", {
      description: "The price of the etched version of a printing in USD.",
      type: "Decimal",
      nullable: true,
    }),
    priceEur: t.expose("price_eur", {
      description: "The price of the non-foil version of a printing in EUR.",
      type: "Decimal",
      nullable: true,
    }),
    priceEurFoil: t.expose("price_eur_foil", {
      description: "The price of the foil version of a printing in EUR.",
      type: "Decimal",
      nullable: true,
    }),
    priceEurEtched: t.expose("price_eur_etched", {
      description: "The price of the etched version of a printing in EUR.",
      type: "Decimal",
      nullable: true,
    }),
  }),
});
