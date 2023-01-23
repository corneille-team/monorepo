import React from 'react';
import BootstrapDropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';

import theme from '../../styles/theme';
import { imagesLinks } from '../../utils';

const Menu = styled.div`
  border-radius: 6px;
  background-color: white;
  border: 1px solid ${theme.colors.blue};
  max-height: 180px;
  overflow-y: auto;

  ul {
    margin: 0;
  }

  .dropdown-item {
    padding: 0;

    p {
      padding: 8px 15px;
      font-size: 14px;
      font-weight: 300;
    }
  }

  .dropdown-item:hover,
  .dropdown-item:focus {
    background-color: ${theme.colors.grayLight};
  }

  .dropdown-item:active {
    background-color: ${theme.colors.grayLight};
  }
`;

const MenuWrapper = styled.div`
  .dropdown-menu {
    width: 100%;
    padding: 0;
  }
`;

const Toggle = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${theme.colors.stroke};
  height: 37px;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
`;

const CustomToggle = React.forwardRef(({ children, caret, onClick }, ref) => (
  <Toggle onClick={onClick} ref={ref} style={{ display: 'flex', alignItems: 'center' }}>
    {children}
    {caret && <img src={imagesLinks.icons.caret} alt={'caret'} style={{ marginLeft: '15px' }} />}
  </Toggle>
));
CustomToggle.displayName = 'CustomToggle';

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <Menu ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <ul className="list-unstyled">{React.Children.toArray(children)}</ul>
      </Menu>
    );
  },
);
CustomMenu.displayName = 'CustomMenu';

const Dropdown = ({ value, children, style }) => {
  return (
    <BootstrapDropdown style={style}>
      <BootstrapDropdown.Toggle
        as={CustomToggle}
        caret={children && React.Children?.toArray(children)?.length}
        id="dropdown-custom-components"
      >
        {value}
      </BootstrapDropdown.Toggle>

      {children && (
        <MenuWrapper hidden={!React.Children?.toArray(children)?.length}>
          <BootstrapDropdown.Menu as={CustomMenu} value={value}>
            <ul className="list-unstyled">
              {React.Children?.toArray(children)?.map((child, index) => (
                <BootstrapDropdown.Item eventKey={index} active={child === value} key={index}>
                  {child}
                </BootstrapDropdown.Item>
              ))}
            </ul>
          </BootstrapDropdown.Menu>
        </MenuWrapper>
      )}
    </BootstrapDropdown>
  );
};

export default Dropdown;
