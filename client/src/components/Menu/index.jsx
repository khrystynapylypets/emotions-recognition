import React from 'react';
import { Button, Popover, Menu as MenuComponent, Position, PeopleIcon, LogOutIcon, VideoIcon } from 'evergreen-ui';
import { message } from '../../helpers';

const Menu = () => {
  return (
    <Popover
      position={Position.BOTTOM}
      content={(
        <MenuComponent>
          <MenuComponent.Group>
            <MenuComponent.Item icon={PeopleIcon}>{message('menu.items.profile')}
            </MenuComponent.Item>
            <MenuComponent.Item icon={VideoIcon}>
              {message('menu.items.gallery')}
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
