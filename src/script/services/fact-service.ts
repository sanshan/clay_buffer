import { Requirement } from '../../data_reader/models/requirement';
import { Level } from '../../data_reader/models/level';
import { Fact } from '../../data_reader/models/fact';

const findRequirement = (
  requirement: Requirement,
  route: Level[],
  fact: Fact[]
): {
  [key: string]: Fact[];
} => {
  let count = +requirement.qty;

  return route.reverse().reduce((result, level) => {
    if (count <= 0) {
      return result;
    }

    const factFromLevel = fact.filter(
      row =>
        row.operId === level.operId &&
        row.semifinishedId === level.semifinishedId &&
        row.markdownId === level.markdownId
    );

    if (factFromLevel.length > count) {
      factFromLevel.splice(-(factFromLevel.length - count));
    }

    count = count - factFromLevel.length;

    return {
      ...result,
      [level.operId]: factFromLevel,
    };
  }, {});
};

export { findRequirement };
