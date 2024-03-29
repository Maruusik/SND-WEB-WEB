// initialize firebase with your config
firebase.initializeAPP({
    apiKey: "AIzaSyCAJoLP_g1-AIjHfKs7NSAai7BOhH_5XMQ",
    authDomain: "sevice-next-door.firebaseapp.com",
    projectId: "sevice-next-door"

})
const db = firebase.firestore();
// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = "taskInput.value.trim(),
    if (task !== "") {
        db.collection("task").add({
            task: taskInput,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        taskInput.value = "";
    }

}
// Function to render the tasks
function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `<span>${doc.data().task}</span>;
    <button onclick="deleteTask('${doc.id}')">Delete</button>`
    taskList.appendChild(taskItem);
}
//Real-time listener for tasks
db.collections("tasks")
.orderBy("timestamp"), "desc"
.onSnapshot(snapshot =>{
    const changes = snapshot.docChanges();
    changes.forEach(change =>{
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});
// Function delete a task
function deleteTask(id) {
    db.collection("tasks").doc(id).delete()
}
