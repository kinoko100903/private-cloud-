import qs from 'qs'
import api from '../api'
import { sessionStorage } from './sessionStorage'
import { Message, Loading } from 'element-ui'
import { isValidPhone } from './formValidate'

export const ext = { Message, Loading, qs, api, sessionStorage, isValidPhone }
