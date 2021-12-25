import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = (args) => <App {...args}/>;
export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args = {demo:true}
