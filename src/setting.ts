interface ISettings {
  title: string // Overrides the default title
  errorLog: string[] // The env to enable the errorlog component, default 'production' only
  devServerPort: number // Port number for webpack-dev-server
  mockServerPort: number // Port number for mock server
}

// You can customize below settings :)
const settings: ISettings = {
  title: 'ts-admin',
  errorLog: ['production'],
  devServerPort: 9527,
  mockServerPort: 9528,
}

export default settings
