/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
async function run() {
  try {
    const { replaceInFile } = await import("replace-in-file");

    const results = await replaceInFile({
      files: "prisma/migrations/*/migration.sql",
      from: /"public"\./g,
      to: "",
    });

    console.log("✅ Removed `public.` from migration.sql in:", results.map(r => r.file));
  } catch (error) {
    console.error("❌ Error removing public schema:", error);
    process.exit(1);
  }
}

run();



