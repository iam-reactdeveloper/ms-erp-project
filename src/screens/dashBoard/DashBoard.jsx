import React from 'react';
import { useSelector } from 'react-redux';

import { Tile } from '../../components';
import { Container } from './DashBoard.styles';
import { dashboardRoutes } from '../../utils';

export const DashBoard = () => {
  const role = useSelector(
    (state) => state?.auth?.userDetails?.role
  );

  const data = dashboardRoutes?.filter((obj) =>
    obj.canAccess.find((canAccess) => role === canAccess)
  );

  return (
    <Container>
      {data?.map((e, i) => (
        <Tile name={e?.name} path={e?.path} key={i} />
      ))}
    </Container>
  );
};
