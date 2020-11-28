import faker from "faker";
import { SavePurchases } from "@/domain/usecases";

export const mockPurchases = (): Array<SavePurchases.Params> => [
  {
    id: faker.random.uuid(),
    date: faker.date.recent(),
    value: faker.random.number(),
  },
  {
    id: faker.random.uuid(),
    date: faker.date.recent(),
    value: faker.random.number(),
  },
];
