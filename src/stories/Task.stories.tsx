import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {action} from "@storybook/addon-actions";
import {TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Todolist/Task',
    component: Task,
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
    task: {id:"1",status:TaskStatuses.Completed,title:"HTML",description: 'new task',
        priority: 0,
        startDate: '',
        deadline: '',
        todoListId:  'todolistId1',
        order: 0,
        addedDate: ''},
    todolistId: 'todolistId1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id:"1",status:TaskStatuses.New,title:"JS",description: 'new task',
    priority: 0,
    startDate: '',
    deadline: '',
    todoListId:  'todolistId1',
    order: 0,
    addedDate: ''},
    todolistId: 'todolistId1',
};