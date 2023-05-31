import { Command } from "commander";

const program = new Command();

program
  .option("-d", "Variable para debug", false)
  .option("-p <port>", "Puerto del server", 8080)
  .option("--mode <mode>", "Modo de trabajo", "develop");

program.parse();

export default program;
