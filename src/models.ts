interface ReleaseResponseData {
  assets_url: string
}

interface ReleaseResponse {
  data: ReleaseResponseData
}

interface Asset {
  url: string,
  id: number,
  node_id: string,
  name: string,
  label: string,
  uploader: [Object],
  content_type: string,
  state: string,
  size: number,
  download_count: number,
  created_at: string,
  updated_at: string,
  browser_download_url: string
}


interface AssetResponse {
  data: Asset[]
}

interface Inputs {
    gitUser: string,
    gitToken: string,
    configPath: string,
    command: string,
    yamlKeys: string,
    destEnvironment: string,
    srcEnvironment: string,
    version: string
}