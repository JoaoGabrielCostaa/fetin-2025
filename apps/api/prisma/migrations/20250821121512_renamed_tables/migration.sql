/*
  Warnings:

  - The primary key for the `ongs_followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `ongs_followers` table. All the data in the column will be lost.
  - The primary key for the `ongs_projects_participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `ongs_projects_participants` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account_id` to the `ongs_followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `ongs_projects_participants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feed_posts" DROP CONSTRAINT "feed_posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ongs_followers" DROP CONSTRAINT "ongs_followers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ongs_projects_participants" DROP CONSTRAINT "ongs_projects_participants_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_ong_id_fkey";

-- AlterTable
ALTER TABLE "ongs_followers" DROP CONSTRAINT "ongs_followers_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD CONSTRAINT "ongs_followers_pkey" PRIMARY KEY ("account_id", "ong_id");

-- AlterTable
ALTER TABLE "ongs_projects_participants" DROP CONSTRAINT "ongs_projects_participants_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD CONSTRAINT "ongs_projects_participants_pkey" PRIMARY KEY ("account_id", "project_id");

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "job" TEXT,
    "picture" TEXT,
    "password" TEXT NOT NULL,
    "ong_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_cpf_key" ON "accounts"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "ongs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_projects_participants" ADD CONSTRAINT "ongs_projects_participants_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs_followers" ADD CONSTRAINT "ongs_followers_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_posts" ADD CONSTRAINT "feed_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
