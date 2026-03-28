import cron from "node-cron";
import { generateReportService } from "../services/reportService.js";

cron.schedule("0 * * * *", async () => {
  await generateReportService();
  console.log("Report generated at", new Date().toISOString());
});
