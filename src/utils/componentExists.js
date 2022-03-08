/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');

function getNavigators(comp, folder = 'components') {
  const pageContainers = fs.readdirSync('src/pages');
  var navigators = pageContainers.filter(element =>
    element.includes('Navigator')
  );
  navigators =
    navigators.length == 0 ? navigators : navigators.concat('Default');
  return navigators;
}

function viewExists(comp, folder = 'components') {
  const pageContainers = fs.readdirSync('src/pages');
  return pageContainers.indexOf(comp) >= 0;
}

function navigatorExists(comp, folder = 'components') {
  const pageContainers = fs.readdirSync('src/pages');
  return pageContainers.indexOf(`${comp}Navigator`) >= 0;
}

function hooksExists(comp) {
  const allHooks = fs.readdirSync('src/context');
  return allHooks.indexOf(`${comp}`) >= 0;
}

function factoryExists(comp) {
  const allHooks = fs.readdirSync('src/utils/factories');
  return allHooks.indexOf(`${comp}`) >= 0;
}

function interfaceExists(comp) {
  const allInterfaces = fs.readdirSync('src/utils/interfaces');
  return allInterfaces.indexOf(`${comp}`) >= 0;
}

function navigatorExistsForViews(comp, folder = 'components', navigator) {
  const pageContainers = fs.readdirSync(`src/pages/${navigator}`);
  return pageContainers.indexOf(`${comp}`) >= 0;
}

function componentExists(comp, folder = 'components') {
  const pageComponents = fs.readdirSync(`src/${folder}`);
  const pageContainers = fs.readdirSync('src/pages');
  const components = pageComponents.concat(pageContainers);
  return components.indexOf(comp) >= 0;
}

module.exports = {
  viewExists,
  componentExists,
  getNavigators,
  navigatorExists,
  navigatorExistsForViews,
  hooksExists,
  factoryExists,
  interfaceExists,
};
