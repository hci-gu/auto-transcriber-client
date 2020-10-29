import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import styled from 'styled-components'
import ClipLoader from 'react-spinners/ClipLoader'
import { useHistory } from 'react-router-dom'
import {
  fileState,
  loadingState,
  errorState,
  languageState,
  selectedSevices,
} from '../state'
import axios from 'axios'
import { COLORS } from '../style'

const Button = styled.button`
  width: 200px;
  padding: 10px;

  background-color: ${COLORS.orange};
  border-radius: 4px;
  border: none;
  outline: none;

  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  ${({ disabled }) => disabled && `opacity: 0.5;`}
`

export default function UploadButton() {
  const file = useRecoilValue(fileState)
  const language = useRecoilValue(languageState)
  const services = useRecoilValue(selectedSevices)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [, setError] = useRecoilState(errorState)
  const history = useHistory()

  const upload = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    let formData = new FormData()
    formData.append('audio', file)

    const query = `language=${language}&services=${services.join(',')}`

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/upload?${query}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (!response.data.error) {
        history.push(`transcription/${response.data.id}`)
      } else {
        setError(response.data.error)
      }
    } catch (e) {
      setError(e)
    }

    setLoading(false)
  }

  return (
    <Button onClick={upload} disabled={!file}>
      {loading ? 'Uploading...' : 'Transcribe'}
      {loading && (
        <ClipLoader size={15} css="margin-left: 5px;" color={'#fff'} />
      )}
    </Button>
  )
}
