import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { useRecoilState } from 'recoil'
import { languageState } from '../state'

const options = [
  { value: 'en-US', label: 'English' },
  { value: 'sv-SE', label: 'Swedish' },
]

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;

  > div {
    margin-top: 10px;
    width: 200px;
  }
`

export default function LanguageSelect() {
  const [, setLanguage] = useRecoilState(languageState)

  return (
    <Container>
      <span>Select spoken language to transcribe</span>
      <Select
        options={options}
        defaultValue={options[0]}
        onChange={({ value }) => setLanguage(value)}
      ></Select>
    </Container>
  )
}
