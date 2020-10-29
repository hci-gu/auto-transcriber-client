import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { useRecoilState } from 'recoil'
import { numberOfSpeakersState } from '../state'

const options = Array.from({ length: 6 }).map((_, i) => ({
  value: i + 1,
  label: `${i + 1} Speaker${i > 0 ? 's' : ''}`,
}))

const Container = styled.div`
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

export default function SpeakersSelect() {
  const [, setNumberOfSpeakers] = useRecoilState(numberOfSpeakersState)

  return (
    <Container>
      <span>Select number of speakers</span>
      <Select
        options={options}
        defaultValue={options[1]}
        onChange={({ value }) => setNumberOfSpeakers(value)}
      ></Select>
    </Container>
  )
}
