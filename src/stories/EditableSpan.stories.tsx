import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: { description: 'Value changed' },
        value:{
            defaultValue:'HTML',
            description:'Start value'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title:'Buy book',
   onChange:action('Value changed')
};

