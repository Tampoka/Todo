import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import AppWithRedux from "../AppWithRedux";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    argTypes: {},
} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux {...args} />;
export const AppWithReduxExample=Template.bind({})
AppWithReduxExample.args={}

