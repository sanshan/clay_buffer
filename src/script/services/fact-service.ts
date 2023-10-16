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
  Logger.log('Count of matches: ' + count);

  Logger.log('Iterate route levels from end to start.');
  return route.reverse().reduce((result, level, index) => {
    Logger.log('Current level is: ' + index);

    if (count <= 0) {
      Logger.log('All requirement qty matched.');
      return result;
    }

    Logger.log('Search requirement by semifinishedId and markdownId ...');
    const factFromLevel = fact.filter(
      row =>
        row.operId === level.operId &&
        row.semifinishedId === level.semifinishedId &&
        row.markdownId === level.markdownId
    );
    Logger.log('Search result: ');
    Logger.log(factFromLevel);

    if (factFromLevel.length > count) {
      Logger.log('Founded: ' + factFromLevel.length + '. Slice the found fact by count: ' + count);
      factFromLevel.splice(-(factFromLevel.length - count));
    }

    Logger.log('Decrease count.');
    count = count - factFromLevel.length;

    return {
      ...result,
      [level.operId]: factFromLevel,
    };
  }, {});
};

export { findRequirement };
