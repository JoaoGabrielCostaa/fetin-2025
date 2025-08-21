-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "job" TEXT,
    "picture" TEXT,
    "password" TEXT NOT NULL,
    "ongId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ONG" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "description" TEXT,
    "mission" TEXT,
    "cep" TEXT,
    "image" TEXT,
    "banner" TEXT,
    "foundationDate" TIMESTAMP(3),
    "website" TEXT,
    "contactNumber" TEXT,
    "contactEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ONG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ONGsProject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "image" TEXT,
    "ongId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ONGsProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ONGsProjectsParticipant" (
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ONGsProjectsParticipant_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "public"."ONGsFollower" (
    "userId" INTEGER NOT NULL,
    "ongId" INTEGER NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ONGsFollower_pkey" PRIMARY KEY ("userId","ongId")
);

-- CreateTable
CREATE TABLE "public"."ONGsTag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ongId" INTEGER NOT NULL,

    CONSTRAINT "ONGsTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FeedPost" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "public"."User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ONG_cnpj_key" ON "public"."ONG"("cnpj");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "public"."ONG"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ONGsProject" ADD CONSTRAINT "ONGsProject_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "public"."ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ONGsProjectsParticipant" ADD CONSTRAINT "ONGsProjectsParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ONGsProjectsParticipant" ADD CONSTRAINT "ONGsProjectsParticipant_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."ONGsProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ONGsFollower" ADD CONSTRAINT "ONGsFollower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ONGsFollower" ADD CONSTRAINT "ONGsFollower_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "public"."ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ONGsTag" ADD CONSTRAINT "ONGsTag_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "public"."ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeedPost" ADD CONSTRAINT "FeedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
