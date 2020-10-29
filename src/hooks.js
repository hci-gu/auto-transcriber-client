import { useEffect, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import {
  fileState,
  errorState,
  transcriptionState,
  languageState,
  servicesState,
} from './state'

export const useFileUpload = () => {
  const [, setFile] = useRecoilState(fileState)
  const [, setError] = useRecoilState(errorState)

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      setFile(file)
      setError(null)
    },
    [setFile, setError]
  )

  return onDrop
}

export const useGetTranscriptionStatus = (id) => {
  const [, setTranscriptionState] = useRecoilState(transcriptionState)

  useEffect(() => {
    let interval
    const getStatus = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/${id}/status`
      )
      const transcriptions = response.data.services

      if (
        !transcriptions.length ||
        !transcriptions.map((t) => t.status).includes('IN_PROGRESS')
      ) {
        clearInterval(interval)
      }

      setTranscriptionState(transcriptions)
    }
    if (id != null) {
      getStatus()
      interval = setInterval(getStatus, 2500)
    }
  }, [id, setTranscriptionState])
}

const supportsSwedish = (service) => {
  switch (service) {
    case 'google':
    case 'azure':
      return true
    default:
      return false
  }
}

export const useChangeServicesOnLanguageSelect = () => {
  const language = useRecoilValue(languageState)
  const [services, setServices] = useRecoilState(servicesState)

  useEffect(() => {
    if (language === 'sv-SE') {
      setServices(
        services.map((s) => ({
          ...s,
          disabled: !supportsSwedish(s.name),
        }))
      )
    } else {
      setServices(
        services.map((s) => ({
          ...s,
          disabled: false,
        }))
      )
    }
  }, [language, setServices])
}
