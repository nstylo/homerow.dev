import styled from "styled-components"

export const Button = styled.button`
  font-size: 0.5em;
  background-color: transparent;
  color: ${(props): string => props.theme.primary};
  border: solid;
  border-width: 3px;
  border-color: ${(props): string => props.theme.primary};
  border-radius: 5px;
  padding: 0.25em 1em;
`
