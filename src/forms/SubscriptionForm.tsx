import React, { useState } from "react"
import styled from "styled-components"
import addToMailchimp from "gatsby-plugin-mailchimp"
import Mail from "../images/envelope-solid.svg"

type submission = "success" | "failure" | "not_submitted" | "client_error"

const SubscriptionForm = props => {
  const [submitted, setSubmitted] = useState<submission>("not_submitted")
  const [mail, setMail] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault() // do not reload page

    addToMailchimp(mail)
      .then(data => {
        if (data.result === "success") {
          setMail("")
          setSubmitted("success")
        } else {
          setSubmitted("failure")
        }
      })
      .catch((error: Error) => {
        setSubmitted("client_error")
        console.log("Errors on submit are client side")
        console.log(error)
      })
  }

  return (
    <Container>
      <Wrapper>
        <form name="email-newsletter" method="POST" onSubmit={handleSubmit}>
          <Header>Subscribe to my Newsletter</Header>
          <Paragraph>
            If you like to receive updates on new blog posts or projects, simply subscribe to my newsletter with your
            email address.
          </Paragraph>
          <InputField mail={mail} setMail={setMail} />
        </form>
      </Wrapper>
    </Container>
  )
}

const Paragraph = styled.p`
  margin-bottom: 20px;
`

const Header = styled.h3`
  margin-bottom: 10px;
`

// inner wrapper
const Wrapper = styled.div`
  width: 60%;
  background-color: ${(props): string => props.theme.backgroundSecondary};
  padding: 40px 36px;
`

// outer wrapper
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  padding: 30px 0;
`

const InputField = ({ mail, setMail }) => {
  return (
    <InputWrapper>
      <Label>
        <Image />
      </Label>
      <Input mail={mail} setMail={setMail} />
      <SubButton>Subscribe</SubButton>
    </InputWrapper>
  )
}

const Image = styled.img.attrs(() => ({
  src: Mail,
  height: "20px",
  width: "20px",
  alt: "mail",
}))`
  filter: invert(100%);
`

const Label = styled.label.attrs(() => ({
  htmlFor: "subscriptionform-email",
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 8%;
  background-color: ${(props): string => props.theme.primary};
  cursor: pointer;
`

const Input = styled.input.attrs(({ mail, setMail }) => ({
  type: "email",
  name: "email",
  id: "subscriptionform-email",
  value: mail,
  onChange: (e: React.FormEvent<HTMLInputElement>): void => setMail(e.currentTarget.value),
}))`
  flex-basis: 72%;
`

const SubButton = styled.button.attrs(() => ({
  type: "submit",
}))`
  flex-basis: 20%;
  color: ${(props): string => props.theme.foreground};
  background-color: ${(props): string => props.theme.primary};
  border: none;
  cursor: pointer;
`

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1.2rem;
`

export default SubscriptionForm
