import { PrismaClient } from '@prisma/client';
import { cleanupDatabase } from '@tests/utils';

// vi.mock('@/services/external-service', () => ({
//   ExternalService: {
//     someMethod: vi.fn(),
//   },
// }));

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await cleanupDatabase(prisma);
  await prisma.$disconnect();
});