
class Configs {

  public ENVIROMENT_INFO: any

  public set_env(option: any): void {
    this.ENVIROMENT_INFO = this.environment(option)
  }

  private environment(option: any): object {
    switch (option) {
      case 'prod':
        return{
          node_api: '',
        }
      case 'uat':
        return{
          node_api: '',
        }
      case 'sit':
        return{
          node_api: '',
        }

      default:
        return{
          node_api: 'http://127.0.0.1:3001',
        }
    }
  }
}
const _configs = new Configs()
console.log(`当前环境为：${process.env.NODE_ENV}`)
_configs.set_env(process.env.NODE_ENV)

export default _configs
