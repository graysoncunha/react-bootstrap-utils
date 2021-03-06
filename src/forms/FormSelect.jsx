import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext, handleInputChange } from './form-helpers';

export function FormSelect({ id, name, options, required, placeholder }) {
  const formState = useContext(FormContext);

  return (
    <select
      {...{ required, name, id }}
      className="form-control"
      onChange={handleInputChange.bind(null, formState)}
      value={formState.getValue(name) || ''}
    >
      <option value="">{placeholder}</option>

      {renderOptions(options, formState.getFormData())}
    </select>
  );
}

FormSelect.propTypes = {
  id: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  ]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.any,
};

function renderOptions(options, formData) {
  let _options = typeof options === 'function' ? options(formData) : options;

  if (!Array.isArray(_options)) {
    throw new Error('Select Options should be an array');
  }

  return _options.map((option, index) => {
    let value, label;

    if (typeof option === 'string') {
      value = label = option;
    } else {
      value = option.value;
      label = option.label;
    }

    return (
      <option key={index} value={value}>
        {label}
      </option>
    );
  });
}
