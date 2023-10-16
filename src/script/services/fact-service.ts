import {Requirement} from '../../data_reader/models/requirement';
import {Level} from '../../data_reader/models/level';
import {Fact} from '../../data_reader/models/fact';

const findRequirement = (
  requirement: Requirement,
  route: Level[],
  fact: Fact[]
): {
  [key: string]: Fact[];
} => {
  // Count of matches
  let count = +requirement.qty;

  // iterate route levels from end to start
  return route.reverse().reduce((result, level) => {
    // if all requirement qty matched then return result
    if (count <= 0) {
      return result;
    }

    const factFromLevel = fact.filter(
      row =>
        row.operId === level.operId &&
        row.semifinishedId === level.semifinishedId &&
        row.markdownId === level.markdownId
    );

    // slice fact by qty
    if (factFromLevel.length > count) {
      factFromLevel.splice(-(factFromLevel.length - count));
    }

    // decrease count
    count = count - factFromLevel.length;

    return {
      ...result,
      [level.operId]: factFromLevel,
    };
  }, {});
};

export {findRequirement};
