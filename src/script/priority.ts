import { createDataSources } from '../data_reader/create-datasource';
import { findRoute } from './services/route-service';
import { findRequirement } from './services/fact-service';

export function priority() {
  const dataSources = createDataSources(
    SpreadsheetApp.getActiveSpreadsheet()
  );

  if (!dataSources) {
    Logger.log('=== data sources not created ===:');
    return;
  }

  const { requirements, fact, routs } = dataSources;

  requirements.forEach(requirement => {
    const route = findRoute(requirement, routs);

    const requirementFoundIn = findRequirement(requirement, route, fact);

    Logger.log('=== requirementFoundIn ===:');
    Logger.log(requirementFoundIn);
  });
}
