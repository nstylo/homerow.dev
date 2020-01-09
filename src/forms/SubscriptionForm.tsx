import React, { useState } from "react"
import styled from "styled-components"
import addToMailchimp from "gatsby-plugin-mailchimp"

type submission = "success" | "failure" | "not_submitted" | "client_error"

const SubscriptionForm = props => {
  const [submitted, setSubmitted] = useState<submission>("not_submitted")
  const [email, setEmail] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault() // do not reload page

    addToMailchimp(email)
      .then(data => {
        if (data.result === "success") {
          setEmail("")
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
    <form className={props.className} name="email-newsletter" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="email">Your email: </label>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)}
        />
        <button type="submit">Subscribe</button>
      </div>
    </form>
  )
}

const styledSubcriptionForm = styled(SubscriptionForm)`
  max-width: 60%;
  background-color: grey;
  padding: 20px 10px;
`

export default styledSubcriptionForm
