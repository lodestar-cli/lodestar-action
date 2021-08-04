import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { PlatformPaths } from "./platform_paths";
import * as tc from '@actions/tool-cache';


export class BinaryHandler {
    readonly lodestarPath: string;
    readonly platform: string;
    readonly version: string;

    public constructor(platform: string, version: string) {
        switch (platform) {
            case "Linux":
                this.lodestarPath = path.join(PlatformPaths.linux, "lodestar");
            break;
            case "Windows":
                this.lodestarPath = path.join(PlatformPaths.windows, "lodestar");
            break;
            case "Darwin":
                this.lodestarPath = path.join(PlatformPaths.darwin, "lodestar");
            break;
            default:
                throw new Error(`unsupported platform ${platform}`)
        }

        this.platform = platform;

        if (version == ""){
            this.version = "latest"
        }
        else{
            this.version = version;
        }
    }

    public async install(): Promise<void> {
        try {
            if (!fs.existsSync(this.lodestarPath)) {
                let name: string;
                let url: string;

                if (this.version == "latest"){
                    let asset: Asset = await this.getAsset("https://api.github.com/repos/lodestar-cli/lodestar/releases/latest");

                    name = asset.name;
                    url = asset.browser_download_url;
                }
                else {
                    name = `lodestar-cli-lodestar-${this.version}.tar.gz`
                    url = `https://github.com/lodestar-cli/lodestar/tarball/${this.version}`
                }

                await this.fetch(url);
            }

            return
        } catch(err) {
            console.error(err);
            process.exit(1);
        }
    }

    private async getAsset(url: string): Promise<Asset> {
        try {
            let releaseResponse: ReleaseResponse = await axios.get(url);

            let assetResponse: AssetResponse = await axios.get(releaseResponse.data.assets_url);
    
            for (var asset of assetResponse.data) {
              if (asset.browser_download_url.includes(`${this.platform}_x86_64`)) {
                  return asset;
              }  
            }
    
            throw new Error("no binaries match platform: "+ this.platform)
        } catch (error) {
            console.log(`error getting asset ${error}`);
            process.exit(1);
        }
    }

    private async fetch(url:string): Promise<void> {
        try {
            console.log(`fetching lodestar from ${url}...`);

            const toolPath = await tc.downloadTool(url);
    
            console.log("unpacking lodestar...");
    
            switch (this.platform) {
                case "Linux":
                    await tc.extractTar(toolPath, PlatformPaths.linux);
                break;
                case "Windows":
                    await tc.extractTar(toolPath, PlatformPaths.windows);
                break;
                case "Darwin":
                    await tc.extractTar(toolPath, PlatformPaths.darwin);
                break;
                default:
                    throw new Error(`unsupported platform ${this.platform}`);
            }
        } catch (error) {
            console.log(`error fetching lodestar: ${error}`);
            process.exit(1);
        }
    }
}