import { PlatformPaths } from "./platform_paths";
import * as path from 'path';
import * as exec from '@actions/exec';

export class LodestarHandler {
    lodestarPath: string;

    public constructor(platform: string) {
        switch (platform) {
            case "Linux":
                this.lodestarPath = path.join(PlatformPaths.linux, "lodestar")
            break;
            case "Windows":
                this.lodestarPath = path.join(PlatformPaths.windows, "lodestar")
            break;
            case "Darwin":
                this.lodestarPath = path.join(PlatformPaths.darwin, "lodestar")
            break;
            default:
                throw new Error(`unsupported platform ${platform}`)
        }
    }

    public async runCommand(inputs: Inputs): Promise<void> {
        try {
            console.log("executing lodestar...")
            switch (inputs.command) {
                case "app push":
                    if( inputs.yamlKeys == "" || inputs.destEnvironment == ""){
                        throw new Error(`improper inputs for ${inputs.command}: make sure keys and a destination environment are provided`)
                    }
                    this.appPush(inputs.gitUser, inputs.gitToken, inputs.configPath, inputs.yamlKeys, inputs.destEnvironment)
                break;
                case "app promote":
                    if( inputs.srcEnvironment == "" || inputs.destEnvironment == ""){
                        throw new Error(`improper inputs for ${inputs.command}: make sure source and destination environments are provided`)
                    }
                    this.appPromote(inputs.gitUser, inputs.gitToken, inputs.configPath, inputs.srcEnvironment, inputs.destEnvironment)
                break;
                default:
                    throw new Error(`unknown command: ${inputs.command}`)
                break;
            }
        } catch (error) {
            console.log(`error running command: ${error}`);
            process.exit(1);
        }
    }

    private async appPush(username: string, token: string, appConfig: string, yamlKeys: string, destEnvironment: string): Promise<void> {
        try {
            await exec.exec(this.lodestarPath, ["app", "push", "--username", username, "--token", token,
            "--config-path", appConfig, "--yaml-keys", yamlKeys, "--environment", destEnvironment]);   
        } catch (error) {
            console.log(`error pushing app: ${error}`);
            process.exit(1);
        }
    }

    private async appPromote(username: string, token: string, appConfig: string, srcEnvironment: string, destEnvironment: string): Promise<void> {
        try {
            await exec.exec(this.lodestarPath, ["app", "promote", "--username", username, "--token", token,
            "--config-path", appConfig, "--src-env", srcEnvironment, "--dest-env", destEnvironment]);
        } catch (error) {
            console.log(`error promoting app: ${error}`);
            process.exit(1);
        }
    }
}