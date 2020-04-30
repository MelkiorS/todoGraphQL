new Vue({
    el: '#app',
    data() {
        return {
            isDark: true,
            show: true,
            todoTitle: '',
            todos: []
        }
    },
    created() {
        const query =`
            query {
                getTodos {
                    title done id
                }
           }`
        fetch('/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({query})
        })
            .then(resp => resp.json())
            .then(resp => this.todos = resp.data.getTodos);
    }
    ,
    methods: {
        addTodo() {
            const title = this.todoTitle.trim()
            if (!title) {
                return
            }
            const query = `
                mutation {
                     addTodo(todo: {title: "${title}" }){
                        id done title
                    }
                }
            `
            fetch('/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query})
            })
                .then(res => res.json())
                .then((resp) => {
                    const todo = resp.data.addTodo
                    this.todos.push(todo)
                    this.todoTitle = ''
                })
                .catch(e => console.log(e))
        },
        removeTodo(id) {
            fetch('/api/todo/' + id, {
                method: 'delete'
            })
                .then(() => {
                    this.todos = this.todos.filter(t => t.id !== id)
                })
                .catch(e => console.log(e))
        },
        completeTodo(id) {
            const query = `
            mutation {
                completeTodo(id:"${id}"){done}
            }`
            fetch('/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify({query})
            })
                .then(resp => resp.json())
                .then(resp => {
                    const idx = this.todos.findIndex(t => t.id === id)
                    this.todos[idx].done = resp.data.addTodo.done;
                })
                .catch(e => console.log(e))
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        date(value, withTime) {
            if (!value) {
                return 'No Data'
            }
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }

            if (withTime) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }
            return new Intl.DateTimeFormat('en-En', options).format(new Date(+value))
        }
    }
})