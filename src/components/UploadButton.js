import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import ClipLoader from 'react-spinners/ClipLoader'
import { useHistory } from 'react-router-dom'
import { fileState, loadingState } from '../state'
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
  const [file] = useRecoilState(fileState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const history = useHistory()

  const upload = async () => {
    if (!file) return
    setLoading(true)
    let formData = new FormData()
    formData.append('audio', file)
    const response = await axios.post(
      `${process.env.REACT_APP_API}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    history.push(`transcription/${response.data.id}`)

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
