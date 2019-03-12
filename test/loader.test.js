/* eslint-disable
  prefer-destructuring,
*/
const webpack = require('./helpers/compiler');

describe('Loader', () => {
  test('Defaults', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {},
      },
    };

    const stats = await webpack('fixture.js', config);
    const { source } = stats.toJson().modules[1];

    expect(source).toMatchSnapshot();
  });
});
