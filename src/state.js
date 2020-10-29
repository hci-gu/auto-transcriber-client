import { atom, selector } from 'recoil'

export const fileState = atom({
  key: 'file',
  default: null,
})

export const languageState = atom({
  key: 'language',
  default: 'en-US',
})

export const numberOfSpeakersState = atom({
  key: 'number-of-speakers',
  default: 2,
})

export const transcriptionState = atom({
  key: 'transcription',
  default: [],
})

export const loadingState = atom({
  key: 'loading',
  default: false,
})

export const errorState = atom({
  key: 'error',
  default: null,
})

export const availableServices = ['aws', 'azure', 'google', 'ibm']

export const servicesState = atom({
  key: 'services',
  default: availableServices.map((name) => ({
    name,
    active: true,
    disabled: false,
  })),
})

export const selectedSevices = selector({
  key: 'selected-services',
  get: ({ get }) => {
    const services = get(servicesState)

    return services.filter((s) => s.active && !s.disabled).map((s) => s.name)
  },
})
