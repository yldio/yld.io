import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Label, Textarea, Select } from '../Common/Forms';
import remcalc from 'remcalc';
import { Row } from '../../components/grid';

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

const SubmitButton = styled.button`
  margin: 0 ${remcalc(10)};
  padding: ${remcalc(18)} ${remcalc(24)};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.text};
  font-weight: bold;
  font-size: ${remcalc(18)};
  line-height: ${remcalc(24)};
  width: fit-content;
  border: none;
  cursor: pointer;
`;

const ContactRow = styled(Row)`
  width: 100%;
  margin: 0;
`;

const ContactForm = ({ onSubmit }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    source: '',
    companyName: '',
    body: '',
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(userDetails);
  };

  const handleChange = (inputEl) => {
    setUserDetails({
      ...userDetails,
      [inputEl.target.name]: inputEl.target.value,
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit} method="post">
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
          <Select
            required
            onChange={handleChange}
            name="source"
            defaultValue=""
          >
            <option value="" disabled>
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
          </Select>
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
      <SubmitButton type="submit">Submit</SubmitButton>
    </StyledForm>
  );
};

export default ContactForm;
