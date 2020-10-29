import React from 'react'
import styled from 'styled-components'
import LanguageSelect from '../components/LanguageSelect'
import Services from '../components/Services'
import FileUpload from '../components/FileUpload'
import UploadButton from '../components/UploadButton'
import ErrorMessage from '../components/ErrorMessage'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`

const Spacer = styled.div`
  height: 50px;
`

function Upload() {
  return (
    <Container>
      <LanguageSelect />
      <Services />
      <FileUpload />
      <Spacer />
      <UploadButton />
      <ErrorMessage />
    </Container>
  )
}

export default Upload
