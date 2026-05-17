import "dotenv/config";
import connectDB from "../lib/db/db";

import Pose from "../lib/models/Pose";
import Module from "../lib/models/Module";
import ClassTemplate from "../lib/models/ClassTemplate";

import poses from "../data/poses.json";
import modules from "../data/modules.json";
import templates from "../data/class-templates.json";

async function seed() {
  console.log("🌱 Starting yoga database seed...");

  await connectDB();

  // -----------------------------------
  // RESET COLLECTIONS (DEV SAFE)
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
  const insertedPoses = await Pose.insertMany(poses, {
    ordered: true,
  });

  console.log(`🧘 Inserted ${insertedPoses.length} poses`);

  // -----------------------------------
  // INSERT MODULES
  // -----------------------------------
  const insertedModules = await Module.insertMany(modules, {
    ordered: true,
  });

  console.log(`🔷 Inserted ${insertedModules.length} modules`);

  // -----------------------------------
  // INSERT CLASS TEMPLATES
  // -----------------------------------
  const insertedTemplates = await ClassTemplate.insertMany(templates, {
    ordered: true,
  });

  console.log(`📦 Inserted ${insertedTemplates.length} class templates`);

  // -----------------------------------
  // DONE
  // -----------------------------------
  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

