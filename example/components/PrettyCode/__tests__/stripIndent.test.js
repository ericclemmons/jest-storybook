import stripIndent from "../stripIndent";

describe("stripIndent", () => {
  it("should remove indentation from blocks", () => {
    expect(stripIndent(`
      <body>
        <section>
          <nav />
        </section>
      </body>
    `)).toMatchSnapshot();
  });
});
