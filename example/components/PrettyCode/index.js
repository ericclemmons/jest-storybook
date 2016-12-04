import "codemirror/addon/mode/overlay";
import "codemirror/mode/clike/clike";
import "codemirror/mode/css/css";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/meta";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/xml/xml";

import React from "react";
import Codemirror from "react-codemirror";

import stripIndent from "./stripIndent";

import "./index.css";

const modes = {
  css: "css",
  html: "htmlmixed",
  gfm: "gfm",
  javascript: "jsx",
  js: "jsx",
  jsx: "jsx",
  markdown: "gfm",
  xml: "xml",
};

export default function PrettyCode({
  children = "",
  language = "javascript"
}) {
  return (
    <Codemirror
      options={{
        mode: modes[language],
        readOnly: true,
        theme: "monokai",
      }}
      value={stripIndent(children)}
    />
  );
}
