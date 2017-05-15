# jest-storybook

> Generate [Jest][jest] snapshots from existing [storybooks][storybook]
> (similar to `storyshots`).

_Note: this isn't a library, but a set of instructions + code to do this yourself.
If a wortwhile abstraction arises, I'll publish it accordingly._

### Rationale

![Stories](/storybook.png)

[Storybook][storybook] is an **extremely powerful & productive** way to build
React components.  They're _effectively tests_, so it makes sense to version
them along with the rest of your test-suite.

[Storyshots][storyshots] are [Storybook][storybook]'s answer to this, ~~but don't use
[Jest][jest] under the hood, so you miss out on
[Jest's mocking capabilities](https://github.com/storybooks/storyshots/issues/38).~~

Luckily, **it's fairly trivial for [Jest][jest] to snapshot stories itself**.

### How To Snapshot Stories

1. [Install Jest](https://facebook.github.io/jest/#getting-started).

  ```shell
  yarn add --dev jest
  # or
  npm install --save-dev jest
  ```

2. [Add React support to Jest](https://facebook.github.io/jest/docs/tutorial-react.html).

  ```shell
  yarn add --dev babel-jest react-test-renderer
  # or
  npm install --save-dev babel-jest react-test-renderer
  ```

3. Modify your `package.json` `scripts.test` to run `jest`:

  ```json
  {
    "test": "jest --config .jestrc"
  }
  ```

  _Note: [`.jestrc` may be implicitly used in the future](https://github.com/facebook/jest/issues/2203#issuecomment-264292645)._

4. Mock out non-JS files (e.g. `.css`) & `@kadira/storybook` in `.jestrc`:

  ```json
  {
    "moduleNameMapper": {
      "\\.(css)$": "<rootDir>/__mocks__/.$1.js",
      "^@kadira/storybook$": "<rootDir>/__mocks__/@kadira/storybook"
    }
  }
  ```

  Libraries like `react-codemirror` require `import`ing CSS files, which will
  throw exceptions within Jest.

  If you're using CSS Modules, consider [identity-obj-proxy][identity-obj-proxy],
  which will let you easily reference properties (e.g. `styles.foo`).

  _Note: Until [facebook/jest#1774](https://github.com/facebook/jest/issues/1774) & [facebook/jest#462](https://github.com/facebook/jest/issues/462) are resolved,
  **namespaced mock packages must be explicitly listed**._

5. Create `__mocks__/.css.js`:

  ```js
  module.exports = __filename.replace(process.cwd(), "~");
  ```

  CSS files are replaced with their _relative_ path, so tests don't break in CI.

6. Create `__mocks__/@kadira/storybook.js`:

  ```js
  import renderer from "react-test-renderer";

  // Mocked version of `import { action } from "@kadira/storybook"`.
  export const action = (actionName) => jest.fn();

  // Mocked version of `import { storiesOf } from "@kadira/storybook"`.
  export const storiesOf = (groupName) => {
    // Mocked API to generate tests from & snapshot stories.
    const api = {
      add(storyName, story) {
        describe(groupName, () => {
          it(storyName, () => {
            const component = renderer.create(story());

            expect(component.toJSON()).toMatchSnapshot();
          });
        });

        return api;
      },

      // Any `storybook-addon-*` packages may require noop-ing them:
      addDecorator() {
        return api;
      },
    };

    return api;
  };
  ```

  _Note: Once [facebook/jest#2094](https://github.com/facebook/jest/pull/2094) is released, you can customize snapshot names!_

7. Move `*.stories.js` Under `__tests__`.

  ```diff
  diff --git a/example/components/PrettyCode/index.stories.js b/example/components/PrettyCode/__tests__/index.stories.js
  similarity index 97%
  rename from example/components/PrettyCode/index.stories.js
  rename to example/components/PrettyCode/__tests__/index.stories.js
  index 4e348a6..1b83680 100644
  --- a/example/components/PrettyCode/index.stories.js
  +++ b/example/components/PrettyCode/__tests__/index.stories.js
  ```

  Jest will automatically discover & run any `.js` files under `__tests__`.

8. Run Tests.

  ![Passing tests](/jest.png)

---

### Running This Example

1. Clone this project.
2. `yarn` or `npm install`.
3. `npm start` (<http://localhost/3000>) or run `npm test`.

[jest]: https://facebook.github.io/jest/
[identity-obj-proxy]: https://github.com/keyanzhang/identity-obj-proxy
[storybook]: https://github.com/storybooks/storybook
[storyshots]: https://github.com/storybooks/storybook


### License

> MIT License 2016 © Eric Clemmons
