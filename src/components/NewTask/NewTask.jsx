import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../hooks/useHttp';

const NewTask = (props) => {
    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const createdTask = (taskText, taskData) => {
        const generatedId = taskData.name;

        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
    };

    const enterTaskHandler = async (taskText) => {
        sendTaskRequest(
            {
                url: 'https://tasks-test-46217-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { text: taskText },
            },
            createdTask.bind(null, taskText)
        );
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
