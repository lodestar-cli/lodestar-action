import * as path from 'path';
import * as exec from '@actions/exec';

export class LodestarHandler {
    public constructor() {}

    public async runCommand(inputs: Inputs): Promise<void> {
        try {
            if (inputs.gitToken == "" || inputs.gitUser == "" || inputs.configPath == "") {
                throw new Error(`a valid user, token, and path to an app config file must be set when attempting to run lodestar with this action`)
            }
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
            await exec.exec("lodestar", ["app", "push", "--username", username, "--token", token,
            "--config-path", appConfig, "--yaml-keys", yamlKeys, "--environment", destEnvironment]);   
        } catch (error) {
            console.log(`error pushing app: ${error}`);
            process.exit(1);
        }
    }

    private async appPromote(username: string, token: string, appConfig: string, srcEnvironment: string, destEnvironment: string): Promise<void> {
        try {
            await exec.exec("lodestar", ["app", "promote", "--username", username, "--token", token,
            "--config-path", appConfig, "--src-env", srcEnvironment, "--dest-env", destEnvironment]);
        } catch (error) {
            console.log(`error promoting app: ${error}`);
            process.exit(1);
        }
    }
}