/* eslint-disable
  prefer-destructuring,
*/
import path from 'path';
import webpack from '../helpers/compiler';

describe('Options', () => {
  describe('raw', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            raw: true,
            outputPath: value => path.join('..', 'Resources', '_webpack_resources', value),
            publicPath: value => `"file://" + context.plugin.urlForResourceNamed("_webpack_resources/${value}").path()`,
          },
        },
      };

      const stats = await webpack('fixture.js', config);
      const { assets, source } = stats.toJson().modules[1];

      expect({ assets, source }).toMatchSnapshot();
    });
  });
});
