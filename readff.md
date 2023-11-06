datasource db {
  provider = "postgresql"
  url      = "postgres://admin:admin@localhost:5433"
}

model Todo{
  id Int @id @default(autoincrement())
  status Boolean @default(false)
  name String
}
