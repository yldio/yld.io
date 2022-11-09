import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Label, Textarea } from '../Common/Forms';
import remcalc from 'remcalc';
import { Row } from '../../components/grid';
import ThankYouMessage from './ThankYouMessage';
import got from 'got';

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
    source: '',
    companyName: '',
    body: '',
  });

  const handleSubmit = async () => {
    const userObject = {
      fullname: userDetails.firstName + ' ' + userDetails.lastName,
      email: userDetails.email,
      companyName: userDetails.companyName,
      source: userDetails.source,
      body: userDetails.body,
    };
    // POST info to slack channel
    // TO DO: change URL when we have definitive one
    const { error } = await got.post(
      'https://2t7ra3lvf0.execute-api.eu-west-2.amazonaws.com/contact-us',
      { json: userObject },
    );
    if (!error) {
      setSentEmail(true);
      window.scrollTo(0, 0);
    }
  };

  const handleChange = (inputEl) => {
    setUserDetails({
      ...userDetails,
      [inputEl.target.name]: inputEl.target.value,
    });
  };

  return sentEmail ? (
    <ThankYouMessage
      titleMessage="Thank you for getting in touch!"
      message="We appreciate you contacting us at YLD. One of our colleagues will get back in touch with you soon."
    />
  ) : (
    <StyledForm onSubmit={handleSubmit}>
      <ContactRow>
        <StyledField>
          <Label>First Name*</Label>
          <Input
            type="text"
            required
            value={userDetails.firstName}
            onChange={handleChange}
            name="firstName"
          />
        </StyledField>
        <StyledField>
          <Label>Last Name*</Label>
          <Input
            type="text"
            required
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
          <Label>How did you hear about us? *</Label>
          <select required onChange={handleChange} name="source">
            <option value="" disabled defaultChecked>
              Choose
            </option>
            <option value="Blog post(YLD website)">
              Blog post(YLD website)
            </option>
            <option value="Conference/meetup/talk">
              Conference/meetup/talk
            </option>
            <option value="I'm a former client">I'm a former client</option>
            <option value="I'm a former employee">I'm a former employee</option>
            <option value="Internet search">Internet search</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Open source work - Github">
              Open source work - Github
            </option>
            <option value="Twitter">Twitter</option>
            <option value="YouTube">YouTube</option>
            <option value="Instagram">Instagram</option>
            <option value="Medium">Medium</option>
          </select>
        </StyledField>
      </ContactRow>
      <ContactRow>
        <StyledField>
          <Label>Company Name*</Label>
          <Input
            type="text"
            required
            value={userDetails.companyName}
            onChange={handleChange}
            name="companyName"
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
            value={userDetails.body}
            onChange={handleChange}
            name="body"
          />
        </StyledField>
      </ContactRow>

      <SubmitButton type="submit" value="Submit" />
    </StyledForm>
  );
};

export default ContactForm;
