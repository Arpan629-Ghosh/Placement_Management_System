import cron from "node-cron";
import { analyzePendingJobs } from "./analyzePendingJobs.js";

cron.schedule("*/10 * * * *", async () => {
  console.log("Running Pending Job Analysis...");

  await analyzePendingJobs();
});
