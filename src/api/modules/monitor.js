import { baseUrl } from '../config'

// 运维监控接口配置
export const monitor = {
  add: `${baseUrl()}/add`,
  edit: `${baseUrl()}/edit`,
  getagentdata: `${baseUrl()}/service/getagentdata`
}
