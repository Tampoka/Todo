import {ComponentMeta, Story} from "@storybook/react";
import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    argTypes:{},
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: Story=(args)=><AppWithRedux {...args}/>;
export const AppWithReduxExample=Template.bind({})
AppWithReduxExample.args={}
