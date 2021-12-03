import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-uuid';
import {addTask, deleteTask, updateTask} from '../actions';
import '../App.scss';
import {Icon, Table, Button, Modal, Input, Checkbox} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Task = () => {

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.task);

    const handleBtnClick = () => {
        setName("");
        setDescription("");
        setIsEdit(false);
        setId("");
        setOpen(true);
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "description":
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const handleSave = () => {
        if (!name || !description ) {
            return alert("Please add all details")
        }
        const data = tasks;
        const payload = {
            name,
            startDate: new Date(),
            description,
            completed
        };
        payload.id = isEdit ?  id : uuid();
        if (data?.length > 0) {
            if (isEdit) {
                const index = data.findIndex(item => item.id === id);
                data[index] = payload;
                setId("");
                dispatch(updateTask(data))
            } else {
                const newData = [...data, payload];
                dispatch(addTask(newData));
            }
        } else {
            const newData = [payload];
            dispatch(addTask(newData));
        }
        setOpen(false);
    };

    const handleEdit = (id) => {
      const filterTask = tasks.filter(item => item.id === id);
      const task = filterTask[0];
      if (task) {
          setIsEdit(true);
          setName(task.name);
          setDescription(task.description);
          setId(task.id)
          setOpen(true);
      }
    };

    const handleDelete = (id) => {
        const filterTask = tasks.filter(item => item.id !== id);
        dispatch(deleteTask(filterTask))
    };

    const handleCheckbox = (e, item) => {
        setCompleted(item.checked)
    };

    return (
        <div className="task-container">
            <div className="task-container__table-container">
                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>No</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Completed</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            tasks?.length > 0 && tasks.map((task, index) => (
                                    <Table.Row>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{task.name}</Table.Cell>
                                        <Table.Cell>{task.description}</Table.Cell>
                                        <Table.Cell><Checkbox checked={task.completed} label={task.completed ? "Completed" : "Pending"}/></Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                onClick={() => handleEdit(task.id)}
                                            >
                                                <Icon name="edit"/>
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(task.id)}
                                            >
                                                <Icon name="delete"/>
                                                Remove
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            )}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                <div>Completed Tasks {(tasks || []).filter(item => item.completed).length}</div><br/>
                                <div>Pending Tasks {(tasks || []).filter(item => !item.completed).length}</div><br/>
                                <div>Total Tasks {(tasks || []).length}</div>
                            </Table.HeaderCell>
                            <Table.HeaderCell colSpan='4'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary
                                    size='small'
                                    onClick={handleBtnClick}
                                >
                                    <Icon name='add'/> Add Task
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
            <Modal
                onClose={() => setOpen(false)}
                // onOpen={() => setOpen(true)}
                open={open}
                className="modal-main-container"
            >
                <Modal.Header>{isEdit ? "Edit Task" : "Add Task"}</Modal.Header>
                <Modal.Content>
                    <div className="add-task-details">
                        <Input className="input" defaultValue={name} name="name" onChange={handleInputChange} placeholder='Task name...'/>
                        <Input className="input" defaultValue={description} name="description" onChange={handleInputChange}
                               placeholder='Task description...'/><br/>
                        <Checkbox toggle label="Task Status" onClick={handleCheckbox} />
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default Task;