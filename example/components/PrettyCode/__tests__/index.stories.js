import React from "react";
import { storiesOf, action } from "@kadira/storybook";

import PrettyCode  from "../";

storiesOf("PrettyCode", module)
  .add("defaults to JavaScript", () => (
    <PrettyCode>{`
      const language = "JavaScript";

      export default "Howdy!";
    `}</PrettyCode>
  ))
  .add("supports CSS", () => (
    <PrettyCode language="css">{`
      article {
        color: #000;
        background: white;
      }

      h1 {
        font-weight: bold;
      }
    `}</PrettyCode>
  ))
  .add("supports HTML", () => (
    <PrettyCode language="html">{`
      <article>
        <h1>HTML</h1>
        <p>Howdy!</p>
      </article>
    `}</PrettyCode>
  ))
  .add("supports JSX", () => (
    <PrettyCode language="jsx">{`
      ReactDOM.render((
        <article>
          <h1>HTML</h1>
          <p>Howdy!</p>
        </article>
      ), window.app);
    `}</PrettyCode>
  ))
  .add("supports Markdown (GFM)", () => (
    <PrettyCode language="markdown">{`
      Markdown
      ========

      > _Howdy!_

      ${"```"}js
      const language = "JavaScript";

      export default "Howdy!";
      ${"```"}
    `}</PrettyCode>
  ))
;
