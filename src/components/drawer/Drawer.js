import React, { useState } from 'react';
import {
  Drawer as Draw,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector } from 'react-redux';

import { drawerRoutes } from '../../utils';
import {
  BoxContainer,
  MenuIconContainer,
  NavLinkContainer,
} from './Drawer.Styles';

export const Drawer = () => {
  const [state, setState] = useState({ left: false });

  const role = useSelector(
    (state) => state?.auth?.userDetails?.role
  );

  const routes = drawerRoutes.filter((obj) => obj.canAccess.includes(role));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <BoxContainer
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {routes.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <NavLinkContainer to={text?.path}>
                <ListItemText primary={text?.name} />
              </NavLinkContainer>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </BoxContainer>
  );

  return (
    <>
      <MenuIconContainer onClick={toggleDrawer('left', true)} />
      <Draw
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Draw>
    </>
  );
};
