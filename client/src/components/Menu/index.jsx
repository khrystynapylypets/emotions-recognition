import React from 'react';
import { Button, Popover, Menu as MenuComponent, Position, PeopleIcon, LogOutIcon, VideoIcon } from 'evergreen-ui';
import { StyledLink } from '../../styledComponents';
import { message } from '../../helpers';
import { path } from '../../utils/constants';

const Menu = () => {
  return (
    <Popover
      position={Position.BOTTOM}
      content={(
        <MenuComponent>
          <MenuComponent.Group>
            <MenuComponent.Item icon={PeopleIcon}>
              <StyledLink
                to={path.PROFILE}
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                {message('menu.items.profile')}
              </StyledLink>
            </MenuComponent.Item>
            <MenuComponent.Item
              icon={VideoIcon}
            >
              <StyledLink
                to='/gallery'
                activeStyle={{
                  fontWeight: 'bold',
                }}
              >
                {message('menu.items.gallery')}
              </StyledLink>
            </MenuComponent.Item>
          </MenuComponent.Group>
          <MenuComponent.Divider />
          <MenuComponent.Group>
            <MenuComponent.Item icon={LogOutIcon} intent='success'>
              {message('menu.items.logOutButton')}
            </MenuComponent.Item>
          </MenuComponent.Group>
        </MenuComponent>
      )}
    >
      <Button
        appearance='primary'
        intent='success'
        height={40}
      >
        {message('menu.openButton')}
      </Button>
    </Popover>
  );
};

export default Menu;
