import { baseUrl } from '../config'

// 企业管理接口配置
export const company = {
  add: `${baseUrl()}/permission/getPermissionByRoleType`,
  edit: `${baseUrl()}/edit`,
  // 查询角色/分页
  selectRole: `${baseUrl()}/role/selectRole`,
  // 删除角色
  deleteRole: `${baseUrl()}/role/deleteRole`,
  // 查询角色权限：
  getAllPermission: `${baseUrl()}/permission/getAllPermission`,
  // 查询角色类型权限:
  getPermissionByRoleType: `${baseUrl()}/permission/getPermissionByRoleType`,
  // 创建角色:
  createRole: `${baseUrl()}/role/createRole`,
  // 查询角色类型:
  selectRoleType: `${baseUrl()}/role/selectRoleType`,
  // 修改角色：
  updateRole: `${baseUrl()}/role/updateRole`
}
