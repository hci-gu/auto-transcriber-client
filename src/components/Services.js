import React from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { servicesState } from '../state'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../style'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 20px;

  > span {
    align-self: center;
  }
`

const ServiceList = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Service = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  cursor: pointer;
  > svg {
    left: -15px;
    position: absolute;
  }
  > img {
    width: 100px;
  }

  ${({ active, disabled }) =>
    (!active || disabled) && `filter: grayscale(100%);`}
`

export default function Services() {
  const [services, setServices] = useRecoilState(servicesState)

  const onClick = (service) => {
    if (service.disabled) return
    setServices(
      services.map((s) => ({
        ...s,
        active: s.name === service.name ? !s.active : s.active,
      }))
    )
  }

  return (
    <Container>
      <span>
        The following services will be used for your transcription ( click to
        disable )
      </span>
      <ServiceList>
        {services.map((service) => (
          <Service {...service} onClick={() => onClick(service)}>
            {(!service.active || service.disabled) && (
              <FontAwesomeIcon icon={faTimes} color={COLORS.fireBrick} />
            )}
            <img
              src={`/logos/${service.name}.png`}
              alt={`${service.name} logotype`}
            ></img>
          </Service>
        ))}
      </ServiceList>
    </Container>
  )
}
