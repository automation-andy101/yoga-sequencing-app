import { config } from "dotenv";

config({ path: ".env.local" });

import poses from "../data/poses.json";
import modules from "../data/modules.json";
import templates from "../data/class-templates.json";

async function seed() {
  console.log("🌱 Starting yoga database seed...");

  // IMPORT AFTER dotenv loads
  const { default: connectDB } = await import("../lib/db/db");

  const { default: Pose } = await import("../lib/models/Pose");
  const { default: Module } = await import("../lib/models/Module");
  const { default: ClassTemplate } = await import(
    "../lib/models/ClassTemplate"
  );

  await connectDB();

  // -----------------------------------
  // RESET COLLECTIONS
  // -----------------------------------
  await Promise.all([
    Pose.deleteMany({}),
    Module.deleteMany({}),
    ClassTemplate.deleteMany({}),
  ]);

  console.log("🧹 Cleared existing collections");

  // -----------------------------------
  // INSERT POSES
  // -----------------------------------
  const insertedPoses = await Pose.insertMany(poses);

  console.log(`🧘 Inserted ${insertedPoses.length} poses`);

  // -----------------------------------
  // INSERT MODULES
  // -----------------------------------
  const insertedModules = await Module.insertMany(modules);

  console.log(`🔷 Inserted ${insertedModules.length} modules`);

  // -----------------------------------
  // INSERT CLASS TEMPLATES
  // -----------------------------------
  const insertedTemplates = await ClassTemplate.insertMany(templates);

  console.log(
    `📦 Inserted ${insertedTemplates.length} class templates`
  );

  console.log("✅ Seeding complete!");

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
