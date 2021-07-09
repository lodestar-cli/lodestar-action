import { LodestarHandler } from './lodestarHandler';
import { BinaryHandler } from './binaryHandler';
import { ActionHandler } from './actionHandler';

async function main(): Promise<void> {
  try {
    const platform: string = process.platform.toString().charAt(0).toUpperCase() + process.platform.toString().slice(1);

    if (platform != "Linux" && platform != "Windows" && platform != "Darwin") {
      throw new Error(`unsupported platform ${platform}`);
    };

    let action: ActionHandler = new ActionHandler();

    let inputs = await action.getInputs();

    let binary: BinaryHandler = new BinaryHandler(platform, inputs.version);

    await binary.install();

    let lodestar: LodestarHandler = new LodestarHandler(platform);
  
    await lodestar.runCommand(inputs);

  } catch (error) {
    console.log(`could not complet action: ${error}`);
    process.exit(1);
  };
}

main()