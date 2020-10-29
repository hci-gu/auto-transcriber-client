import { useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import { fileState, errorState, transcriptionState } from './state'

export const useFileUpload = () => {
  const [, setFile] = useRecoilState(fileState)
  const [, setError] = useRecoilState(errorState)

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      setFile(file)
      setError(null)
    },
    [setFile]
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
