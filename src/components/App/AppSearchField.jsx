import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormControl,
  InputGroup as BInputGroup,
  Button,
  Form,
} from 'react-bootstrap';
import { Container } from '../styled/CustomBsGrid';
import API from '../../api';
import Store from '../../store';

const SearchFieldStyled = styled.div`
  z-index: 4;
  position: sticky;
  top: 122px;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Btn = styled(Button)`
  border: none;
  border-radius: 0;
  background-color: ${({ theme }) => theme.whiteGrey4};
  color: ${({ theme }) => theme.grey2};

  &:hover {
    background-color: ${({ theme }) => theme.grey};
  }
`;

const InputGroup = styled(BInputGroup)`
  border: 1px solid #ced4da;
  border-radius: 0.25rem;

  .input-group-text {
    //background: transparent;
    border-radius: 0;
    border: none;
  }

  .form-control {
    font-size: ${({ theme }) => theme.fs14};
    border: none;

    &:focus {
      box-shadow: none;
    }
  }
`;

const AppSearchField = () => {
  const { chain } = useContext(Store);
  const [value, setValue] = useState('');
  const history = useHistory();

  useEffect(() => {
    setValue('');
  }, [chain]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const target = value.trim().toLocaleLowerCase();
    const reg = new RegExp(chain, 'gi');

    if (target.length === 64) {
      const resp = await API.getTransactionDetails(target);
      if (resp.data.hash) {
        history.push(`/${chain.value}/transaction/${target}`);
      }
    } else if (
      reg.test(target) &&
      target.replace(chain.value, '').length === 39
    ) {
      history.push(`/${chain.value}/account/${target}`);
    } else if (Number(target)) {
      const resp = await API.getBlockDetails(target);

      if (resp.data.hash) {
        history.push(`/${chain.value}/block/${target}`);
      }
    }

    // setValue('');
  };

  return (
    <SearchFieldStyled>
      <Container>
        <Form onSubmit={handleSearch}>
          <InputGroup className="mt-2 mb-2">
            <Btn type="submit">
              <FontAwesomeIcon icon={['fa', 'search']} />
            </Btn>
            <FormControl
              placeholder="Search by Address, TxHash"
              aria-label="Username"
              aria-describedby="basic-addon1"
              // onChange={handleSearch}
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {value && (
              <Btn onClick={() => setValue('')}>
                <FontAwesomeIcon icon={['fa', 'times']} />
              </Btn>
            )}
          </InputGroup>
        </Form>
      </Container>
    </SearchFieldStyled>
  );
};

export default AppSearchField;
