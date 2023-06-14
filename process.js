import { Command } from "commander";

const program = new Command();

program
  .option("-d", "Variable for debug", false)
  .option("--persist <mode>", "Persistence mode", "mongodb")
  .option("--mode <mode>", "Work mode", "development");

program.parse();

export default program;
