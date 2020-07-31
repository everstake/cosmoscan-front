import React from 'react';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const ValueContainer = ({ selectProps: { icon }, children, ...props }) =>
  components.ValueContainer && (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.ValueContainer {...props}>
      {children && (
        <FontAwesomeIcon
          icon={icon}
          style={{ position: 'absolute', left: 0 }}
        />
      )}
      {children}
    </components.ValueContainer>
  );

ValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ValueContainer;
