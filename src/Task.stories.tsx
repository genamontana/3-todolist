import {action} from '@storybook/addon-actions';
import React from 'react';
import {Task} from './Task';

/* здесь пример кода из уроков, он не работает, что то из-за версий сторибука или
проблема в настройке .storybook/main.js

import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Task} from './Task';

export default {
    title: 'Task Component',
    component: Task
} as ComponentMeta<typeof Task>

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todoListId: 'todoListId1'
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    todoListId: 'todoListId1'
}

*/

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todoListId={"todoListId_2"}
        />
        <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todoListId={"todoListId_2"}
        />
    </>

}









