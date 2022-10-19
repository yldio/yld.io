import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Label, Textarea } from '../Common/Forms';
import remcalc from 'remcalc';
import { Row } from '../../components/grid';
import { BodyPrimary, DisplayTitle } from '../../components/Typography';

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledField = styled.div`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  margin: 0 ${remcalc(10)};
`;

const SubmitButton = styled.input`
  margin: 0 ${remcalc(10)};
  padding: ${remcalc(18)} ${remcalc(24)};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.text};
  font-weight: bold;
  font-size: ${remcalc(18)};
  line-height: ${remcalc(24)};
  width: fit-content;
  border: none;
`;

const ContactRow = styled(Row)`
  width: 100%;
  margin: 0;
`;

const ContactForm = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    enquiry: '',
  });

  const handleSubmit = () => {
    // TO DO: send info to YLD channel
    setSentEmail(true);
    window.scrollTo(0, 0);
  };

  const handleChange = (inputEl) => {
    setUserDetails({
      ...userDetails,
      [inputEl.target.name]: inputEl.target.value,
    });
  };

  return sentEmail ? (
    <>
      <DisplayTitle>Thank you for getting in touch!</DisplayTitle>

      <BodyPrimary>
        We appreciate you contacting us at YLD. One of our colleagues will get
        back in touch with you soon.
      </BodyPrimary>
    </>
  ) : (
    <StyledForm onSubmit={handleSubmit}>
      <ContactRow>
        <StyledField>
          <Label>Full Name*</Label>
          <Input
            type="text"
            required
            value={userDetails.firstName}
            onChange={handleChange}
            name="firstName"
          />
        </StyledField>
        <StyledField>
          <Label>Last Name</Label>
          <Input
            type="text"
            value={userDetails.lastName}
            onChange={handleChange}
            name="lastName"
          />
        </StyledField>
      </ContactRow>
      <ContactRow>
        <StyledField>
          <Label>Email*</Label>
          <Input
            type="email"
            required
            value={userDetails.email}
            onChange={handleChange}
            name="email"
          />
        </StyledField>
        <StyledField>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            pattern="(\+[0-9]{1,3})?[0-9]{9}"
            value={userDetails.phone}
            onChange={handleChange}
            name="phone"
          />
        </StyledField>
      </ContactRow>
      <ContactRow>
        <StyledField>
          <Label>Company Name*</Label>
          <Input
            type="text"
            required
            value={userDetails.company}
            onChange={handleChange}
            name="company"
          />
        </StyledField>
      </ContactRow>
      <ContactRow>
        <StyledField width="100%">
          <Label>How can we help?*</Label>
          <Textarea
            type="text"
            placeholder="Tell us about ..."
            required
            value={userDetails.enquiry}
            onChange={handleChange}
            name="enquiry"
          />
        </StyledField>
      </ContactRow>

      <SubmitButton type="submit" value="Submit" />
    </StyledForm>
  );
};

export default ContactForm;
