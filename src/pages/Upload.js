import React from 'react'
import styled from 'styled-components'
import LanguageSelect from '../components/LanguageSelect'
import SpeakersSelect from '../components/SpeakersSelect'
import Services from '../components/Services'
import FileUpload from '../components/FileUpload'
import UploadButton from '../components/UploadButton'
import ErrorMessage from '../components/ErrorMessage'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`

const Settings = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spacer = styled.div`
  height: 50px;
`

function Upload() {
  return (
    <Container>
      <Settings>
        <LanguageSelect />
        <SpeakersSelect />
      </Settings>
      <Services />
      <FileUpload />
      <Spacer />
      <UploadButton />
      <ErrorMessage />
    </Container>
  )
}

export default Upload
