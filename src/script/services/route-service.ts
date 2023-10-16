import {Requirement} from '../../data_reader/models/requirement';
import {Level} from '../../data_reader/models/level';

const routesStash = new Map<string, Level[]>();

const findRoute = (requirement: Requirement, routs: Level[]): Level[] => {
  const {productId} = requirement;

  if (routesStash.has(productId)) {
    return routesStash.get(productId)!;
  }

  const route = routs.filter(({productCrmId}) => productCrmId === productId);

  routesStash.set(productId, route);

  return route;
};

export {findRoute};
