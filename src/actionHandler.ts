import * as core from '@actions/core';

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
}