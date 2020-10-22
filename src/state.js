import { atom } from 'recoil'

export const fileState = atom({
  key: 'file',
  default: null,
})

export const transcriptionState = atom({
  key: 'transcription',
  default: [],
})

export const loadingState = atom({
  key: 'loading',
  default: false,
})

export const services = ['Google cloud', 'Amazon AWS', '']

export const service = atom({
  key: 'service',
  default: services[0],
})
