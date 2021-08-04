import * as core from '@actions/core';
import { PlatformPaths } from "./platform_paths";
import * as path from 'path';

export class ActionHandler{
    readonly inputs: Inputs;

    public constructor(){
        this.inputs = this.setInputs()
    }

    private setInputs(): Inputs {
        let inputs: Inputs = {
            gitUser: core.getInput("git-user"),
            gitToken: core.getInput("git-token"),
            configPath: core.getInput("config-path"),
            yamlKeys: core.getInput("yaml-keys"),
            command: core.getInput("command"),
            srcEnvironment: core.getInput("src-environment"),
            destEnvironment: core.getInput("dest-environment"),
            version: core.getInput("version")
        }

        return inputs
    }

    public async getInputs(): Promise<Inputs> {
        return this.inputs
    }

    public async setLodestarPath(platform: string): Promise<void> {
        switch (platform) {
            case "Linux":
                core.addPath(PlatformPaths.linux);

            break;
            case "Windows":
                core.addPath(PlatformPaths.windows);
            break;
            case "Darwin":
                core.addPath(PlatformPaths.darwin);
            break;
            default:
                throw new Error(`unsupported platform ${platform}`)
        }
    }
}