import { PrismaClient } from '@prisma/client'

class PrismaClientSingleton {
  private static instance: PrismaClient | null = null
  
  private constructor() {}
  
  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient({
        datasourceUrl: process.env.NODE_ENV !== 'test' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL,
        log: ['error', 'warn'],
      })
    }
    
    return PrismaClientSingleton.instance
  }
}

export const prisma = PrismaClientSingleton.getInstance()