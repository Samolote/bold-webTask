import { useState } from 'react';
import Heading from '../../components/heading';
import Text from '../../components/text';
import FormInput from '../../components/formInput/index.jsx';
import './index.css';

const INITIAL_FORM_STATE = {
  'first-name': '',
  'last-name': '',
  phone: '',
  service: '',
};

const ERROR_MESSAGES = {
  'first-name': 'First name is required',
  'last-name': 'Last name is required',
  phone: 'Please enter a valid form number.',
  service: 'Please specify a service.',
};

const Contact = () => {
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_STATE);

  const validateInput = (name, value) => {
    if (!value) {
      return ERROR_MESSAGES[name];
    }

    if (name === 'phone' && !phonePattern.test(value)) {
      return ERROR_MESSAGES.phone;
    }

    return '';
  };

  const validateForm = () =>
    Object.keys(formValues).every((field) => validateInput(field, formValues[field]) === '');

  const resetForm = () => {
    setFormValues(INITIAL_FORM_STATE);
    setFormErrors(INITIAL_FORM_STATE);
  };

  const phonePattern = /^(\+48[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{3})$/;

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: validateInput(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully with:', formValues);
      resetForm();
    } else {
      console.log('Form has following errors:', formErrors);
    }
  };

  return (
    <div className="contact">
      <div className="content">
        <Heading level={2} className="heading">
          Contact
        </Heading>
        <Text className="text" size={14}>
          Questions or concerns? Just fill out the form below and our support team will get back to
          you within 24 hours
        </Text>
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex-row">
          <div className="input-wrapper">
            {formErrors['first-name'] && (
              <Text size={14} color="red" className="error">
                {formErrors['first-name']}
              </Text>
            )}
            <FormInput
              type="text"
              name="first-name"
              placeholder="First Name"
              value={formValues['first-name']}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-wrapper">
            {formErrors['last-name'] && (
              <Text size={14} color="red" className="error">
                {formErrors['last-name']}
              </Text>
            )}
            <FormInput
              type="text"
              name="last-name"
              placeholder="Last Name"
              value={formValues['last-name']}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="input-wrapper">
          {formErrors['phone'] && (
            <Text size={14} color="red" className="error">
              {formErrors['phone']}
            </Text>
          )}
          <FormInput
            type="tel"
            name="phone"
            style="full"
            placeholder="Phone Number"
            value={formValues.phone}
            required
            pattern={phonePattern}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-wrapper">
          {formErrors['service'] && (
            <Text size={14} color="red" className="error">
              {formErrors['service']}
            </Text>
          )}
          <FormInput
            type="text"
            name="service"
            style="full"
            placeholder="What Service are you interested in?"
            value={formValues.service}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="button">submit now</button>
      </form>
    </div>
  );
};

export default Contact;
