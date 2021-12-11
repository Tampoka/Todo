import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/Task',
    component: Task,
    argTypes: {
        onclick: { description: 'Button inside form clicked' },
    },
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback=action('Status changed inside Task')
const changeTaskTitleCallback=action('Title changed inside Task')
const removeTaskCallback=action('Remove button inside Task was clicked')

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const baseArgs={
    changeTaskStatus:changeTaskStatusCallback,
    changeTaskTitle:changeTaskTitleCallback,
    removeTask:removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id:"1",isDone:true,title:"HTML"},
    todolistId: 'todolistId1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id:"1",isDone:false,title:"JS"},
    todolistId: 'todolistId1',
};