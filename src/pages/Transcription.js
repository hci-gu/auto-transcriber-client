import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import Transcriptions from '../components/Transcriptions'
import { useGetTranscriptionStatus } from '../hooks'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`

const Header = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
`

const Download = styled.button`
  background: none;
  border: 2px solid black;
  outline: none;
  cursor: pointer;

  width: 200px;
  padding: 1em;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
  font-weight: bold;

  :active {
    opacity: 0.5;
  }
`

function Transcription() {
  const params = useParams()
  useGetTranscriptionStatus(params.id)

  const onDownloadClick = () => {
    window.location.assign(`${process.env.REACT_APP_API}/${params.id}/download`)
  }

  return (
    <Container>
      <Header>
        <p>Transcription session: {params.id}</p>
        <Download onClick={onDownloadClick}>
          Download transcripts
          <FontAwesomeIcon icon={faDownload} />
        </Download>
      </Header>
      <Transcriptions />
    </Container>
  )
}

export default Transcription
