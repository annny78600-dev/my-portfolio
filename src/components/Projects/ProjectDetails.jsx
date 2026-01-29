import { useEffect, useState } from "react";


const TodoApp = () => {
    const [todos, setTodos] = useState(() => {
        let todoList = localStorage.getItem("todos");
        todoList ? JSON.parse(todoList) : [];
    })
    const [input, setInput] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])


    const handleAddorEditTodo = () => {
        if (!input.trim()) return;

        if (editId !== null) {
            setTodos(todos.map((todo) => todo.id === editId ? { ...todo, text: input } : todo));
            setEditId(null)
        } else {
            setTodos([
                ...todos,
                { text: input, id: new Date.now() }

            ]);
            setInput("")
        }
    }

    const handleEdit = (id) => {
        const todo = todos.find((val) => val.id === id);
        setInput(todo.text);
        setEditId(todo.id)
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((val) => val.id !== id))
    }
    return (
        <>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleAddorEditTodo}>
                {editId ? "Update" : "Add"}
            </button>

            {todos?.map((todo) => {
                return (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => handleEdit(todo.id)}>Edit</button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                )
            })}
        </>
    )
}

export default TodoApp;

