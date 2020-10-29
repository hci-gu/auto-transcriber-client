import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { errorState } from '../state'

const Container = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;

  align-items: center;
`

function ErrorMessage() {
  const error = useRecoilValue(errorState)

  if (!error) return null

  return (
    <Container>
      <span>
        <strong>Upload failed:</strong>
        {` ${error}`}
      </span>
    </Container>
  )
}

export default ErrorMessage
