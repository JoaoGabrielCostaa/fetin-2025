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
ALTER TABLE "public"."FeedPost" DROP CONSTRAINT "FeedPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONGsFollower" DROP CONSTRAINT "ONGsFollower_ongId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONGsFollower" DROP CONSTRAINT "ONGsFollower_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONGsProject" DROP CONSTRAINT "ONGsProject_ongId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONGsProjectsParticipant" DROP CONSTRAINT "ONGsProjectsParticipant_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONGsProjectsParticipant" DROP CONSTRAINT "ONGsProjectsParticipant_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONGsTag" DROP CONSTRAINT "ONGsTag_ongId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_ongId_fkey";

-- DropTable
DROP TABLE "public"."FeedPost";

-- DropTable
DROP TABLE "public"."ONG";

-- DropTable
DROP TABLE "public"."ONGsFollower";

-- DropTable
DROP TABLE "public"."ONGsProject";

-- DropTable
DROP TABLE "public"."ONGsProjectsParticipant";

-- DropTable
DROP TABLE "public"."ONGsTag";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
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
CREATE TABLE "public"."ongs" (
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
CREATE TABLE "public"."ongs_projects" (
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
CREATE TABLE "public"."ongs_projects_participants" (
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "ongs_projects_participants_pkey" PRIMARY KEY ("user_id","project_id")
);

-- CreateTable
CREATE TABLE "public"."ongs_followers" (
    "user_id" INTEGER NOT NULL,
    "ong_id" INTEGER NOT NULL,
    "followed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ongs_followers_pkey" PRIMARY KEY ("user_id","ong_id")
);

-- CreateTable
CREATE TABLE "public"."ongs_tags" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ong_id" INTEGER NOT NULL,

    CONSTRAINT "ongs_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."feed_posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feed_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "public"."users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ongs_cnpj_key" ON "public"."ongs"("cnpj");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "public"."ongs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ongs_projects" ADD CONSTRAINT "ongs_projects_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "public"."ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ongs_projects_participants" ADD CONSTRAINT "ongs_projects_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ongs_projects_participants" ADD CONSTRAINT "ongs_projects_participants_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."ongs_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ongs_followers" ADD CONSTRAINT "ongs_followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ongs_followers" ADD CONSTRAINT "ongs_followers_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "public"."ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ongs_tags" ADD CONSTRAINT "ongs_tags_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "public"."ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."feed_posts" ADD CONSTRAINT "feed_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
