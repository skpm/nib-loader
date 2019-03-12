/* eslint-disable
  prefer-destructuring,
*/
const webpack = require('../helpers/compiler');

describe('Options', () => {
  describe('context', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            context: `${__dirname}`,
          },
        },
      };

      const stats = await webpack('fixture.js', config);
      const { source } = stats.toJson().modules[1];

      expect(source).toMatchSnapshot();
    });
  });
});
