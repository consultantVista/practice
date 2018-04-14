import * as React from "react";
import * as Renderer from "react-test-renderer";
import { HelloWorld } from "../src/App";
import { Counter } from "../src/Counter";

describe("HelloWorld", () => {
  test("Renders", () => {
    const tree = Renderer.create(<HelloWorld />);
    expect(tree).toMatchSnapshot();
  });
});

describe("Counter", () => {
  test("Renders", () => {
    const tree = Renderer.create(<Counter />);
    expect(tree).toMatchSnapshot();
  });
});
