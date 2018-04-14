"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Renderer = require("react-test-renderer");
var App_1 = require("../src/App");
var Counter_1 = require("../src/Counter");
describe("HelloWorld", function () {
    test("Renders", function () {
        var tree = Renderer.create(React.createElement(App_1.HelloWorld, null));
        expect(tree).toMatchSnapshot();
    });
});
describe("Counter", function () {
    test("Renders", function () {
        var tree = Renderer.create(React.createElement(Counter_1.Counter, null));
        expect(tree).toMatchSnapshot();
    });
});
