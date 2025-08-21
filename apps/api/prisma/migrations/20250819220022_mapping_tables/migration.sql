/*
  Warnings:

  - You are about to drop the `FeedPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ONG` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ONGsFollower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ONGsProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ONGsProjectsParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ONGsTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeedPost" DROP CONSTRAINT "FeedPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "ONGsFollower" DROP CONSTRAINT "ONGsFollower_ongId_fkey";

-- DropForeignKey
ALTER TABLE "ONGsFollower" DROP CONSTRAINT "ONGsFollower_userId_fkey";

-- DropForeignKey
ALTER TABLE "ONGsProject" DROP CONSTRAINT "ONGsProject_ongId_fkey";

-- DropForeignKey
ALTER TABLE "ONGsProjectsParticipant" DROP CONSTRAINT "ONGsProjectsParticipant_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ONGsProjectsParticipant" DROP CONSTRAINT "ONGsProjectsParticipant_userId_fkey";

-- DropForeignKey
ALTER TABLE "ONGsTag" DROP CONSTRAINT "ONGsTag_ongId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_ongId_fkey";

-- DropTable
DROP TABLE "FeedPost";

-- DropTable
DROP TABLE "ONG";

-- DropTable
DROP TABLE "ONGsFollower";

-- DropTable
DROP TABLE "ONGsProject";

-- DropTable
DROP TABLE "ONGsProjectsParticipant";

-- DropTable
DROP TABLE "ONGsTag";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "job" TEXT,
    "picture" TEXT,
    "password" TEXT NOT NULL,
    "ong_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ongs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "description" TEXT,
    "mission" TEXT,
    "cep" TEXT,
    "image" TEXT,
    "banner" TEXT,
    "foundation_date" TIMESTAMP(3),
    "website" TEXT,
    "contact_number" TEXT,
    "contact_email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ongs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ongs_projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "image" TEXT,
    "ong_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ongs_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ongs_projects_participants" (
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "ongs_projects_participants_pkey" PRIMARY KEY ("user_id","project_id")
);

-- CreateTable
CREATE TABLE "ongs_followers" (
    "user_id" INTEGER NOT NULL,
    "ong_id" INTEGER NOT NULL,
    "followed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ongs_followers_pkey" PRIMARY KEY ("user_id","ong_id")
);

-- CreateTable
CREATE TABLE "ongs_tags" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ong_id" INTEGER NOT NULL,

    CONSTRAINT "ongs_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed_posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feed_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ongs_cnpj_key" ON "ongs"("cnpj");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_projects" ADD CONSTRAINT "ongs_projects_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_projects_participants" ADD CONSTRAINT "ongs_projects_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_projects_participants" ADD CONSTRAINT "ongs_projects_participants_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "ongs_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_followers" ADD CONSTRAINT "ongs_followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_followers" ADD CONSTRAINT "ongs_followers_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_tags" ADD CONSTRAINT "ongs_tags_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_posts" ADD CONSTRAINT "feed_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
