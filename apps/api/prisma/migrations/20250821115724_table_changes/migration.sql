/*
  Warnings:

  - The primary key for the `ongs_followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ongs_projects_participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "feed_posts" DROP CONSTRAINT "feed_posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ongs_followers" DROP CONSTRAINT "ongs_followers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ongs_projects_participants" DROP CONSTRAINT "ongs_projects_participants_user_id_fkey";

-- AlterTable
ALTER TABLE "feed_posts" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ongs_followers" DROP CONSTRAINT "ongs_followers_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ongs_followers_pkey" PRIMARY KEY ("user_id", "ong_id");

-- AlterTable
ALTER TABLE "ongs_projects_participants" DROP CONSTRAINT "ongs_projects_participants_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ongs_projects_participants_pkey" PRIMARY KEY ("user_id", "project_id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "ongs_projects_participants" ADD CONSTRAINT "ongs_projects_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_followers" ADD CONSTRAINT "ongs_followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_posts" ADD CONSTRAINT "feed_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
